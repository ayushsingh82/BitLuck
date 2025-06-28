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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">🏆 Past Winners</h1>
          <p className="text-xl text-gray-600">Celebrating our lucky BitLuck champions!</p>
        </div>

        {/* Recent Winner Celebration */}
        {winners.find(w => w.isRecent) && (
          <div className="bg-gradient-to-r from-[#FFCF40] via-[#FE850B] to-[#FC3B02] rounded-lg p-8 mb-8 text-center text-white shadow-xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2">Latest Winner!</h2>
            <p className="text-xl mb-4">
              Round #{winners.find(w => w.isRecent)?.roundNumber} • {winners.find(w => w.isRecent)?.prizeAmount} cBTC
            </p>
            <p className="text-lg opacity-90">
              Congratulations to {shortenAddress(winners.find(w => w.isRecent)?.walletAddress || '')}!
            </p>
          </div>
        )}

        {/* Winners Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-black">All Winners</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Round #</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Winner</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Prize</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Transaction</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {winners.map((winner) => (
                  <tr key={winner.id} className={`hover:bg-gray-50 transition-colors ${winner.isRecent ? 'bg-yellow-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="font-bold text-black">#{winner.roundNumber}</span>
                        {winner.isRecent && (
                          <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#FFCF40] to-[#FE850B] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          🏆
                        </div>
                        <span className="font-mono text-sm text-gray-900">
                          {shortenAddress(winner.walletAddress)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-green-600 text-lg">
                        {winner.prizeAmount} cBTC
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(winner.timestamp)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openExplorer(winner.txHash)}
                        className="font-mono text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        {shortenTxHash(winner.txHash)}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openExplorer(winner.txHash)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          🔍 View
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors">
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

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-black mb-2">
              {winners.length}
            </div>
            <div className="text-gray-600">Total Winners</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {winners.reduce((sum, winner) => sum + winner.prizeAmount, 0).toFixed(2)} cBTC
            </div>
            <div className="text-gray-600">Total Prizes Paid</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {(winners.reduce((sum, winner) => sum + winner.prizeAmount, 0) / winners.length).toFixed(3)} cBTC
            </div>
            <div className="text-gray-600">Average Prize</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {winners[0]?.roundNumber || 0}
            </div>
            <div className="text-gray-600">Latest Round</div>
          </div>
        </div>

        {/* Winner Spotlight */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-black mb-6">🌟 Winner Spotlight</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-[#FFCF40] to-[#FE850B] bg-opacity-10 p-6 rounded-lg border border-[#FFCF40] border-opacity-30">
              <h3 className="text-xl font-bold text-black mb-3">Biggest Winner</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Round #{Math.max(...winners.map(w => w.roundNumber))}</p>
                <p className="font-bold text-lg">{Math.max(...winners.map(w => w.prizeAmount))} cBTC</p>
                <p className="text-sm text-gray-600">
                  {shortenAddress(winners.find(w => w.prizeAmount === Math.max(...winners.map(w => w.prizeAmount)))?.walletAddress || '')}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#FE850B] to-[#FC3B02] bg-opacity-10 p-6 rounded-lg border border-[#FE850B] border-opacity-30">
              <h3 className="text-xl font-bold text-black mb-3">Most Recent</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Round #{winners[0]?.roundNumber}</p>
                <p className="font-bold text-lg">{winners[0]?.prizeAmount} cBTC</p>
                <p className="text-sm text-gray-600">
                  {shortenAddress(winners[0]?.walletAddress || '')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-[#FFCF40] to-[#FE850B] rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Winners?</h2>
            <p className="text-xl mb-6">Your name could be next on this list!</p>
            <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              🎯 Join Current Round
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 