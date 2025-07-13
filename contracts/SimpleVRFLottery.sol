// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SimpleVRFLottery
 * @dev Simplified lottery contract demonstrating VRF winner selection from 100 addresses
 * This is a demonstration contract - for production use the full BitLuckLottery contract
 */
contract SimpleVRFLottery {
    // ============ STATE VARIABLES ============
    address[] public participants;
    uint256 public maxParticipants = 100;
    uint256 public requiredDeposit = 0.01 ether;
    bool public roundActive = true;
    bool public winnerSelected = false;
    address public winner;
    uint256 public randomNumber;
    uint256 public totalDeposits;
    
    // VRF Simulation (in production, this would use Chainlink VRF)
    uint256 private nonce = 0;
    
    // ============ EVENTS ============
    event ParticipantJoined(address indexed participant, uint256 depositAmount);
    event WinnerSelected(address indexed winner, uint256 randomNumber, uint256 prizeAmount);
    event RoundCompleted(uint256 totalParticipants, uint256 totalPrize);
    
    // ============ MODIFIERS ============
    modifier onlyActiveRound() {
        require(roundActive, "Round not active");
        _;
    }
    
    modifier roundNotCompleted() {
        require(!winnerSelected, "Winner already selected");
        _;
    }
    
    // ============ EXTERNAL FUNCTIONS ============
    
    /**
     * @dev Join the lottery round
     */
    function joinLottery() external payable onlyActiveRound roundNotCompleted {
        require(msg.value == requiredDeposit, "Incorrect deposit amount");
        require(participants.length < maxParticipants, "Round is full");
        require(!isParticipant(msg.sender), "Already joined");
        
        participants.push(msg.sender);
        totalDeposits += msg.value;
        
        emit ParticipantJoined(msg.sender, msg.value);
        
        // Auto-select winner when round is full
        if (participants.length == maxParticipants) {
            selectWinner();
        }
    }
    
    /**
     * @dev Select winner using simulated VRF
     * In production, this would be called by Chainlink VRF callback
     */
    function selectWinner() public onlyActiveRound roundNotCompleted {
        require(participants.length > 0, "No participants");
        
        // Simulate VRF random number generation
        randomNumber = generateRandomNumber();
        
        // Select winner using modulo operation
        uint256 winnerIndex = randomNumber % participants.length;
        winner = participants[winnerIndex];
        
        winnerSelected = true;
        roundActive = false;
        
        uint256 prizeAmount = totalDeposits;
        
        emit WinnerSelected(winner, randomNumber, prizeAmount);
        emit RoundCompleted(participants.length, prizeAmount);
    }
    
    /**
     * @dev Claim prize (only winner can call)
     */
    function claimPrize() external {
        require(winnerSelected, "Winner not selected");
        require(msg.sender == winner, "Not the winner");
        require(address(this).balance >= totalDeposits, "Insufficient balance");
        
        uint256 prizeAmount = totalDeposits;
        
        // Reset for next round
        delete participants;
        totalDeposits = 0;
        winnerSelected = false;
        roundActive = true;
        winner = address(0);
        randomNumber = 0;
        
        // Transfer prize
        (bool success, ) = payable(msg.sender).call{value: prizeAmount}("");
        require(success, "Prize transfer failed");
    }
    
    /**
     * @dev Start a new round (admin function)
     */
    function startNewRound() external {
        require(!roundActive || winnerSelected, "Round still active");
        
        delete participants;
        totalDeposits = 0;
        winnerSelected = false;
        roundActive = true;
        winner = address(0);
        randomNumber = 0;
    }
    
    // ============ VIEW FUNCTIONS ============
    
    /**
     * @dev Get all participants
     */
    function getParticipants() external view returns (address[] memory) {
        return participants;
    }
    
    /**
     * @dev Get participant count
     */
    function getParticipantCount() external view returns (uint256) {
        return participants.length;
    }
    
    /**
     * @dev Check if address is participant
     */
    function isParticipant(address participant) public view returns (bool) {
        for (uint256 i = 0; i < participants.length; i++) {
            if (participants[i] == participant) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * @dev Get round status
     */
    function getRoundStatus() external view returns (
        bool active,
        bool completed,
        uint256 participantCount,
        uint256 deposits,
        address roundWinner,
        uint256 roundRandomNumber
    ) {
        return (
            roundActive,
            winnerSelected,
            participants.length,
            totalDeposits,
            winner,
            randomNumber
        );
    }
    
    // ============ INTERNAL FUNCTIONS ============
    
    /**
     * @dev Generate a pseudo-random number (for demonstration)
     * In production, this would be replaced by Chainlink VRF
     */
    function generateRandomNumber() internal returns (uint256) {
        nonce++;
        return uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            nonce,
            participants.length
        )));
    }
    
    // ============ RECEIVE FUNCTION ============
    receive() external payable {
        // Allow receiving ETH
    }
}

/**
 * @title ChainlinkVRFLottery
 * @dev Example of how the contract would look with actual Chainlink VRF integration
 * This is a template - requires Chainlink contracts to be installed
 */
contract ChainlinkVRFLottery {
    // VRF Coordinator interface
    // VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    // uint64 private immutable i_subscriptionId;
    // bytes32 private immutable i_gasLane;
    // uint32 private immutable i_callbackGasLimit;
    // uint16 private constant REQUEST_CONFIRMATIONS = 3;
    // uint32 private constant NUM_WORDS = 1;
    
    // Lottery state
    address[] public participants;
    uint256 public maxParticipants = 100;
    uint256 public requiredDeposit = 0.01 ether;
    bool public roundActive = true;
    bool public winnerSelected = false;
    address public winner;
    uint256 public randomNumber;
    uint256 public totalDeposits;
    uint256 public vrfRequestId;
    
    // Events
    event ParticipantJoined(address indexed participant, uint256 depositAmount);
    event VRFRequested(uint256 indexed requestId);
    event WinnerSelected(address indexed winner, uint256 randomNumber, uint256 prizeAmount);
    event RoundCompleted(uint256 totalParticipants, uint256 totalPrize);
    
    // Constructor would initialize VRF coordinator
    // constructor(
    //     address vrfCoordinatorV2,
    //     uint64 subscriptionId,
    //     bytes32 gasLane,
    //     uint32 callbackGasLimit
    // ) VRFConsumerBaseV2(vrfCoordinatorV2) {
    //     i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
    //     i_subscriptionId = subscriptionId;
    //     i_gasLane = gasLane;
    //     i_callbackGasLimit = callbackGasLimit;
    // }
    
    /**
     * @dev Join the lottery round
     */
    function joinLottery() external payable {
        require(msg.value == requiredDeposit, "Incorrect deposit amount");
        require(participants.length < maxParticipants, "Round is full");
        require(!isParticipant(msg.sender), "Already joined");
        
        participants.push(msg.sender);
        totalDeposits += msg.value;
        
        emit ParticipantJoined(msg.sender, msg.value);
        
        // Request VRF when round is full
        if (participants.length == maxParticipants) {
            requestRandomWinner();
        }
    }
    
    /**
     * @dev Request random number from Chainlink VRF
     */
    function requestRandomWinner() internal {
        require(participants.length > 0, "No participants");
        require(!winnerSelected, "Winner already selected");
        
        // In production, this would call:
        // uint256 requestId = i_vrfCoordinator.requestRandomWords(
        //     i_gasLane,
        //     i_subscriptionId,
        //     REQUEST_CONFIRMATIONS,
        //     i_callbackGasLimit,
        //     NUM_WORDS
        // );
        // vrfRequestId = requestId;
        // emit VRFRequested(requestId);
        
        // For demonstration, simulate the request
        vrfRequestId = uint256(keccak256(abi.encodePacked(block.timestamp, participants.length)));
        emit VRFRequested(vrfRequestId);
    }
    
    /**
     * @dev VRF callback function (would be called by Chainlink)
     */
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal {
        require(requestId == vrfRequestId, "Invalid request ID");
        require(!winnerSelected, "Winner already selected");
        
        randomNumber = randomWords[0];
        
        // Select winner using modulo operation
        uint256 winnerIndex = randomNumber % participants.length;
        winner = participants[winnerIndex];
        
        winnerSelected = true;
        roundActive = false;
        
        uint256 prizeAmount = totalDeposits;
        
        emit WinnerSelected(winner, randomNumber, prizeAmount);
        emit RoundCompleted(participants.length, prizeAmount);
    }
    
    /**
     * @dev Check if address is participant
     */
    function isParticipant(address participant) public view returns (bool) {
        for (uint256 i = 0; i < participants.length; i++) {
            if (participants[i] == participant) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * @dev Claim prize
     */
    function claimPrize() external {
        require(winnerSelected, "Winner not selected");
        require(msg.sender == winner, "Not the winner");
        require(address(this).balance >= totalDeposits, "Insufficient balance");
        
        uint256 prizeAmount = totalDeposits;
        
        // Reset for next round
        delete participants;
        totalDeposits = 0;
        winnerSelected = false;
        roundActive = true;
        winner = address(0);
        randomNumber = 0;
        vrfRequestId = 0;
        
        // Transfer prize
        (bool success, ) = payable(msg.sender).call{value: prizeAmount}("");
        require(success, "Prize transfer failed");
    }
    
    receive() external payable {}
} 