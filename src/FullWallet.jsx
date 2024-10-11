import React, { useMemo,useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { AirDrop } from './Airdrop';
import { ShowuserBalance } from './ShowuserBalance';
import { SendTokens } from './SendTokens';
import DragonEggGame from './DragonGame';

const FullWallet = ({score,setScore,bet,setBet,cashout,setCashout}) => {

  return (
  <div className='Main2'>
    <DragonEggGame score={score} setScore={setScore} bet={bet} setBet={setBet} cashout={cashout} setCashout={setCashout}/> 

<div className=' flex flex-col space-y-4'>
      <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/VDnQvpyFzMy5QhBaE3WzKup4fib-Qibl"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider> 
        <div>
          <WalletMultiButton />
          <WalletDisconnectButton />
        <AirDrop score={score} setCashout={setCashout} cashout={cashout} bet={bet} setBet={setBet}/>
        <div>
        <SendTokens bet={bet} setBet={setBet}/>
        <ShowuserBalance />
        </div>
      </div>
      </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </div>

    
  </div>
  )
  
 
}

export default FullWallet;