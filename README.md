# 🎲 BitLuck - Trustless Bitcoin Lottery on Citrea

**BitLuck** is a decentralized, transparent, and fair lottery DApp built on the **Citrea Bitcoin rollup**. It leverages **Chainlink VRF** to ensure randomness in selecting one lucky winner from 100 participants, each depositing **0.01 cBTC**. One winner takes the entire pot — no middlemen, no manipulation.

---

## 🌟 Features

- 🎯 **Fixed Pool**: 100 users per round, each contributing 0.01 cBTC
- 🔐 **Trustless Execution**: Fully automated smart contract logic
- 🧠 **Verifiable Randomness**: Winner selected using Chainlink VRF
- 🌐 **Bitcoin-Native**: Runs entirely on Citrea using native Bitcoin-backed assets
- 📈 **Fair & Transparent**: On-chain, auditable lottery rounds

---

## 💼 Use Case

BitLuck provides a fun, simple, and low-risk way for Bitcoin holders to engage with on-chain activity. It also helps bootstrap **cBTC liquidity on Citrea** and demonstrates a practical use case for **zk-rollup scaling**.

---

## ⚙️ How It Works

1. Users deposit **0.01 cBTC** into the contract to enter.
2. Once 100 entries are received, the pool is locked.
3. Chainlink VRF is triggered to select a **random winner**.
4. Winner receives the **entire prize pool** .

---

## 📦 Installation (Coming Soon)

```bash
git clone https://github.com/your-org/bitluck.git
cd bitluck
yarn install
yarn dev
