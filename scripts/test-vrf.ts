import { ethers } from "hardhat";

async function main() {
  console.log("🧪 Testing VRF Winner Selection with 100 addresses...");

  // Generate 100 test addresses
  const testAddresses: string[] = [];
  for (let i = 0; i < 100; i++) {
    const wallet = ethers.Wallet.createRandom();
    testAddresses.push(wallet.address);
  }

  console.log(`📝 Generated ${testAddresses.length} test addresses`);

  // Simulate VRF random number generation
  const simulateVRFSelection = (addresses: string[], randomNumber: number): string => {
    const winnerIndex = randomNumber % addresses.length;
    return addresses[winnerIndex];
  };

  // Test multiple random numbers to show fairness
  const testRandomNumbers = [
    123456789,
    987654321,
    555555555,
    111111111,
    999999999,
    777777777,
    333333333,
    888888888,
    444444444,
    666666666
  ];

  console.log("\n🎯 VRF Winner Selection Results:");
  console.log("=================================");

  testRandomNumbers.forEach((randomNumber, index) => {
    const winner = simulateVRFSelection(testAddresses, randomNumber);
    const winnerIndex = randomNumber % testAddresses.length;
    
    console.log(`Test ${index + 1}:`);
    console.log(`  Random Number: ${randomNumber}`);
    console.log(`  Winner Index: ${winnerIndex}`);
    console.log(`  Winner Address: ${winner}`);
    console.log(`  Shortened: ${winner.slice(0, 6)}...${winner.slice(-4)}`);
    console.log("");
  });

  // Show distribution analysis
  console.log("📊 Distribution Analysis:");
  console.log("=========================");

  const winnerCounts = new Map<string, number>();
  
  // Test with 1000 random numbers to show distribution
  for (let i = 0; i < 1000; i++) {
    const randomNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const winner = simulateVRFSelection(testAddresses, randomNumber);
    winnerCounts.set(winner, (winnerCounts.get(winner) || 0) + 1);
  }

  // Show top 10 most selected addresses
  const sortedWinners = Array.from(winnerCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log("Top 10 most selected addresses (out of 1000 tests):");
  sortedWinners.forEach(([address, count], index) => {
    const percentage = ((count / 1000) * 100).toFixed(2);
    console.log(`  ${index + 1}. ${address.slice(0, 6)}...${address.slice(-4)}: ${count} times (${percentage}%)`);
  });

  // Show fairness metrics
  const expectedCount = 1000 / 100; // 10 selections per address on average
  const actualCounts = Array.from(winnerCounts.values());
  const variance = actualCounts.reduce((sum, count) => sum + Math.pow(count - expectedCount, 2), 0) / actualCounts.length;
  const standardDeviation = Math.sqrt(variance);

  console.log(`\n📈 Fairness Metrics:`);
  console.log(`  Expected selections per address: ${expectedCount}`);
  console.log(`  Standard deviation: ${standardDeviation.toFixed(2)}`);
  console.log(`  Fairness ratio: ${(expectedCount / standardDeviation).toFixed(2)}`);

  // Demonstrate contract integration
  console.log("\n🔗 Contract Integration Example:");
  console.log("================================");

  // Simulate contract state
  const contractState = {
    roundId: 1,
    participants: testAddresses,
    participantCount: testAddresses.length,
    totalDeposits: ethers.parseEther("1.0"), // 1 ETH total (0.01 ETH per participant)
    isActive: false,
    isCompleted: true,
    winnerSelected: true,
    randomNumber: 123456789,
    winner: simulateVRFSelection(testAddresses, 123456789)
  };

  console.log("Contract State:");
  console.log(`  Round ID: ${contractState.roundId}`);
  console.log(`  Participants: ${contractState.participantCount}`);
  console.log(`  Total Deposits: ${ethers.formatEther(contractState.totalDeposits)} ETH`);
  console.log(`  Random Number: ${contractState.randomNumber}`);
  console.log(`  Winner: ${contractState.winner}`);
  console.log(`  Winner Shortened: ${contractState.winner.slice(0, 6)}...${contractState.winner.slice(-4)}`);

  // Calculate prize distribution
  const feePercentage = 200; // 2% in basis points
  const feeDenominator = 10000;
  const feeAmount = (contractState.totalDeposits * BigInt(feePercentage)) / BigInt(feeDenominator);
  const prizeAmount = contractState.totalDeposits - feeAmount;

  console.log("\n💰 Prize Distribution:");
  console.log(`  Total Pool: ${ethers.formatEther(contractState.totalDeposits)} ETH`);
  console.log(`  Fee (2%): ${ethers.formatEther(feeAmount)} ETH`);
  console.log(`  Prize: ${ethers.formatEther(prizeAmount)} ETH`);

  // Show VRF request simulation
  console.log("\n🎲 VRF Request Simulation:");
  console.log("===========================");

  const vrfConfig = {
    coordinator: "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed", // Mumbai VRF Coordinator
    subscriptionId: 1234,
    keyHash: "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f",
    callbackGasLimit: 500000,
    requestConfirmations: 3,
    numWords: 1
  };

  console.log("VRF Configuration:");
  console.log(`  Coordinator: ${vrfConfig.coordinator}`);
  console.log(`  Subscription ID: ${vrfConfig.subscriptionId}`);
  console.log(`  Key Hash: ${vrfConfig.keyHash}`);
  console.log(`  Callback Gas Limit: ${vrfConfig.callbackGasLimit}`);
  console.log(`  Request Confirmations: ${vrfConfig.requestConfirmations}`);
  console.log(`  Number of Words: ${vrfConfig.numWords}`);

  // Simulate VRF request
  console.log("\n📡 VRF Request Process:");
  console.log("1. Contract calls requestRandomWords()");
  console.log("2. VRF Coordinator generates random number");
  console.log("3. Coordinator calls fulfillRandomWords() on contract");
  console.log("4. Contract selects winner using random number");
  console.log("5. Winner can claim prize");

  console.log("\n✅ VRF Winner Selection Test Completed!");
  console.log("The system demonstrates fair and random winner selection from 100 participants.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }); 