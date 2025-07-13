import { ethers } from "hardhat";

async function main() {
  console.log("🎰 Deploying VRF Lottery Contract...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log(`📝 Deploying with account: ${deployer.address}`);
  console.log(`💰 Account balance: ${ethers.formatEther(await deployer.provider.getBalance(deployer.address))} ETH`);

  try {
    // Deploy the Simple VRF Lottery contract
    console.log("\n🏗️  Deploying SimpleVRFLottery contract...");
    const SimpleVRFLottery = await ethers.getContractFactory("SimpleVRFLottery");
    const simpleLottery = await SimpleVRFLottery.deploy();
    await simpleLottery.waitForDeployment();
    const simpleLotteryAddress = await simpleLottery.getAddress();
    console.log(`✅ SimpleVRFLottery deployed to: ${simpleLotteryAddress}`);

    // Test the contract with 100 addresses
    console.log("\n🧪 Testing with 100 addresses...");
    
    // Generate 100 test addresses
    const testAddresses: string[] = [];
    const testWallets: ethers.Wallet[] = [];
    
    for (let i = 0; i < 100; i++) {
      const wallet = ethers.Wallet.createRandom();
      testAddresses.push(wallet.address);
      testWallets.push(wallet);
    }

    console.log(`📝 Generated ${testAddresses.length} test addresses`);

    // Simulate 100 participants joining (this would require funding in real scenario)
    console.log("\n👥 Simulating participant joins...");
    
    // Note: In a real scenario, each participant would need to send 0.01 ETH
    // For this demo, we'll just show the contract state
    console.log("📊 Contract Configuration:");
    console.log(`   Max Participants: ${await simpleLottery.maxParticipants()}`);
    console.log(`   Required Deposit: ${ethers.formatEther(await simpleLottery.requiredDeposit())} ETH`);
    console.log(`   Round Active: ${await simpleLottery.roundActive()}`);
    console.log(`   Winner Selected: ${await simpleLottery.winnerSelected()}`);

    // Demonstrate winner selection logic
    console.log("\n🎯 Winner Selection Logic:");
    console.log("==========================");
    
    const demonstrateWinnerSelection = (addresses: string[], randomNumber: number) => {
      const winnerIndex = randomNumber % addresses.length;
      const winner = addresses[winnerIndex];
      return { winnerIndex, winner };
    };

    // Test with different random numbers
    const testRandomNumbers = [
      123456789,
      987654321,
      555555555,
      111111111,
      999999999
    ];

    testRandomNumbers.forEach((randomNumber, index) => {
      const { winnerIndex, winner } = demonstrateWinnerSelection(testAddresses, randomNumber);
      console.log(`Test ${index + 1}:`);
      console.log(`  Random Number: ${randomNumber}`);
      console.log(`  Winner Index: ${winnerIndex}`);
      console.log(`  Winner Address: ${winner}`);
      console.log(`  Shortened: ${winner.slice(0, 6)}...${winner.slice(-4)}`);
      console.log("");
    });

    // Show contract functions
    console.log("🔧 Available Contract Functions:");
    console.log("=================================");
    console.log("1. joinLottery() - Join the lottery with 0.01 ETH");
    console.log("2. selectWinner() - Select winner using VRF simulation");
    console.log("3. claimPrize() - Winner claims their prize");
    console.log("4. startNewRound() - Start a new round");
    console.log("5. getParticipants() - Get all participant addresses");
    console.log("6. getParticipantCount() - Get number of participants");
    console.log("7. isParticipant(address) - Check if address is participant");
    console.log("8. getRoundStatus() - Get complete round status");

    // Show VRF integration example
    console.log("\n🎲 VRF Integration Example:");
    console.log("============================");
    console.log("In production, the contract would:");
    console.log("1. Call Chainlink VRF Coordinator.requestRandomWords()");
    console.log("2. Receive random number in fulfillRandomWords() callback");
    console.log("3. Use modulo operation to select winner");
    console.log("4. Emit events for transparency");

    // Show deployment summary
    console.log("\n🎉 Deployment Summary:");
    console.log("=======================");
    console.log(`📋 SimpleVRFLottery: ${simpleLotteryAddress}`);
    console.log(`👤 Deployer: ${deployer.address}`);
    console.log(`🔗 Network: ${(await ethers.provider.getNetwork()).name}`);

    // Save deployment info
    const deploymentInfo = {
      network: (await ethers.provider.getNetwork()).name,
      chainId: (await ethers.provider.getNetwork()).chainId.toString(),
      deployer: deployer.address,
      contracts: {
        simpleVRFLottery: simpleLotteryAddress
      },
      testAddresses: testAddresses.slice(0, 10), // Save first 10 for reference
      timestamp: new Date().toISOString()
    };

    const fs = require('fs');
    const path = require('path');
    const deploymentPath = path.join(__dirname, '..', 'deployments');
    
    if (!fs.existsSync(deploymentPath)) {
      fs.mkdirSync(deploymentPath, { recursive: true });
    }

    const deploymentFile = path.join(deploymentPath, `vrf-lottery-deployment-${Date.now()}.json`);
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    console.log(`📄 Deployment info saved to: ${deploymentFile}`);

    // Show next steps
    console.log("\n📝 Next Steps:");
    console.log("===============");
    console.log("1. Fund the contract with ETH for prizes");
    console.log("2. Have 100 participants call joinLottery() with 0.01 ETH each");
    console.log("3. When round is full, winner will be automatically selected");
    console.log("4. Winner can call claimPrize() to receive the full prize pool");
    console.log("5. Call startNewRound() to begin a new round");

    console.log("\n🎊 VRF Lottery deployment completed successfully!");

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 