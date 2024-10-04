import React, { useMemo } from 'react';
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
// import { SignMessage } from './SignMessage';
import { SendTokens } from './SendTokens';
import { Buffer } from 'buffer';

// function App() {

  
//   return (
    
    // <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/VDnQvpyFzMy5QhBaE3WzKup4fib-Qibl"}>
    //   <WalletProvider wallets={[]} autoConnect>
    //     <WalletModalProvider> 
    //     <div>
    //       <WalletMultiButton />
    //       <WalletDisconnectButton />
    //     <AirDrop />
    //     <ShowuserBalance />
    //     <SignMessage />
    //     <SendTokens />
    //   </div>
    //   </WalletModalProvider>
    //   </WalletProvider>
    // </ConnectionProvider>
    

//   )
// }

// export default App

import { useState } from 'react';
import DragonEggGame from './DragonGame';

function App() {
  const [score,setScore] = useState(0);
  const [bet,setBet] = useState(false);
  const [cashout,setCashout] = useState(false);
  return (
    <div className="App flex pt-6  space-x-8 bg-blue-900 min-h-screen">
      
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
  
    <div className='flex-1'>
    <DragonEggGame score={score} setScore={setScore} bet={bet} setBet={setBet} cashout={cashout}/> 
    </div>
    </div>
  );
}
export default App