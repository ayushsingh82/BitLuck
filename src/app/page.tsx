import Image from "next/image";
import ConnectWallet from './components/ConnectWallet';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-yellow-50">
      {/* Enhanced Hero Section with Animated Background */}
      <section className="text-center py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFCF40] via-[#FE850B] to-[#FC3B02] opacity-90"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24 blur-3xl"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-8 shadow-2xl backdrop-blur-sm">
            <span className="text-5xl">🎰</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-2xl">
            Welcome to BitLuck
          </h1>
          <h2 className="text-3xl font-semibold mb-6 text-white/90 drop-shadow-lg">
            The First Bitcoin-Native Lottery on Citrea
          </h2>
          <p className="text-2xl text-white/95 max-w-4xl mx-auto mb-10 font-medium leading-relaxed">
            Feeling lucky? Join the most fun way to put your BTC to work!
          </p>
          <p className="text-xl text-white/90 max-w-5xl mx-auto font-semibold leading-relaxed">
            No wrapped tokens, no middlemen — just pure Bitcoin, verified on-chain.
          </p>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFCF40] to-[#FE850B] rounded-2xl mb-6 shadow-lg">
              <span className="text-3xl">🎲</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Simple, transparent, and fair — just like Bitcoin should be
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">📥</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Deposit BTC</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Send 0.01 BTC to enter the current BitLuck round. Each deposit = 1 ticket.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🔗</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Verified On-Chain</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Your Bitcoin transaction is bridged to Citrea using zk-proofs and light clients — no trust, just code.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Random Winner Chosen</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                We use Chainlink VRF to select the lucky winner fairly and transparently.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">💸</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Real BTC Prize Payout</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Win the whole prize pool! The winner receives a native BTC transaction back to their wallet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Why BitLuck Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFCF40] to-[#FE850B] rounded-2xl mb-6 shadow-lg">
              <span className="text-3xl">🪙</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Why BitLuck?
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Built for Bitcoiners, by Bitcoiners
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#FFCF40] to-[#FE850B]">
                    <th className="px-8 py-6 text-left text-xl font-bold text-white">🚀 Feature</th>
                    <th className="px-8 py-6 text-left text-xl font-bold text-white">✅ Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-orange-50 transition-all duration-300">
                    <td className="px-8 py-6 font-bold text-lg text-gray-900">Bitcoin-First</td>
                    <td className="px-8 py-6 text-gray-700 font-medium">No wrapped tokens or bridges with custodians</td>
                  </tr>
                  <tr className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-orange-50 transition-all duration-300">
                    <td className="px-8 py-6 font-bold text-lg text-gray-900">Fully On-Chain</td>
                    <td className="px-8 py-6 text-gray-700 font-medium">Citrea smart contracts + zk-verifiable Bitcoin</td>
                  </tr>
                  <tr className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-orange-50 transition-all duration-300">
                    <td className="px-8 py-6 font-bold text-lg text-gray-900">Fair & Random</td>
                    <td className="px-8 py-6 text-gray-700 font-medium">Chainlink VRF guarantees honest selection</td>
                  </tr>
                  <tr className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-orange-50 transition-all duration-300">
                    <td className="px-8 py-6 font-bold text-lg text-gray-900">Fast & Cheap</td>
                    <td className="px-8 py-6 text-gray-700 font-medium">Citrea Layer 2 = instant finality & low gas</td>
                  </tr>
                  <tr className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-orange-50 transition-all duration-300">
                    <td className="px-8 py-6 font-bold text-lg text-gray-900">Pure Fun</td>
                    <td className="px-8 py-6 text-gray-700 font-medium">Bring Vegas to the blockchain… with sats!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Prize Example Section */}
      <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFCF40] to-[#FE850B] rounded-2xl mb-6 shadow-lg">
            <span className="text-3xl">🎁</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-12">
            Prize Example
          </h2>
          <div className="bg-gradient-to-r from-[#FFCF40] via-[#FE850B] to-[#FC3B02] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="text-8xl mb-6 animate-bounce">💡</div>
              <p className="text-3xl font-bold mb-4">100 players = 1 BTC prize pool</p>
              <div className="text-8xl mb-6 animate-pulse">🏆</div>
              <p className="text-3xl font-bold">1 lucky winner takes all!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Live Round Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <span className="text-3xl">👀</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Live Round
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Don't miss out on the current action!
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-12 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFCF40]/20 to-[#FE850B]/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="grid md:grid-cols-3 gap-12 text-center mb-12">
                <div className="p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-5xl mb-4">🎟️</div>
                  <p className="text-gray-600 mb-3 font-medium">Players</p>
                  <p className="text-4xl font-bold text-gray-900">67/100</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-gray-50 to-red-50 rounded-2xl border border-red-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-5xl mb-4">⌛</div>
                  <p className="text-gray-600 mb-3 font-medium">Time Remaining</p>
                  <p className="text-4xl font-bold text-gray-900">2h 13m</p>
                </div>
                <div className="p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-5xl mb-4">💰</div>
                  <p className="text-gray-600 mb-3 font-medium">Current Pot</p>
                  <p className="text-4xl font-bold text-gray-900">0.67 BTC</p>
                </div>
              </div>
              <div className="text-center space-y-4">
                <button className="bg-gradient-to-r from-[#FFCF40] to-[#FE850B] text-white px-8 py-4 rounded-2xl hover:from-[#FE850B] hover:to-[#FC3B02] transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 mr-4">
                  🧑‍🤝‍🧑 View All Tickets
                </button>
                <button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-8 py-4 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  🔗 View on Citrea Explorer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Powered By Section */}
      <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6 shadow-lg">
              <span className="text-3xl">🧪</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Powered By
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Cutting-edge technology for a secure lottery experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">🟠</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Citrea</h3>
              <p className="text-gray-600 font-medium">zk-rollup for Bitcoin</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">⛓️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Chainlink VRF</h3>
              <p className="text-gray-600 font-medium">Verifiable randomness</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">BitVM + Bridge</h3>
              <p className="text-gray-600 font-medium">Real BTC bridging with SPV proofs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced How Deposits Verified Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <span className="text-3xl">🧠</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-12">
            How Are Deposits Verified?
          </h2>
          <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl border border-white/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FFCF40]/20 to-[#FE850B]/20 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="relative z-10">
              <p className="text-2xl text-gray-700 leading-relaxed font-medium">
                BitLuck uses Citrea's zkBridge to prove your BTC transaction happened — using a light client and SPV proof. Once verified, you're instantly entered into the round.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Ready to Play Section */}
      <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFCF40] to-[#FE850B] rounded-2xl mb-6 shadow-lg">
            <span className="text-3xl">🎮</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-12">
            Ready to Play?
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <ConnectWallet />
            <button className="bg-gradient-to-r from-[#FFCF40] to-[#FE850B] text-white px-10 py-5 rounded-2xl hover:from-[#FE850B] hover:to-[#FC3B02] transition-all duration-300 font-bold text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              🎟️ Join the Current Round
            </button>
            <button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-10 py-5 rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-bold text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              📖 Read the Docs
            </button>
          </div>
          <div className="bg-gradient-to-r from-[#FFCF40] via-[#FE850B] to-[#FC3B02] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <p className="text-2xl font-bold italic">
                "May the sats be ever in your favor."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
