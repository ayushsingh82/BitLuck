// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

contract BitLuckLottery is VRFConsumerBaseV2, ReentrancyGuard, Ownable {
    // Chainlink VRF Variables
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    uint64 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    // Lottery Variables
    uint256 public constant REQUIRED_DEPOSIT = 0.01 ether; // 0.01 cBTC
    uint256 public constant MAX_PARTICIPANTS = 100;
    uint256 public constant FEE_PERCENTAGE = 2; // 2% fee
    
    struct Round {
        uint256 roundId;
        uint256 totalDeposits;
        uint256 participantCount;
        bool isActive;
        bool isCompleted;
        uint256 winnerIndex;
        address winner;
        uint256 prizeAmount;
        uint256 requestId;
        bool vrfRequested;
    }
    
    struct Participant {
        address wallet;
        uint256 depositAmount;
        uint256 timestamp;
        bool hasWon;
    }
    
    mapping(uint256 => Round) public rounds;
    mapping(uint256 => mapping(uint256 => Participant)) public participants; // roundId => participantIndex => Participant
    mapping(uint256 => address[]) public participantAddresses; // roundId => array of addresses
    
    uint256 public currentRoundId = 1;
    uint256 public totalRounds;
    uint256 public totalFeesCollected;
    
    // Events
    event RoundStarted(uint256 indexed roundId);
    event ParticipantJoined(uint256 indexed roundId, address indexed participant, uint256 depositAmount);
    event RoundCompleted(uint256 indexed roundId, address indexed winner, uint256 prizeAmount);
    event VRFRequested(uint256 indexed roundId, uint256 indexed requestId);
    event WinnerSelected(uint256 indexed roundId, address indexed winner, uint256 randomNumber);
    
    constructor(
        address vrfCoordinatorV2,
        uint64 subscriptionId,
        bytes32 gasLane,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_subscriptionId = subscriptionId;
        i_gasLane = gasLane;
        i_callbackGasLimit = callbackGasLimit;
        
        // Start the first round
        _startNewRound();
    }
    
    modifier onlyActiveRound() {
        require(rounds[currentRoundId].isActive, "No active round");
        _;
    }
    
    modifier onlyCompletedRound(uint256 roundId) {
        require(rounds[roundId].isCompleted, "Round not completed");
        _;
    }
    
    function joinLottery() external payable nonReentrant onlyActiveRound {
        require(msg.value == REQUIRED_DEPOSIT, "Incorrect deposit amount");
        require(rounds[currentRoundId].participantCount < MAX_PARTICIPANTS, "Round is full");
        
        Round storage currentRound = rounds[currentRoundId];
        
        // Check if participant already joined
        for (uint256 i = 0; i < currentRound.participantCount; i++) {
            require(participants[currentRoundId][i].wallet != msg.sender, "Already participated");
        }
        
        // Add participant
        uint256 participantIndex = currentRound.participantCount;
        participants[currentRoundId][participantIndex] = Participant({
            wallet: msg.sender,
            depositAmount: msg.value,
            timestamp: block.timestamp,
            hasWon: false
        });
        
        participantAddresses[currentRoundId].push(msg.sender);
        currentRound.participantCount++;
        currentRound.totalDeposits += msg.value;
        
        emit ParticipantJoined(currentRoundId, msg.sender, msg.value);
        
        // Check if round is full
        if (currentRound.participantCount == MAX_PARTICIPANTS) {
            _completeRound();
        }
    }
    
    function completeRound() external onlyOwner onlyActiveRound {
        require(rounds[currentRoundId].participantCount > 0, "No participants");
        _completeRound();
    }
    
    function _completeRound() internal {
        Round storage currentRound = rounds[currentRoundId];
        currentRound.isActive = false;
        
        // Calculate prize amount (total deposits minus 2% fee)
        uint256 feeAmount = (currentRound.totalDeposits * FEE_PERCENTAGE) / 100;
        uint256 prizeAmount = currentRound.totalDeposits - feeAmount;
        
        totalFeesCollected += feeAmount;
        currentRound.prizeAmount = prizeAmount;
        
        // Request VRF for random winner selection
        require(!currentRound.vrfRequested, "VRF already requested");
        currentRound.vrfRequested = true;
        
        uint256 requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
        
        currentRound.requestId = requestId;
        emit VRFRequested(currentRoundId, requestId);
    }
    
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        // Find the round that requested this VRF
        uint256 roundId = 0;
        for (uint256 i = 1; i <= totalRounds; i++) {
            if (rounds[i].requestId == requestId) {
                roundId = i;
                break;
            }
        }
        
        require(roundId > 0, "Round not found for request");
        Round storage round = rounds[roundId];
        
        // Select winner using random number
        uint256 randomNumber = randomWords[0];
        uint256 winnerIndex = randomNumber % round.participantCount;
        address winner = participantAddresses[roundId][winnerIndex];
        
        round.winner = winner;
        round.winnerIndex = winnerIndex;
        round.isCompleted = true;
        
        // Mark winner
        participants[roundId][winnerIndex].hasWon = true;
        
        // Transfer prize to winner
        (bool success, ) = winner.call{value: round.prizeAmount}("");
        require(success, "Prize transfer failed");
        
        emit WinnerSelected(roundId, winner, randomNumber);
        emit RoundCompleted(roundId, winner, round.prizeAmount);
        
        // Start new round
        _startNewRound();
    }
    
    function _startNewRound() internal {
        currentRoundId++;
        totalRounds++;
        
        rounds[currentRoundId] = Round({
            roundId: currentRoundId,
            totalDeposits: 0,
            participantCount: 0,
            isActive: true,
            isCompleted: false,
            winnerIndex: 0,
            winner: address(0),
            prizeAmount: 0,
            requestId: 0,
            vrfRequested: false
        });
        
        emit RoundStarted(currentRoundId);
    }
    
    // View functions
    function getCurrentRound() external view returns (Round memory) {
        return rounds[currentRoundId];
    }
    
    function getRound(uint256 roundId) external view returns (Round memory) {
        return rounds[roundId];
    }
    
    function getParticipant(uint256 roundId, uint256 participantIndex) external view returns (Participant memory) {
        return participants[roundId][participantIndex];
    }
    
    function getParticipantAddresses(uint256 roundId) external view returns (address[] memory) {
        return participantAddresses[roundId];
    }
    
    function getParticipantCount(uint256 roundId) external view returns (uint256) {
        return rounds[roundId].participantCount;
    }
    
    function hasParticipated(uint256 roundId, address participant) external view returns (bool) {
        for (uint256 i = 0; i < rounds[roundId].participantCount; i++) {
            if (participants[roundId][i].wallet == participant) {
                return true;
            }
        }
        return false;
    }
    
    // Admin functions
    function withdrawFees() external onlyOwner {
        require(totalFeesCollected > 0, "No fees to withdraw");
        uint256 amount = totalFeesCollected;
        totalFeesCollected = 0;
        
        (bool success, ) = owner().call{value: amount}("");
        require(success, "Fee withdrawal failed");
    }
    
    function emergencyWithdraw() external onlyOwner {
        require(!rounds[currentRoundId].isActive || rounds[currentRoundId].participantCount == 0, "Active round with participants");
        
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Emergency withdrawal failed");
    }
    
    // Receive function
    receive() external payable {
        revert("Direct deposits not allowed");
    }
} 