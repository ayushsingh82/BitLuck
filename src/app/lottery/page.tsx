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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">🎟️ Live Lottery Round</h1>
          <p className="text-xl text-gray-600">Round #{roundInfo.roundId} • Join the excitement!</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Round Info & Deposit */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Round Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gradient-to-b from-[#FFCF40] to-[#FC3B02]">
              <h2 className="text-2xl font-bold text-black mb-6">🎁 Current Round Info</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Round ID:</span>
                    <span className="font-bold text-black">#{roundInfo.roundId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Required Deposit:</span>
                    <span className="font-bold text-black">{roundInfo.requiredDeposit} cBTC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Deposits:</span>
                    <span className="font-bold text-green-600">{roundInfo.totalDeposits} cBTC</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Time Left:</span>
                    <span className="font-bold text-orange-600">{roundInfo.timeLeft}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tickets Needed:</span>
                    <span className="font-bold text-black">{roundInfo.ticketsNeeded}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Participants:</span>
                    <span className="font-bold text-black">{roundInfo.totalParticipants}/{roundInfo.maxParticipants}</span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((roundInfo.totalParticipants / roundInfo.maxParticipants) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-[#FFCF40] to-[#FE850B] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(roundInfo.totalParticipants / roundInfo.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* BTC Deposit Address */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-black mb-6">⛓️ cBTC Deposit Address</h2>
              <div className="text-center">
                <div className="bg-gray-50 p-4 rounded-lg mb-4 inline-block">
                  <QRCodeSVG value={depositAddress} size={200} />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <code className="bg-gray-100 px-4 py-2 rounded text-sm font-mono">
                    {shortenAddress(depositAddress)}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Send exactly {roundInfo.requiredDeposit} cBTC to this address to enter the lottery
                </p>
              </div>
            </div>

            {/* Participants List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-black mb-6">🧾 Participants ({participants.length})</h2>
              <div className="space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${participant.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      <span className="font-mono text-sm">{shortenAddress(participant.wallet)}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{participant.depositAmount} cBTC</div>
                      <div className="text-xs text-gray-500">
                        {new Date(participant.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Status Feed & VRF */}
          <div className="space-y-6">
            {/* Status Feed */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-black mb-6">🔄 Status Feed</h2>
              <div className="space-y-4">
                {statusFeed.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      item.type === 'deposit' ? 'bg-green-500' :
                      item.type === 'proof' ? 'bg-blue-500' :
                      item.type === 'join' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.message}</p>
                      <p className="text-xs text-gray-500">{item.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VRF Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-black mb-6">🔀 VRF Status</h2>
              <div className="text-center">
                <div className={`text-4xl mb-4 ${
                  vrfStatus === 'idle' ? 'text-gray-400' :
                  vrfStatus === 'requesting' ? 'text-orange-500' : 'text-green-500'
                }`}>
                  {vrfStatus === 'idle' ? '⏸️' : vrfStatus === 'requesting' ? '🔄' : '✅'}
                </div>
                <p className="font-semibold mb-2">
                  {vrfStatus === 'idle' ? 'Waiting for round completion' :
                   vrfStatus === 'requesting' ? 'Requesting random number' : 'Winner selected!'}
                </p>
                <p className="text-sm text-gray-600">
                  {vrfStatus === 'idle' ? 'VRF will be triggered when round fills or time expires' :
                   vrfStatus === 'requesting' ? 'Chainlink VRF is generating the random number' : 'Random number received and winner determined'}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-black mb-6">⚡ Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-[#FFCF40] to-[#FE850B] text-black py-3 rounded-lg hover:from-[#FE850B] hover:to-[#FC3B02] transition-all duration-300 font-semibold">
                  🎯 Join Round
                </button>
                <button className="w-full bg-gray-200 text-black py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                  📊 View on Explorer
                </button>
                <button className="w-full bg-gray-200 text-black py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
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