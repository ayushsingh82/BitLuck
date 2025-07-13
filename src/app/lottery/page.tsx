'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface Participant {
  id: string;
  wallet: string;
  depositAmount: number;
  timestamp: string;
  status: 'pending' | 'confirmed';
}

interface RoundInfo {
  roundId: number;
  requiredDeposit: number;
  totalDeposits: number;
  timeLeft: string;
  ticketsNeeded: number;
  totalParticipants: number;
  maxParticipants: number;
}

export default function LotteryPage() {
  const [roundInfo, setRoundInfo] = useState<RoundInfo>({
    roundId: 42,
    requiredDeposit: 0.01,
    totalDeposits: 0.67,
    timeLeft: '2h 13m',
    ticketsNeeded: 33,
    totalParticipants: 67,
    maxParticipants: 100
  });

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      wallet: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      depositAmount: 0.01,
      timestamp: '2024-01-15T14:30:00Z',
      status: 'confirmed'
    },
    {
      id: '2',
      wallet: '0x8ba1f109551bD432803012645Hac136c772c3c7b',
      depositAmount: 0.01,
      timestamp: '2024-01-15T14:25:00Z',
      status: 'confirmed'
    },
    {
      id: '3',
      wallet: '0x1234567890123456789012345678901234567890',
      depositAmount: 0.01,
      timestamp: '2024-01-15T14:20:00Z',
      status: 'pending'
    }
  ]);

  const [statusFeed, setStatusFeed] = useState([
    { id: 1, message: 'New deposit confirmed: 0.01 cBTC', timestamp: '2 min ago', type: 'deposit' },
    { id: 2, message: 'SPV proof verified for tx: abc123...', timestamp: '5 min ago', type: 'proof' },
    { id: 3, message: 'New participant joined round #42', timestamp: '8 min ago', type: 'join' },
    { id: 4, message: 'VRF request submitted for winner selection', timestamp: '15 min ago', type: 'vrf' }
  ]);

  const [vrfStatus, setVrfStatus] = useState<'idle' | 'requesting' | 'completed'>('idle');
  const [depositAddress] = useState('0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6');
  const [copied, setCopied] = useState(false);
  const [depositing, setDepositing] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleDeposit = async () => {
    setDepositing(true);
    try {
      // Check if MetaMask is installed
      if (typeof window !== 'undefined' && window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          // Send transaction
          const transactionParameters = {
            to: depositAddress,
            from: accounts[0],
            value: '0x2386f26fc10000', // 0.01 ETH in hex (assuming 1 ETH = 1 cBTC for demo)
          };

          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });

          console.log('Transaction sent:', txHash);
          alert('Deposit transaction sent! Check your wallet for confirmation.');
        }
      } else {
        alert('Please install MetaMask or another wallet to make deposits.');
      }
    } catch (error) {
      console.error('Deposit failed:', error);
      alert('Deposit failed. Please try again.');
    } finally {
      setDepositing(false);
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with animated background */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFCF40] via-[#FE850B] to-[#FC3B02] opacity-10 rounded-3xl blur-3xl"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#FFCF40] to-[#FE850B] rounded-full mb-6 shadow-lg">
              <span className="text-3xl">🎟️</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#FFCF40] to-[#FE850B] bg-clip-text text-transparent">
              Live Lottery Round
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Round #{roundInfo.roundId} • Join the excitement!
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Round Info & Deposit */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Round Info with enhanced design */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFCF40]/20 to-[#FE850B]/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FFCF40] to-[#FE850B] rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Current Round Info</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
                      <span className="text-gray-600 font-medium">Round ID:</span>
                      <span className="font-bold text-gray-900 text-lg">#{roundInfo.roundId}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
                      <span className="text-gray-600 font-medium">Required Deposit:</span>
                      <span className="font-bold text-gray-900 text-lg">{roundInfo.requiredDeposit} cBTC</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <span className="text-gray-600 font-medium">Total Deposits:</span>
                      <span className="font-bold text-green-600 text-lg">{roundInfo.totalDeposits} cBTC</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                      <span className="text-gray-600 font-medium">Time Left:</span>
                      <span className="font-bold text-orange-600 text-lg">{roundInfo.timeLeft}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
                      <span className="text-gray-600 font-medium">Tickets Needed:</span>
                      <span className="font-bold text-gray-900 text-lg">{roundInfo.ticketsNeeded}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <span className="text-gray-600 font-medium">Participants:</span>
                      <span className="font-bold text-blue-600 text-lg">{roundInfo.totalParticipants}/{roundInfo.maxParticipants}</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Progress Bar */}
                <div className="mt-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span className="font-medium">Progress</span>
                    <span className="font-bold">{Math.round((roundInfo.totalParticipants / roundInfo.maxParticipants) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#FFCF40] to-[#FE850B] h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${(roundInfo.totalParticipants / roundInfo.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced BTC Deposit Address */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-y-12 -translate-x-12"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">⛓️</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">cBTC Deposit Address</h2>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl mb-6 inline-block border border-blue-100">
                  <QRCodeSVG value={depositAddress} size={200} />
                </div>
                
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <code className="bg-gray-100 px-6 py-3 rounded-xl text-sm font-mono border border-gray-200">
                    {shortenAddress(depositAddress)}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                
                <p className="text-gray-600 mb-8 font-medium">
                  Send exactly {roundInfo.requiredDeposit} cBTC to this address to enter the lottery
                </p>
                
                {/* Enhanced Deposit Button */}
                <div className="space-y-4">
                  <button
                    onClick={handleDeposit}
                    disabled={depositing}
                    className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      depositing
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#FFCF40] to-[#FE850B] text-white hover:from-[#FE850B] hover:to-[#FC3B02] shadow-xl hover:shadow-2xl'
                    }`}
                  >
                    {depositing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="text-2xl mr-3">💰</span>
                        Deposit 0.01 cBTC
                      </div>
                    )}
                  </button>
                  <p className="text-sm text-gray-500 font-medium">
                    Click to send {roundInfo.requiredDeposit} cBTC directly from your wallet
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Participants List */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🧾</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Participants ({participants.length})</h2>
              </div>
              
              {participants.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👥</div>
                  <p className="text-gray-500 text-lg font-medium">No participants yet. Be the first to join!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${participant.status === 'confirmed' ? 'bg-green-500 shadow-lg' : 'bg-yellow-500 shadow-lg'}`}></div>
                        <span className="font-mono text-sm font-medium text-gray-700">{shortenAddress(participant.wallet)}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-900">{participant.depositAmount} cBTC</div>
                        <div className="text-xs text-gray-500 font-medium">
                          {new Date(participant.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Status Feed & VRF */}
          <div className="space-y-8">
            {/* Enhanced Status Feed */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Status Feed</h2>
              </div>
              
              <div className="space-y-4">
                {statusFeed.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300">
                    <div className={`w-3 h-3 rounded-full mt-2 shadow-lg ${
                      item.type === 'deposit' ? 'bg-green-500' :
                      item.type === 'proof' ? 'bg-blue-500' :
                      item.type === 'join' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.message}</p>
                      <p className="text-xs text-gray-500 font-medium">{item.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced VRF Status */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🔀</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">VRF Status</h2>
              </div>
              
              <div className="text-center">
                <div className={`text-6xl mb-6 ${
                  vrfStatus === 'idle' ? 'text-gray-400' :
                  vrfStatus === 'requesting' ? 'text-orange-500 animate-pulse' : 'text-green-500'
                }`}>
                  {vrfStatus === 'idle' ? '⏸️' : vrfStatus === 'requesting' ? '🔄' : '✅'}
                </div>
                <p className="font-bold text-lg mb-3 text-gray-800">
                  {vrfStatus === 'idle' ? 'Waiting for round completion' :
                   vrfStatus === 'requesting' ? 'Requesting random number' : 'Winner selected!'}
                </p>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  {vrfStatus === 'idle' ? 'VRF will be triggered when round fills or time expires' :
                   vrfStatus === 'requesting' ? 'Chainlink VRF is generating the random number' : 'Random number received and winner determined'}
                </p>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Quick Actions</h2>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-[#FFCF40] to-[#FE850B] text-white py-4 px-6 rounded-xl hover:from-[#FE850B] hover:to-[#FC3B02] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  🎯 Join Round
                </button>
                <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 py-4 px-6 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  📊 View on Explorer
                </button>
                <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 py-4 px-6 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  📱 Share Round
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 