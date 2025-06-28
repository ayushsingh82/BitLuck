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
      wallet: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      totalEntries: 15,
      totalWins: 2,
      totalWinnings: 1.85,
      rank: 1
    },
    {
      id: '2',
      wallet: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      totalEntries: 12,
      totalWins: 1,
      totalWinnings: 0.95,
      rank: 2
    },
    {
      id: '3',
      wallet: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      totalEntries: 10,
      totalWins: 1,
      totalWinnings: 0.72,
      rank: 3
    },
    {
      id: '4',
      wallet: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      totalEntries: 8,
      totalWins: 0,
      totalWinnings: 0,
      rank: 4
    },
    {
      id: '5',
      wallet: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
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
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">📊 BitLuck Statistics</h1>
          <p className="text-xl text-gray-600">Transparent analytics and community insights</p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {totalStats.totalBTC} BTC
            </div>
            <div className="text-gray-600">Total BTC Deposited</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {totalStats.totalPlayers.toLocaleString()}
            </div>
            <div className="text-gray-600">Total Players</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {totalStats.totalRounds}
            </div>
            <div className="text-gray-600">Total Rounds</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-2">📈</div>
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {totalStats.avgParticipants}
            </div>
            <div className="text-gray-600">Avg Participants/Round</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-6">🏆 Leaderboard</h2>
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getRankIcon(entry.rank)}</div>
                    <div>
                      <div className="font-semibold text-black">
                        {shortenAddress(entry.wallet)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {entry.totalEntries} entries • {entry.totalWins} wins
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      {entry.totalWinnings} BTC
                    </div>
                    <div className="text-sm text-gray-600">
                      Total winnings
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Rounds Performance */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-6">📈 Recent Rounds</h2>
            <div className="space-y-4">
              {recentRounds.map((round) => (
                <div key={round.roundNumber} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#FFCF40] to-[#FE850B] rounded-full flex items-center justify-center text-white font-bold">
                      #{round.roundNumber}
                    </div>
                    <div>
                      <div className="font-semibold text-black">
                        {round.participants} participants
                      </div>
                      <div className="text-sm text-gray-600">
                        {round.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      {round.prizePool} BTC
                    </div>
                    <div className="text-sm text-gray-600">
                      Prize pool
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Treasury Analytics */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-black mb-6">🏦 Treasury Analytics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {treasuryData.totalDeposits} BTC
              </div>
              <div className="text-gray-600">Total Deposits</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {treasuryData.totalPayouts} BTC
              </div>
              <div className="text-gray-600">Total Payouts</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {treasuryData.feesCollected} BTC
              </div>
              <div className="text-gray-600">Fees Collected ({treasuryData.feePercentage}%)</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {treasuryData.currentBalance} BTC
              </div>
              <div className="text-gray-600">Current Balance</div>
            </div>
          </div>
          
          {/* Fee Structure Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-black mb-2">💰 Fee Structure</h3>
            <p className="text-gray-600">
              BitLuck charges a {treasuryData.feePercentage}% fee on each round to cover operational costs, 
              VRF fees, and Citrea transaction costs. The remaining {100 - treasuryData.feePercentage}% 
              goes directly to the prize pool.
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Participation Trend */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-6">📊 Participation Trend</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📈</div>
                <p>Chart visualization would go here</p>
                <p className="text-sm">Showing participant growth over time</p>
              </div>
            </div>
          </div>

          {/* Prize Pool Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-6">🎁 Prize Pool Distribution</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🥧</div>
                <p>Chart visualization would go here</p>
                <p className="text-sm">Showing prize pool sizes over rounds</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {((leaderboard.reduce((sum, entry) => sum + entry.totalWins, 0) / totalStats.totalRounds) * 100).toFixed(1)}%
            </div>
            <div className="text-gray-600">Win Rate</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {(totalStats.totalBTC / totalStats.totalRounds).toFixed(3)} BTC
            </div>
            <div className="text-gray-600">Average Round Size</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round(totalStats.totalPlayers / totalStats.totalRounds)}
            </div>
            <div className="text-gray-600">Unique Players per Round</div>
          </div>
        </div>

        {/* Transparency Note */}
        <div className="mt-8 bg-gradient-to-r from-[#FFCF40] to-[#FE850B] bg-opacity-10 p-6 rounded-lg border border-[#FFCF40] border-opacity-30">
          <h3 className="text-xl font-bold text-black mb-3">🔍 Transparency Commitment</h3>
          <p className="text-gray-700">
            All BitLuck statistics are publicly verifiable on the Citrea blockchain. 
            Smart contracts ensure fair play, and all transactions are transparent and immutable.
          </p>
        </div>
      </div>
    </div>
  );
} 