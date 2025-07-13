'use client';

import { useState } from 'react';

interface LeaderboardEntry {
  id: string;
  wallet: string;
  totalEntries: number;
  totalWins: number;
  totalWinnings: number;
  rank: number;
}

interface RoundStats {
  roundNumber: number;
  participants: number;
  prizePool: number;
  date: string;
}

interface TreasuryData {
  totalDeposits: number;
  totalPayouts: number;
  feesCollected: number;
  currentBalance: number;
  feePercentage: number;
}

export default function StatsPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      wallet: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      totalEntries: 15,
      totalWins: 2,
      totalWinnings: 1.85,
      rank: 1
    },
    {
      id: '2',
      wallet: '0x8ba1f109551bD432803012645Hac136c772c3c7b',
      totalEntries: 12,
      totalWins: 1,
      totalWinnings: 0.95,
      rank: 2
    },
    {
      id: '3',
      wallet: '0x1234567890123456789012345678901234567890',
      totalEntries: 10,
      totalWins: 1,
      totalWinnings: 0.72,
      rank: 3
    },
    {
      id: '4',
      wallet: '0x9876543210987654321098765432109876543210',
      totalEntries: 8,
      totalWins: 0,
      totalWinnings: 0,
      rank: 4
    },
    {
      id: '5',
      wallet: '0xabcdef1234567890abcdef1234567890abcdef12',
      totalEntries: 6,
      totalWins: 0,
      totalWinnings: 0,
      rank: 5
    }
  ]);

  const [recentRounds, setRecentRounds] = useState<RoundStats[]>([
    { roundNumber: 41, participants: 100, prizePool: 1.0, date: '2024-01-15' },
    { roundNumber: 40, participants: 85, prizePool: 0.85, date: '2024-01-14' },
    { roundNumber: 39, participants: 72, prizePool: 0.72, date: '2024-01-13' },
    { roundNumber: 38, participants: 95, prizePool: 0.95, date: '2024-01-12' },
    { roundNumber: 37, participants: 68, prizePool: 0.68, date: '2024-01-11' }
  ]);

  const [treasuryData, setTreasuryData] = useState<TreasuryData>({
    totalDeposits: 5.09,
    totalPayouts: 4.09,
    feesCollected: 0.1,
    currentBalance: 0.9,
    feePercentage: 2
  });

  const [totalStats] = useState({
    totalBTC: 5.09,
    totalPlayers: 1250,
    totalRounds: 41,
    avgParticipants: 82.3
  });

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with animated background */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-10 rounded-3xl blur-3xl"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <span className="text-3xl">📊</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              BitLuck Statistics
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Transparent analytics and community insights
            </p>
          </div>
        </div>

        {/* Enhanced Main Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {totalStats.totalBTC} cBTC
            </div>
            <div className="text-gray-600 font-medium">Total cBTC Deposited</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👥</span>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {totalStats.totalPlayers.toLocaleString()}
            </div>
            <div className="text-gray-600 font-medium">Total Players</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {totalStats.totalRounds}
            </div>
            <div className="text-gray-600 font-medium">Total Rounds</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📈</span>
            </div>
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {totalStats.avgParticipants}
            </div>
            <div className="text-gray-600 font-medium">Avg Participants/Round</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Enhanced Leaderboard */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Leaderboard</h2>
            </div>
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{getRankIcon(entry.rank)}</div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">
                        {shortenAddress(entry.wallet)}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {entry.totalEntries} entries • {entry.totalWins} wins
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 text-xl">
                      {entry.totalWinnings} cBTC
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Total winnings
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Recent Rounds Performance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">📈</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Recent Rounds</h2>
            </div>
            <div className="space-y-4">
              {recentRounds.map((round) => (
                <div key={round.roundNumber} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      #{round.roundNumber}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">
                        {round.participants} participants
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {round.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 text-xl">
                      {round.prizePool} cBTC
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Prize pool
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Treasury Analytics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 mb-12">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">🏦</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Treasury Analytics</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📥</span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {treasuryData.totalDeposits} cBTC
              </div>
              <div className="text-gray-600 font-medium">Total Deposits</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📤</span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {treasuryData.totalPayouts} cBTC
              </div>
              <div className="text-gray-600 font-medium">Total Payouts</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💸</span>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {treasuryData.feesCollected} cBTC
              </div>
              <div className="text-gray-600 font-medium">Fees Collected ({treasuryData.feePercentage}%)</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {treasuryData.currentBalance} cBTC
              </div>
              <div className="text-gray-600 font-medium">Current Balance</div>
            </div>
          </div>
          
          {/* Enhanced Fee Structure Info */}
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💰 Fee Structure</h3>
            <p className="text-gray-700 font-medium leading-relaxed">
              BitLuck charges a {treasuryData.feePercentage}% fee on each round to cover operational costs, 
              VRF fees, and Citrea transaction costs. The remaining {100 - treasuryData.feePercentage}% 
              goes directly to the prize pool.
            </p>
          </div>
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Participation Trend */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">📊</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Participation Trend</h2>
            </div>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl flex items-center justify-center border border-blue-200">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-lg font-medium">Chart visualization would go here</p>
                <p className="text-sm">Showing participant growth over time</p>
              </div>
            </div>
          </div>

          {/* Prize Pool Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Prize Pool Distribution</h2>
            </div>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl flex items-center justify-center border border-green-200">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">🥧</div>
                <p className="text-lg font-medium">Chart visualization would go here</p>
                <p className="text-sm">Showing prize pool sizes over rounds</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Additional Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {((leaderboard.reduce((sum, entry) => sum + entry.totalWins, 0) / totalStats.totalRounds) * 100).toFixed(1)}%
            </div>
            <div className="text-gray-600 font-medium">Win Rate</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {(totalStats.totalBTC / totalStats.totalRounds).toFixed(3)} cBTC
            </div>
            <div className="text-gray-600 font-medium">Average Round Size</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👥</span>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {Math.round(totalStats.totalPlayers / totalStats.totalRounds)}
            </div>
            <div className="text-gray-600 font-medium">Unique Players per Round</div>
          </div>
        </div>

        {/* Enhanced Transparency Note */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-y-12 translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Transparency Commitment</h3>
            </div>
            <p className="text-gray-700 font-medium leading-relaxed text-lg">
              All BitLuck statistics are publicly verifiable on the Citrea blockchain. 
              Smart contracts ensure fair play, and all transactions are transparent and immutable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 