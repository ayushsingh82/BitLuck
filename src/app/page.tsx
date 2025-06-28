import Image from "next/image";
import ConnectWallet from './components/ConnectWallet';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Gradient Background */}
      <section className="text-center py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFCF40] via-[#FE850B] to-[#FC3B02]"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 text-black">
            Welcome to BitLuck
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-black">
            The First Bitcoin-Native Lottery on Citrea
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            Feeling lucky? Join the most fun way to put your BTC to work!
          </p>
          <p className="text-lg text-black max-w-4xl mx-auto  font-semibold">
            No wrapped tokens, no middlemen — just pure Bitcoin, verified on-chain.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            🎲 How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📥</div>
              <h3 className="text-xl font-semibold mb-3">Deposit BTC</h3>
              <p className="text-gray-600">
                Send 0.01 BTC to enter the current BitLuck round. Each deposit = 1 ticket.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-3">Verified On-Chain</h3>
              <p className="text-gray-600">
                Your Bitcoin transaction is bridged to Citrea using zk-proofs and light clients — no trust, just code.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Random Winner Chosen</h3>
              <p className="text-gray-600">
                We use Chainlink VRF to select the lucky winner fairly and transparently.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-semibold mb-3">Real BTC Prize Payout</h3>
              <p className="text-gray-600">
                Win the whole prize pool! The winner receives a native BTC transaction back to their wallet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why BitLuck Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            🪙 Why BitLuck?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#FFCF40] to-[#FE850B] text-white">
                  <th className="px-6 py-4 text-left text-lg font-semibold">🚀 Feature</th>
                  <th className="px-6 py-4 text-left text-lg font-semibold">✅ Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold">Bitcoin-First</td>
                  <td className="px-6 py-4">No wrapped tokens or bridges with custodians</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold">Fully On-Chain</td>
                  <td className="px-6 py-4">Citrea smart contracts + zk-verifiable Bitcoin</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold">Fair & Random</td>
                  <td className="px-6 py-4">Chainlink VRF guarantees honest selection</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold">Fast & Cheap</td>
                  <td className="px-6 py-4">Citrea Layer 2 = instant finality & low gas</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">Pure Fun</td>
                  <td className="px-6 py-4">Bring Vegas to the blockchain… with sats!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Prize Example Section with Gradient */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-8">
            🎁 Prize Example
          </h2>
          <div className="bg-gradient-to-r from-[#FFCF40] via-[#FE850B] to-[#FC3B02] rounded-lg p-8 text-white shadow-xl">
            <div className="text-6xl mb-4">💡</div>
            <p className="text-2xl font-semibold mb-2">100 players = 1 BTC prize pool</p>
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-2xl font-semibold">1 lucky winner takes all!</p>
          </div>
        </div>
      </section>

      {/* Live Round Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            👀 Live Round
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-gradient-to-b from-[#FFCF40] to-[#FC3B02]">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-2">🎟️</div>
                <p className="text-gray-600 mb-2">Players</p>
                <p className="text-3xl font-bold text-black">67/100</p>
              </div>
              <div>
                <div className="text-4xl mb-2">⌛</div>
                <p className="text-gray-600 mb-2">Time Remaining</p>
                <p className="text-3xl font-bold text-black">2h 13m</p>
              </div>
              <div>
                <div className="text-4xl mb-2">💰</div>
                <p className="text-gray-600 mb-2">Current Pot</p>
                <p className="text-3xl font-bold text-black">0.67 BTC</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button className="bg-gradient-to-r from-[#FFCF40] to-[#FE850B] text-black px-6 py-3 rounded-lg hover:from-[#FE850B] hover:to-[#FC3B02] transition-all duration-300 font-semibold mr-4 shadow-lg">
                🧑‍🤝‍🧑 View All Tickets
              </button>
              <button className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                🔗 View on Citrea Explorer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Powered By Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            🧪 Powered By
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🟠</div>
              <h3 className="text-xl font-semibold mb-2">Citrea</h3>
              <p className="text-gray-600">zk-rollup for Bitcoin</p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⛓️</div>
              <h3 className="text-xl font-semibold mb-2">Chainlink VRF</h3>
              <p className="text-gray-600">Verifiable randomness</p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">BitVM + Bridge</h3>
              <p className="text-gray-600">Real BTC bridging with SPV proofs</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Deposits Verified Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-8">
            🧠 How Are Deposits Verified?
          </h2>
          <div className="bg-gradient-to-r from-[#FFCF40] to-[#FE850B] bg-opacity-10 p-8 rounded-lg border border-[#FFCF40] border-opacity-30">
            <p className="text-lg text-gray-700 leading-relaxed">
              BitLuck uses Citrea's zkBridge to prove your BTC transaction happened — using a light client and SPV proof. Once verified, you're instantly entered into the round.
            </p>
          </div>
        </div>
      </section>

      {/* Ready to Play Section with Gradient */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-8">
            🎮 Ready to Play?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ConnectWallet />
            <button className="bg-gradient-to-r from-[#FFCF40] to-[#FE850B] text-black px-8 py-4 rounded-lg hover:from-[#FE850B] hover:to-[#FC3B02] transition-all duration-300 font-semibold text-lg shadow-lg">
              🎟️ Join the Current Round
            </button>
            <button className="bg-gray-200 text-black px-8 py-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-lg">
              📖 Read the Docs
            </button>
          </div>
          <div className="mt-8 p-6 bg-gradient-to-r from-[#FFCF40] via-[#FE850B] to-[#FC3B02] rounded-lg text-white">
            <p className="text-xl font-semibold italic">
              "May the sats be ever in your favor."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
