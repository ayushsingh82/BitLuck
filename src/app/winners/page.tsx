'use client';

import { useState } from 'react';

interface Winner {
  id: string;
  roundNumber: number;
  walletAddress: string;
  prizeAmount: number;
  timestamp: string;
  txHash: string;
  isRecent?: boolean;
}

export default function WinnersPage() {
  const [winners, setWinners] = useState<Winner[]>([
    {
      id: '1',
      roundNumber: 41,
      walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      prizeAmount: 1.0,
      timestamp: '2024-01-15T10:30:00Z',
      txHash: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
      isRecent: true
    },
    {
      id: '2',
      roundNumber: 40,
      walletAddress: '0x8ba1f109551bD432803012645Hac136c772c3c7b',
      prizeAmount: 0.85,
      timestamp: '2024-01-14T15:45:00Z',
      txHash: '0xdef456ghi789jkl012mno345pqr678stu901vwx234yzabc123'
    },
    {
      id: '3',
      roundNumber: 39,
      walletAddress: '0x1234567890123456789012345678901234567890',
      prizeAmount: 0.72,
      timestamp: '2024-01-13T20:15:00Z',
      txHash: '0xghi789jkl012mno345pqr678stu901vwx234yzabc123def456'
    },
    {
      id: '4',
      roundNumber: 38,
      walletAddress: '0x9876543210987654321098765432109876543210',
      prizeAmount: 0.95,
      timestamp: '2024-01-12T12:00:00Z',
      txHash: '0xjkl012mno345pqr678stu901vwx234yzabc123def456ghi789'
    },
    {
      id: '5',
      roundNumber: 37,
      walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      prizeAmount: 0.68,
      timestamp: '2024-01-11T08:30:00Z',
      txHash: '0xmno345pqr678stu901vwx234yzabc123def456ghi789jkl012'
    },
    {
      id: '6',
      roundNumber: 36,
      walletAddress: '0xfedcba0987654321fedcba0987654321fedcba09',
      prizeAmount: 0.89,
      timestamp: '2024-01-10T16:20:00Z',
      txHash: '0xpqr678stu901vwx234yzabc123def456ghi789jkl012mno345'
    }
  ]);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const shortenTxHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openExplorer = (txHash: string) => {
    window.open(`https://explorer.citrea.xyz/tx/${txHash}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with animated background */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-10 rounded-3xl blur-3xl"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
              <span className="text-3xl">🏆</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Past Winners
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Celebrating our lucky BitLuck champions!
            </p>
          </div>
        </div>

        {/* Recent Winner Celebration with enhanced design */}
        {winners.find(w => w.isRecent) && (
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 mb-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="text-8xl mb-6 animate-bounce">🎉</div>
              <h2 className="text-4xl font-bold mb-4">Latest Winner!</h2>
              <p className="text-2xl mb-6 font-medium">
                Round #{winners.find(w => w.isRecent)?.roundNumber} • {winners.find(w => w.isRecent)?.prizeAmount} cBTC
              </p>
              <p className="text-xl opacity-90 font-medium">
                Congratulations to {shortenAddress(winners.find(w => w.isRecent)?.walletAddress || '')}!
              </p>
            </div>
          </div>
        )}

        {/* Enhanced Winners Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 mb-12">
          <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-orange-50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">All Winners</h2>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-orange-100">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700">Round #</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700">Winner</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700">Prize</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700">Date</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700">Transaction</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {winners.map((winner) => (
                  <tr key={winner.id} className={`hover:bg-gradient-to-r hover:from-gray-50 hover:to-orange-50 transition-all duration-300 ${winner.isRecent ? 'bg-yellow-50/50' : ''}`}>
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <span className="font-bold text-gray-900 text-lg">#{winner.roundNumber}</span>
                        {winner.isRecent && (
                          <span className="ml-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                          🏆
                        </div>
                        <span className="font-mono text-sm text-gray-900 font-medium">
                          {shortenAddress(winner.walletAddress)}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-bold text-green-600 text-xl">
                        {winner.prizeAmount} cBTC
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-600 font-medium">
                      {formatDate(winner.timestamp)}
                    </td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => openExplorer(winner.txHash)}
                        className="font-mono text-sm text-blue-600 hover:text-blue-800 underline font-medium"
                      >
                        {shortenTxHash(winner.txHash)}
                      </button>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => openExplorer(winner.txHash)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          🔍 View
                        </button>
                        <button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                          📋 Copy
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👥</span>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {winners.length}
            </div>
            <div className="text-gray-600 font-medium">Total Winners</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {winners.reduce((sum, winner) => sum + winner.prizeAmount, 0).toFixed(2)} cBTC
            </div>
            <div className="text-gray-600 font-medium">Total Prizes Paid</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {(winners.reduce((sum, winner) => sum + winner.prizeAmount, 0) / winners.length).toFixed(3)} cBTC
            </div>
            <div className="text-gray-600 font-medium">Average Prize</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {winners[0]?.roundNumber || 0}
            </div>
            <div className="text-gray-600 font-medium">Latest Round</div>
          </div>
        </div>

        {/* Enhanced Winner Spotlight */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 mb-12">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">🌟</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Winner Spotlight</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-200 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Biggest Winner</h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 font-medium">Round #{Math.max(...winners.map(w => w.roundNumber))}</p>
                <p className="font-bold text-2xl text-green-600">{Math.max(...winners.map(w => w.prizeAmount))} cBTC</p>
                <p className="text-sm text-gray-600 font-medium">
                  {shortenAddress(winners.find(w => w.prizeAmount === Math.max(...winners.map(w => w.prizeAmount)))?.walletAddress || '')}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Most Recent</h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 font-medium">Round #{winners[0]?.roundNumber}</p>
                <p className="font-bold text-2xl text-green-600">{winners[0]?.prizeAmount} cBTC</p>
                <p className="text-sm text-gray-600 font-medium">
                  {shortenAddress(winners[0]?.walletAddress || '')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Join the Winners?</h2>
              <p className="text-2xl mb-8 font-medium">Your name could be next on this list!</p>
              <button className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                🎯 Join Current Round
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 