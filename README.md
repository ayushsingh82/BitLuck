# 🎰 BitLuck - Bitcoin-Native Lottery on Citrea

BitLuck is the first Bitcoin-native lottery built on the Citrea zk-rollup platform. Players can participate using real Bitcoin (no wrapped tokens) with verifiable randomness powered by Chainlink VRF.

## 🚀 Features

- **Bitcoin-First**: No wrapped tokens or custodial bridges
- **Fully On-Chain**: Smart contracts on Citrea with zk-verifiable Bitcoin
- **Fair & Random**: Chainlink VRF guarantees honest winner selection
- **Fast & Cheap**: Citrea Layer 2 for instant finality and low gas
- **Transparent**: All transactions and randomness verifiable on-chain

## 🏗️ Architecture

### Smart Contracts

- **BitLuckLottery**: Main lottery contract with VRF integration
- **Treasury**: Manages prize pools and fee collection
- **BridgeVerifier**: Verifies Bitcoin transactions using SPV proofs
- **RoundManager**: Handles round lifecycle and participant management

### Frontend

- **Next.js 15**: Modern React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **RainbowKit**: Wallet connection and management
- **Wagmi**: React hooks for Ethereum

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bitluck-lottery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   # Private key for deployment (without 0x prefix)
   PRIVATE_KEY=your_private_key_here
   
   # API keys for contract verification
   POLYGONSCAN_API_KEY=your_polygonscan_api_key
   ETHERSCAN_API_KEY=your_etherscan_api_key
   CITREA_API_KEY=your_citrea_api_key
   
   # Optional: Gas reporting
   REPORT_GAS=true
   COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
   ```

## 🚀 Deployment

### Prerequisites

- Node.js 18+ and npm
- Hardhat CLI
- Private key with sufficient funds for deployment
- API keys for contract verification

### Local Development

1. **Start local Hardhat node**
   ```bash
   npm run node
   ```

2. **Deploy to local network**
   ```bash
   npm run deploy:local
   ```

3. **Start frontend**
   ```bash
   npm run dev
   ```

### Citrea Testnet Deployment

1. **Compile contracts**
   ```bash
   npm run compile
   ```

2. **Deploy to Citrea testnet**
   ```bash
   npm run deploy:citrea-testnet
   ```

3. **Verify contracts**
   ```bash
   npm run verify:citrea-testnet
   ```

### Mumbai Testnet (for VRF testing)

1. **Deploy to Mumbai**
   ```bash
   npm run deploy:mumbai
   ```

2. **Verify contracts**
   ```bash
   npm run verify:mumbai
   ```

### Citrea Mainnet Deployment

1. **Deploy to Citrea mainnet**
   ```bash
   npm run deploy:citrea-mainnet
   ```

2. **Verify contracts**
   ```bash
   npm run verify:citrea-mainnet
   ```

## 🔧 Configuration

### Network Configuration

Update `hardhat.config.ts` with the correct network parameters:

```typescript
citreaTestnet: {
  url: "https://rpc.testnet.citrea.xyz",
  chainId: 1234, // Update with actual chain ID
  accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  gasPrice: 20000000000, // 20 gwei
},
```

### VRF Configuration

For Citrea network, you'll need to:

1. **Create a VRF subscription** on the appropriate network
2. **Fund the subscription** with LINK tokens
3. **Update the subscription ID** in the deployment script
4. **Configure the VRF coordinator** address

### Bridge Configuration

The bridge verifier needs to be configured with:

1. **Bitcoin light client data**
2. **SPV proof verification logic**
3. **Bridge contract addresses**

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Run with Coverage
```bash
npm run coverage
```

### Gas Report
```bash
npm run gas-report
```

## 📊 Contract Addresses

After deployment, contract addresses will be saved to `deployments/deployment-{chainId}-{timestamp}.json`.

### Example Deployment Output
```json
{
  "network": "citreaTestnet",
  "chainId": "1234",
  "deployer": "0x...",
  "contracts": {
    "lottery": "0x...",
    "treasury": "0x...",
    "bridgeVerifier": "0x...",
    "roundManager": "0x..."
  }
}
```

## 🔗 Integration

### Frontend Integration

Update your frontend configuration with the deployed contract addresses:

```typescript
// config/contracts.ts
export const CONTRACTS = {
  lottery: "0x...", // Deployed lottery address
  treasury: "0x...", // Deployed treasury address
  bridgeVerifier: "0x...", // Deployed bridge verifier address
  roundManager: "0x...", // Deployed round manager address
};
```

### Wallet Integration

The frontend uses RainbowKit for wallet connections. Supported wallets:

- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- And more...

## 🛠️ Development

### Project Structure
```
├── contracts/          # Smart contracts
├── scripts/           # Deployment and utility scripts
├── test/              # Contract tests
├── src/               # Frontend source code
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   └── hooks/        # Custom React hooks
├── deployments/       # Deployment artifacts
└── hardhat.config.ts # Hardhat configuration
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run compile` - Compile smart contracts
- `npm run test` - Run contract tests
- `npm run deploy:*` - Deploy to various networks
- `npm run verify:*` - Verify contracts on block explorers

## 🔒 Security

### Audit Status
- [ ] External audit pending
- [ ] Internal review completed
- [ ] Bug bounty program planned

### Security Features
- **Access Control**: Role-based permissions
- **Reentrancy Protection**: OpenZeppelin ReentrancyGuard
- **VRF Security**: Chainlink VRF for randomness
- **Input Validation**: Comprehensive parameter checks
- **Emergency Pause**: Circuit breaker functionality

## 📈 Roadmap

### Phase 1: MVP (Current)
- [x] Basic lottery functionality
- [x] VRF integration
- [x] Frontend UI
- [x] Contract deployment

### Phase 2: Enhanced Features
- [ ] Multiple round types
- [ ] Progressive jackpots
- [ ] Referral system
- [ ] Mobile app

### Phase 3: Advanced Features
- [ ] Cross-chain compatibility
- [ ] DAO governance
- [ ] Advanced analytics
- [ ] API for third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.bitluck.xyz](https://docs.bitluck.xyz)
- **Discord**: [discord.gg/bitluck](https://discord.gg/bitluck)
- **Twitter**: [@BitLuckLottery](https://twitter.com/BitLuckLottery)
- **Email**: support@bitluck.xyz

## ⚠️ Disclaimer

This software is provided "as is" without warranty. Use at your own risk. The developers are not responsible for any financial losses incurred through the use of this software.

---

**May the sats be ever in your favor! 🎰**
