import { ethers } from "hardhat";

async function main() {
  console.log("Deploying BitLuck Lottery...");

  // VRF Configuration for Citrea
  // These values need to be updated based on the actual VRF setup on Citrea
  const VRF_COORDINATOR_V2_ADDRESS = "0x0000000000000000000000000000000000000000"; // Update with actual address
  const SUBSCRIPTION_ID = 0; // Update with actual subscription ID
  const GAS_LANE = "0x0000000000000000000000000000000000000000000000000000000000000000"; // Update with actual gas lane
  const CALLBACK_GAS_LIMIT = 500000;

  const BitLuckLottery = await ethers.getContractFactory("BitLuckLottery");
  const lottery = await BitLuckLottery.deploy(
    VRF_COORDINATOR_V2_ADDRESS,
    SUBSCRIPTION_ID,
    GAS_LANE,
    CALLBACK_GAS_LIMIT
  );

  await lottery.waitForDeployment();
  const lotteryAddress = await lottery.getAddress();

  console.log("BitLuck Lottery deployed to:", lotteryAddress);
  console.log("VRF Coordinator:", VRF_COORDINATOR_V2_ADDRESS);
  console.log("Subscription ID:", SUBSCRIPTION_ID);
  console.log("Gas Lane:", GAS_LANE);
  console.log("Callback Gas Limit:", CALLBACK_GAS_LIMIT);

  // Verify contract on explorer
  console.log("Waiting for block confirmations...");
  await lottery.deploymentTransaction()?.wait(6);
  console.log("Contract deployed and confirmed!");

  // Save deployment info
  const deploymentInfo = {
    contractAddress: lotteryAddress,
    network: network.name,
    deployer: (await ethers.getSigners())[0].address,
    vrfCoordinator: VRF_COORDINATOR_V2_ADDRESS,
    subscriptionId: SUBSCRIPTION_ID,
    gasLane: GAS_LANE,
    callbackGasLimit: CALLBACK_GAS_LIMIT,
    deploymentTime: new Date().toISOString(),
  };

  console.log("Deployment Info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 