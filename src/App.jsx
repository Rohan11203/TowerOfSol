import React, { useMemo } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useState } from 'react';
import FullWallet from './FullWallet';

function App() {
  const [score,setScore] = useState(0);
  const [bet,setBet] = useState(false);
  const [cashout,setCashout] = useState(false);
  return (
    
    <div className='p-4 w-full bg-gradient-to-r from-indigo-800 to-purple-600 border border-purple-600 rounded-lg'>
  
  {/* <DragonEggGame score={score} setScore={setScore} bet={bet} setBet={setBet} cashout={cashout}/>  */}
  <FullWallet score={score} setScore={setScore} bet={bet} setBet={setBet} cashout={cashout} setCashout={setCashout}/>
</div>

    
  );
}
export default App