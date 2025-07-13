import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    // Local development
    hardhat: {
      chainId: 31337,
      gas: 12000000,
      blockGasLimit: 12000000,
      allowUnlimitedContractSize: true,
    },
    
    // Citrea Testnet
    citreaTestnet: {
      url: "https://rpc.testnet.citrea.xyz",
      chainId: 1234, // Update with actual Citrea testnet chain ID
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000, // 20 gwei
      timeout: 60000,
    },
    
    // Citrea Mainnet (when available)
    citreaMainnet: {
      url: "https://rpc.citrea.xyz",
      chainId: 1235, // Update with actual Citrea mainnet chain ID
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000, // 20 gwei
      timeout: 60000,
    },
    
    // Mumbai Testnet (for VRF testing)
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 30000000000, // 30 gwei
      timeout: 60000,
    },
    
    // Polygon Mainnet
    polygon: {
      url: "https://polygon-rpc.com",
      chainId: 137,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 30000000000, // 30 gwei
      timeout: 60000,
    },
    
    // Sepolia Testnet
    sepolia: {
      url: "https://rpc.sepolia.org",
      chainId: 11155111,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000, // 20 gwei
      timeout: 60000,
    },
  },
  
  etherscan: {
    apiKey: {
      // PolygonScan API key for Mumbai and Polygon
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      
      // Etherscan API key for Sepolia
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      
      // Add Citrea block explorer API key when available
      citreaTestnet: process.env.CITREA_API_KEY || "",
      citreaMainnet: process.env.CITREA_API_KEY || "",
    },
    customChains: [
      {
        network: "citreaTestnet",
        chainId: 1234, // Update with actual chain ID
        urls: {
          apiURL: "https://explorer.testnet.citrea.xyz/api", // Update with actual API URL
          browserURL: "https://explorer.testnet.citrea.xyz",
        },
      },
      {
        network: "citreaMainnet",
        chainId: 1235, // Update with actual chain ID
        urls: {
          apiURL: "https://explorer.citrea.xyz/api", // Update with actual API URL
          browserURL: "https://explorer.citrea.xyz",
        },
      },
    ],
  },
  
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "ETH",
    gasPriceApi: "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
  },
  
  mocha: {
    timeout: 60000,
  },
  
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config; 