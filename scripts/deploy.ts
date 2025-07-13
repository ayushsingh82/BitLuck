import { ethers } from "hardhat";
import { verify } from "./verify";

async function main() {
  console.log("🚀 Starting BitLuck Lottery deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log(`📝 Deploying contracts with account: ${deployer.address}`);
  console.log(`💰 Account balance: ${ethers.formatEther(await deployer.provider.getBalance(deployer.address))} ETH`);

  // Deployment configuration
  const DEPLOYMENT_CONFIG = {
    // Lottery parameters
    requiredDeposit: ethers.parseEther("0.01"), // 0.01 ETH (representing 0.01 BTC)
    maxParticipants: 100,
    roundDuration: 24 * 60 * 60, // 24 hours in seconds
    feePercentage: 200, // 2% (in basis points)
    
    // VRF configuration for Citrea testnet
    vrfCoordinator: "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed", // Mumbai VRF Coordinator
    linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", // Mumbai LINK token
    keyHash: "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f", // Mumbai key hash
    subscriptionId: 0, // Will be set after deployment
    callbackGasLimit: 500000,
    requestConfirmations: 3,
    numWords: 1,
  };

  console.log("📋 Deployment Configuration:");
  console.log(`   Required Deposit: ${ethers.formatEther(DEPLOYMENT_CONFIG.requiredDeposit)} ETH`);
  console.log(`   Max Participants: ${DEPLOYMENT_CONFIG.maxParticipants}`);
  console.log(`   Round Duration: ${DEPLOYMENT_CONFIG.roundDuration / 3600} hours`);
  console.log(`   Fee Percentage: ${DEPLOYMENT_CONFIG.feePercentage / 100}%`);
  console.log(`   VRF Coordinator: ${DEPLOYMENT_CONFIG.vrfCoordinator}`);

  try {
    // Deploy the BitLuck Lottery contract
    console.log("\n🏗️  Deploying BitLuck Lottery contract...");
    const BitLuckLottery = await ethers.getContractFactory("BitLuckLottery");
    const lottery = await BitLuckLottery.deploy(
      DEPLOYMENT_CONFIG.requiredDeposit,
      DEPLOYMENT_CONFIG.maxParticipants,
      DEPLOYMENT_CONFIG.roundDuration,
      DEPLOYMENT_CONFIG.feePercentage,
      DEPLOYMENT_CONFIG.vrfCoordinator,
      DEPLOYMENT_CONFIG.linkToken,
      DEPLOYMENT_CONFIG.keyHash,
      DEPLOYMENT_CONFIG.subscriptionId,
      DEPLOYMENT_CONFIG.callbackGasLimit,
      DEPLOYMENT_CONFIG.requestConfirmations,
      DEPLOYMENT_CONFIG.numWords
    );

    await lottery.waitForDeployment();
    const lotteryAddress = await lottery.getAddress();
    console.log(`✅ BitLuck Lottery deployed to: ${lotteryAddress}`);

    // Deploy the Treasury contract
    console.log("\n🏦 Deploying Treasury contract...");
    const Treasury = await ethers.getContractFactory("Treasury");
    const treasury = await Treasury.deploy(lotteryAddress);
    await treasury.waitForDeployment();
    const treasuryAddress = await treasury.getAddress();
    console.log(`✅ Treasury deployed to: ${treasuryAddress}`);

    // Set treasury in lottery contract
    console.log("\n🔗 Setting treasury in lottery contract...");
    const setTreasuryTx = await lottery.setTreasury(treasuryAddress);
    await setTreasuryTx.wait();
    console.log("✅ Treasury set in lottery contract");

    // Deploy the Bridge Verifier contract (for BTC transaction verification)
    console.log("\n🌉 Deploying Bridge Verifier contract...");
    const BridgeVerifier = await ethers.getContractFactory("BridgeVerifier");
    const bridgeVerifier = await BridgeVerifier.deploy();
    await bridgeVerifier.waitForDeployment();
    const bridgeVerifierAddress = await bridgeVerifier.getAddress();
    console.log(`✅ Bridge Verifier deployed to: ${bridgeVerifierAddress}`);

    // Set bridge verifier in lottery contract
    console.log("\n🔗 Setting bridge verifier in lottery contract...");
    const setBridgeVerifierTx = await lottery.setBridgeVerifier(bridgeVerifierAddress);
    await setBridgeVerifierTx.wait();
    console.log("✅ Bridge verifier set in lottery contract");

    // Deploy the Round Manager contract
    console.log("\n🎯 Deploying Round Manager contract...");
    const RoundManager = await ethers.getContractFactory("RoundManager");
    const roundManager = await RoundManager.deploy(lotteryAddress);
    await roundManager.waitForDeployment();
    const roundManagerAddress = await roundManager.getAddress();
    console.log(`✅ Round Manager deployed to: ${roundManagerAddress}`);

    // Set round manager in lottery contract
    console.log("\n🔗 Setting round manager in lottery contract...");
    const setRoundManagerTx = await lottery.setRoundManager(roundManagerAddress);
    await setRoundManagerTx.wait();
    console.log("✅ Round manager set in lottery contract");

    // Grant roles to round manager
    console.log("\n🔐 Granting roles to round manager...");
    const roundManagerRole = await lottery.ROUND_MANAGER_ROLE();
    const grantRoleTx = await lottery.grantRole(roundManagerRole, roundManagerAddress);
    await grantRoleTx.wait();
    console.log("✅ Round manager role granted");

    // Initialize the first round
    console.log("\n🎲 Initializing first round...");
    const initRoundTx = await roundManager.initializeRound();
    await initRoundTx.wait();
    console.log("✅ First round initialized");

    // Verify contracts on block explorer (if not on local network)
    const network = await ethers.provider.getNetwork();
    if (network.chainId !== 31337n) { // Not local network
      console.log("\n🔍 Verifying contracts on block explorer...");
      
      try {
        await verify(lotteryAddress, [
          DEPLOYMENT_CONFIG.requiredDeposit,
          DEPLOYMENT_CONFIG.maxParticipants,
          DEPLOYMENT_CONFIG.roundDuration,
          DEPLOYMENT_CONFIG.feePercentage,
          DEPLOYMENT_CONFIG.vrfCoordinator,
          DEPLOYMENT_CONFIG.linkToken,
          DEPLOYMENT_CONFIG.keyHash,
          DEPLOYMENT_CONFIG.subscriptionId,
          DEPLOYMENT_CONFIG.callbackGasLimit,
          DEPLOYMENT_CONFIG.requestConfirmations,
          DEPLOYMENT_CONFIG.numWords
        ]);
        console.log("✅ Lottery contract verified");

        await verify(treasuryAddress, [lotteryAddress]);
        console.log("✅ Treasury contract verified");

        await verify(bridgeVerifierAddress, []);
        console.log("✅ Bridge Verifier contract verified");

        await verify(roundManagerAddress, [lotteryAddress]);
        console.log("✅ Round Manager contract verified");
      } catch (error) {
        console.log("⚠️  Contract verification failed:", error);
      }
    }

    // Deployment summary
    console.log("\n🎉 Deployment Summary:");
    console.log("========================");
    console.log(`📋 Lottery Contract: ${lotteryAddress}`);
    console.log(`🏦 Treasury Contract: ${treasuryAddress}`);
    console.log(`🌉 Bridge Verifier: ${bridgeVerifierAddress}`);
    console.log(`🎯 Round Manager: ${roundManagerAddress}`);
    console.log(`🔗 Network: ${network.name} (Chain ID: ${network.chainId})`);
    console.log(`👤 Deployer: ${deployer.address}`);

    // Save deployment info to file
    const deploymentInfo = {
      network: network.name,
      chainId: network.chainId.toString(),
      deployer: deployer.address,
      contracts: {
        lottery: lotteryAddress,
        treasury: treasuryAddress,
        bridgeVerifier: bridgeVerifierAddress,
        roundManager: roundManagerAddress
      },
      config: {
        requiredDeposit: DEPLOYMENT_CONFIG.requiredDeposit.toString(),
        maxParticipants: DEPLOYMENT_CONFIG.maxParticipants,
        roundDuration: DEPLOYMENT_CONFIG.roundDuration,
        feePercentage: DEPLOYMENT_CONFIG.feePercentage,
        vrfCoordinator: DEPLOYMENT_CONFIG.vrfCoordinator,
        linkToken: DEPLOYMENT_CONFIG.linkToken,
        keyHash: DEPLOYMENT_CONFIG.keyHash
      },
      timestamp: new Date().toISOString()
    };

    const fs = require('fs');
    const path = require('path');
    const deploymentPath = path.join(__dirname, '..', 'deployments');
    
    if (!fs.existsSync(deploymentPath)) {
      fs.mkdirSync(deploymentPath, { recursive: true });
    }

    const deploymentFile = path.join(deploymentPath, `deployment-${network.chainId}-${Date.now()}.json`);
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    console.log(`📄 Deployment info saved to: ${deploymentFile}`);

    // Next steps instructions
    console.log("\n📝 Next Steps:");
    console.log("===============");
    console.log("1. Fund the VRF subscription with LINK tokens");
    console.log("2. Set the subscription ID in the lottery contract");
    console.log("3. Configure the bridge verifier with BTC light client data");
    console.log("4. Test the deposit and withdrawal functionality");
    console.log("5. Update the frontend with the new contract addresses");

    console.log("\n🎊 BitLuck Lottery deployment completed successfully!");

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

// Helper function to verify contracts
async function verify(contractAddress: string, constructorArguments: any[]) {
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArguments,
    });
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("Contract already verified");
    } else {
      throw error;
    }
  }
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 