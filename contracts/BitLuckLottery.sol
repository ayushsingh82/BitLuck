// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

/**
 * @title BitLuckLottery
 * @dev Bitcoin-native lottery on Citrea with Chainlink VRF for fair winner selection
 */
contract BitLuckLottery is VRFConsumerBaseV2, AccessControl, ReentrancyGuard, Pausable {
    using Counters for Counters.Counter;

    // ============ CONSTANTS ============
    bytes32 public constant ROUND_MANAGER_ROLE = keccak256("ROUND_MANAGER_ROLE");
    bytes32 public constant TREASURY_ROLE = keccak256("TREASURY_ROLE");
    
    uint256 public constant MAX_PARTICIPANTS = 100;
    uint256 public constant REQUIRED_DEPOSIT = 0.01 ether; // 0.01 ETH representing 0.01 BTC
    uint256 public constant FEE_PERCENTAGE = 200; // 2% in basis points
    uint256 public constant FEE_DENOMINATOR = 10000;

    // ============ STATE VARIABLES ============
    Counters.Counter private _roundIds;
    
    // VRF Configuration
    VRFCoordinatorV2Interface private immutable _vrfCoordinator;
    LinkTokenInterface private immutable _linkToken;
    bytes32 private immutable _keyHash;
    uint64 private _subscriptionId;
    uint32 private immutable _callbackGasLimit;
    uint16 private immutable _requestConfirmations;
    uint32 private immutable _numWords;

    // Round Management
    mapping(uint256 => Round) public rounds;
    mapping(uint256 => mapping(address => bool)) public participants;
    mapping(uint256 => address[]) public participantAddresses;
    mapping(uint256 => uint256) public roundToRequestId;
    mapping(uint256 => uint256) public requestIdToRound;

    // Treasury and Bridge
    address public treasury;
    address public bridgeVerifier;

    // ============ STRUCTS ============
    struct Round {
        uint256 roundId;
        uint256 startTime;
        uint256 endTime;
        uint256 totalDeposits;
        uint256 participantCount;
        address winner;
        bool isActive;
        bool isCompleted;
        bool winnerSelected;
        uint256 randomNumber;
    }

    // ============ EVENTS ============
    event RoundStarted(uint256 indexed roundId, uint256 startTime, uint256 endTime);
    event ParticipantJoined(uint256 indexed roundId, address indexed participant, uint256 depositAmount);
    event VRFRequested(uint256 indexed roundId, uint256 indexed requestId);
    event WinnerSelected(uint256 indexed roundId, address indexed winner, uint256 prizeAmount, uint256 randomNumber);
    event RoundCompleted(uint256 indexed roundId, uint256 totalParticipants, uint256 totalPrize);
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event BridgeVerifierUpdated(address indexed oldVerifier, address indexed newVerifier);
    event SubscriptionIdUpdated(uint64 indexed oldId, uint64 indexed newId);

    // ============ MODIFIERS ============
    modifier onlyRoundManager() {
        require(hasRole(ROUND_MANAGER_ROLE, msg.sender), "BitLuck: Only round manager");
        _;
    }

    modifier onlyTreasury() {
        require(hasRole(TREASURY_ROLE, msg.sender), "BitLuck: Only treasury");
        _;
    }

    modifier validRound(uint256 roundId) {
        require(rounds[roundId].roundId == roundId, "BitLuck: Invalid round");
        _;
    }

    modifier roundActive(uint256 roundId) {
        require(rounds[roundId].isActive, "BitLuck: Round not active");
        _;
    }

    modifier roundNotCompleted(uint256 roundId) {
        require(!rounds[roundId].isCompleted, "BitLuck: Round already completed");
        _;
    }

    // ============ CONSTRUCTOR ============
    constructor(
        uint256 _requiredDeposit,
        uint256 _maxParticipants,
        uint256 _roundDuration,
        uint256 _feePercentage,
        address vrfCoordinator,
        address linkToken,
        bytes32 keyHash,
        uint64 subscriptionId,
        uint32 callbackGasLimit,
        uint16 requestConfirmations,
        uint32 numWords
    ) VRFConsumerBaseV2(vrfCoordinator) {
        require(_requiredDeposit > 0, "BitLuck: Invalid deposit amount");
        require(_maxParticipants > 0 && _maxParticipants <= MAX_PARTICIPANTS, "BitLuck: Invalid max participants");
        require(_roundDuration > 0, "BitLuck: Invalid round duration");
        require(_feePercentage <= 1000, "BitLuck: Fee too high"); // Max 10%
        require(vrfCoordinator != address(0), "BitLuck: Invalid VRF coordinator");
        require(linkToken != address(0), "BitLuck: Invalid LINK token");

        _vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinator);
        _linkToken = LinkTokenInterface(linkToken);
        _keyHash = keyHash;
        _subscriptionId = subscriptionId;
        _callbackGasLimit = callbackGasLimit;
        _requestConfirmations = requestConfirmations;
        _numWords = numWords;

        // Set up roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ROUND_MANAGER_ROLE, msg.sender);
        _grantRole(TREASURY_ROLE, msg.sender);
    }

    // ============ EXTERNAL FUNCTIONS ============

    /**
     * @dev Join the current active round
     * @param roundId The round ID to join
     */
    function joinRound(uint256 roundId) 
        external 
        payable 
        nonReentrant 
        whenNotPaused 
        validRound(roundId) 
        roundActive(roundId) 
        roundNotCompleted(roundId) 
    {
        require(msg.value == REQUIRED_DEPOSIT, "BitLuck: Incorrect deposit amount");
        require(!participants[roundId][msg.sender], "BitLuck: Already joined");
        require(rounds[roundId].participantCount < MAX_PARTICIPANTS, "BitLuck: Round full");

        Round storage round = rounds[roundId];
        
        // Add participant
        participants[roundId][msg.sender] = true;
        participantAddresses[roundId].push(msg.sender);
        round.participantCount++;
        round.totalDeposits += msg.value;

        emit ParticipantJoined(roundId, msg.sender, msg.value);

        // Check if round is full
        if (round.participantCount == MAX_PARTICIPANTS) {
            _requestRandomNumber(roundId);
        }
    }

    /**
     * @dev Complete a round and select winner (called by round manager or when time expires)
     * @param roundId The round ID to complete
     */
    function completeRound(uint256 roundId) 
        external 
        onlyRoundManager 
        validRound(roundId) 
        roundActive(roundId) 
        roundNotCompleted(roundId) 
    {
        Round storage round = rounds[roundId];
        require(block.timestamp >= round.endTime || round.participantCount == MAX_PARTICIPANTS, "BitLuck: Round not ready to complete");

        if (round.participantCount == 0) {
            // No participants, just close the round
            round.isActive = false;
            round.isCompleted = true;
            emit RoundCompleted(roundId, 0, 0);
            return;
        }

        // Request random number if not already requested
        if (!round.winnerSelected && round.randomNumber == 0) {
            _requestRandomNumber(roundId);
        }
    }

    /**
     * @dev Claim prize for the winner
     * @param roundId The round ID to claim from
     */
    function claimPrize(uint256 roundId) 
        external 
        nonReentrant 
        validRound(roundId) 
    {
        Round storage round = rounds[roundId];
        require(round.isCompleted, "BitLuck: Round not completed");
        require(round.winner == msg.sender, "BitLuck: Not the winner");
        require(!round.prizeClaimed, "BitLuck: Prize already claimed");

        round.prizeClaimed = true;
        
        // Calculate prize amount (total deposits minus fees)
        uint256 feeAmount = (round.totalDeposits * FEE_PERCENTAGE) / FEE_DENOMINATOR;
        uint256 prizeAmount = round.totalDeposits - feeAmount;

        // Transfer prize to winner
        (bool success, ) = payable(msg.sender).call{value: prizeAmount}("");
        require(success, "BitLuck: Prize transfer failed");

        // Transfer fees to treasury
        if (feeAmount > 0 && treasury != address(0)) {
            (bool treasurySuccess, ) = payable(treasury).call{value: feeAmount}("");
            require(treasurySuccess, "BitLuck: Fee transfer failed");
        }

        emit PrizeClaimed(roundId, msg.sender, prizeAmount, feeAmount);
    }

    // ============ VRF CALLBACK ============

    /**
     * @dev Callback function used by VRF Coordinator to return the random number
     * @param requestId The request ID for fulfillment
     * @param randomWords Array of random words
     */
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) 
        internal 
        override 
    {
        uint256 roundId = requestIdToRound[requestId];
        require(roundId != 0, "BitLuck: Invalid request ID");

        Round storage round = rounds[roundId];
        require(!round.winnerSelected, "BitLuck: Winner already selected");

        uint256 randomNumber = randomWords[0];
        round.randomNumber = randomNumber;

        // Select winner
        if (round.participantCount > 0) {
            uint256 winnerIndex = randomNumber % round.participantCount;
            address winner = participantAddresses[roundId][winnerIndex];
            round.winner = winner;
            round.winnerSelected = true;
        }

        round.isActive = false;
        round.isCompleted = true;

        emit WinnerSelected(roundId, round.winner, round.totalDeposits, randomNumber);
        emit RoundCompleted(roundId, round.participantCount, round.totalDeposits);
    }

    // ============ ADMIN FUNCTIONS ============

    /**
     * @dev Start a new round
     * @param duration Duration of the round in seconds
     */
    function startNewRound(uint256 duration) 
        external 
        onlyRoundManager 
        whenNotPaused 
    {
        require(duration > 0, "BitLuck: Invalid duration");

        _roundIds.increment();
        uint256 newRoundId = _roundIds.current();

        rounds[newRoundId] = Round({
            roundId: newRoundId,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            totalDeposits: 0,
            participantCount: 0,
            winner: address(0),
            isActive: true,
            isCompleted: false,
            winnerSelected: false,
            randomNumber: 0
        });

        emit RoundStarted(newRoundId, block.timestamp, block.timestamp + duration);
    }

    /**
     * @dev Set treasury address
     * @param newTreasury New treasury address
     */
    function setTreasury(address newTreasury) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(newTreasury != address(0), "BitLuck: Invalid treasury address");
        address oldTreasury = treasury;
        treasury = newTreasury;
        _grantRole(TREASURY_ROLE, newTreasury);
        if (oldTreasury != address(0)) {
            _revokeRole(TREASURY_ROLE, oldTreasury);
        }
        emit TreasuryUpdated(oldTreasury, newTreasury);
    }

    /**
     * @dev Set bridge verifier address
     * @param newVerifier New bridge verifier address
     */
    function setBridgeVerifier(address newVerifier) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        bridgeVerifier = newVerifier;
        emit BridgeVerifierUpdated(bridgeVerifier, newVerifier);
    }

    /**
     * @dev Update VRF subscription ID
     * @param newSubscriptionId New subscription ID
     */
    function updateSubscriptionId(uint64 newSubscriptionId) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        uint64 oldId = _subscriptionId;
        _subscriptionId = newSubscriptionId;
        emit SubscriptionIdUpdated(oldId, newSubscriptionId);
    }

    /**
     * @dev Pause the contract
     */
    function pause() 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        _pause();
    }

    /**
     * @dev Unpause the contract
     */
    function unpause() 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        _unpause();
    }

    /**
     * @dev Emergency withdraw (only in emergency)
     */
    function emergencyWithdraw() 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(paused(), "BitLuck: Contract not paused");
        uint256 balance = address(this).balance;
        require(balance > 0, "BitLuck: No balance to withdraw");
        
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "BitLuck: Withdrawal failed");
    }

    // ============ VIEW FUNCTIONS ============

    /**
     * @dev Get current round information
     * @return roundId Current round ID
     * @return isActive Whether round is active
     * @return participantCount Number of participants
     * @return totalDeposits Total deposits in the round
     * @return endTime Round end time
     */
    function getCurrentRound() 
        external 
        view 
        returns (
            uint256 roundId,
            bool isActive,
            uint256 participantCount,
            uint256 totalDeposits,
            uint256 endTime
        ) 
    {
        roundId = _roundIds.current();
        Round storage round = rounds[roundId];
        return (
            roundId,
            round.isActive,
            round.participantCount,
            round.totalDeposits,
            round.endTime
        );
    }

    /**
     * @dev Get round details
     * @param roundId Round ID
     * @return Round details
     */
    function getRound(uint256 roundId) 
        external 
        view 
        validRound(roundId) 
        returns (Round memory) 
    {
        return rounds[roundId];
    }

    /**
     * @dev Get all participants for a round
     * @param roundId Round ID
     * @return Array of participant addresses
     */
    function getParticipants(uint256 roundId) 
        external 
        view 
        validRound(roundId) 
        returns (address[] memory) 
    {
        return participantAddresses[roundId];
    }

    /**
     * @dev Check if address is participant in round
     * @param roundId Round ID
     * @param participant Address to check
     * @return Whether address is participant
     */
    function isParticipant(uint256 roundId, address participant) 
        external 
        view 
        validRound(roundId) 
        returns (bool) 
    {
        return participants[roundId][participant];
    }

    /**
     * @dev Get VRF configuration
     * @return coordinator VRF coordinator address
     * @return subscriptionId Subscription ID
     * @return keyHash Key hash
     */
    function getVRFConfig() 
        external 
        view 
        returns (
            address coordinator,
            uint64 subscriptionId,
            bytes32 keyHash
        ) 
    {
        return (address(_vrfCoordinator), _subscriptionId, _keyHash);
    }

    // ============ INTERNAL FUNCTIONS ============

    /**
     * @dev Request random number from VRF
     * @param roundId Round ID
     */
    function _requestRandomNumber(uint256 roundId) 
        internal 
    {
        require(_subscriptionId != 0, "BitLuck: Subscription ID not set");
        
        uint256 requestId = _vrfCoordinator.requestRandomWords(
            _keyHash,
            _subscriptionId,
            _requestConfirmations,
            _callbackGasLimit,
            _numWords
        );

        roundToRequestId[roundId] = requestId;
        requestIdToRound[requestId] = roundId;

        emit VRFRequested(roundId, requestId);
    }

    // ============ EVENTS ============
    event PrizeClaimed(uint256 indexed roundId, address indexed winner, uint256 prizeAmount, uint256 feeAmount);

    // ============ RECEIVE FUNCTION ============
    receive() external payable {
        // Allow receiving ETH for deposits
    }
} 