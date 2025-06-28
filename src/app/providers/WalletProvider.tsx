'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import {  citreaTestnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'BitLuck',
  projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect project ID
  chains: [citreaTestnet],
  transports: {
    [citreaTestnet.id]: http(),

  },
});

const queryClient = new QueryClient();

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 