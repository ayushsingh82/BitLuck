import { ethers } from "hardhat";

async function main() {
  console.log("🔍 Starting contract verification...");

  // Contract addresses (update these with your deployed addresses)
  const CONTRACT_ADDRESSES = {
    lottery: "0x...", // Replace with actual lottery address
    treasury: "0x...", // Replace with actual treasury address
    bridgeVerifier: "0x...", // Replace with actual bridge verifier address
    roundManager: "0x...", // Replace with actual round manager address
  };

  // Constructor arguments (update these with your deployment parameters)
  const CONSTRUCTOR_ARGS = {
    lottery: [
      ethers.parseEther("0.01"), // requiredDeposit
      100, // maxParticipants
      24 * 60 * 60, // roundDuration (24 hours)
      200, // feePercentage (2%)
      "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed", // vrfCoordinator
      "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", // linkToken
      "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f", // keyHash
      0, // subscriptionId
      500000, // callbackGasLimit
      3, // requestConfirmations
      1, // numWords
    ],
    treasury: [
      CONTRACT_ADDRESSES.lottery, // lottery address
    ],
    bridgeVerifier: [], // No constructor arguments
    roundManager: [
      CONTRACT_ADDRESSES.lottery, // lottery address
    ],
  };

  try {
    // Verify Lottery contract
    if (CONTRACT_ADDRESSES.lottery !== "0x...") {
      console.log("🔍 Verifying Lottery contract...");
      await hre.run("verify:verify", {
        address: CONTRACT_ADDRESSES.lottery,
        constructorArguments: CONSTRUCTOR_ARGS.lottery,
      });
      console.log("✅ Lottery contract verified");
    }

    // Verify Treasury contract
    if (CONTRACT_ADDRESSES.treasury !== "0x...") {
      console.log("🔍 Verifying Treasury contract...");
      await hre.run("verify:verify", {
        address: CONTRACT_ADDRESSES.treasury,
        constructorArguments: CONSTRUCTOR_ARGS.treasury,
      });
      console.log("✅ Treasury contract verified");
    }

    // Verify Bridge Verifier contract
    if (CONTRACT_ADDRESSES.bridgeVerifier !== "0x...") {
      console.log("🔍 Verifying Bridge Verifier contract...");
      await hre.run("verify:verify", {
        address: CONTRACT_ADDRESSES.bridgeVerifier,
        constructorArguments: CONSTRUCTOR_ARGS.bridgeVerifier,
      });
      console.log("✅ Bridge Verifier contract verified");
    }

    // Verify Round Manager contract
    if (CONTRACT_ADDRESSES.roundManager !== "0x...") {
      console.log("🔍 Verifying Round Manager contract...");
      await hre.run("verify:verify", {
        address: CONTRACT_ADDRESSES.roundManager,
        constructorArguments: CONSTRUCTOR_ARGS.roundManager,
      });
      console.log("✅ Round Manager contract verified");
    }

    console.log("🎉 All contracts verified successfully!");

  } catch (error) {
    console.error("❌ Verification failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 