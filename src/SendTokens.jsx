import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useState } from "react";
import betSound from "./assets/299223-BET_BUTTON_UP_-Cute_Interface_Melodic_Click_Confirmation_Tune_05_002194_.wav"
import { Send } from "lucide-react";
export function SendTokens({bet,setBet}) {
    const wallet = useWallet();
    const {connection} = useConnection();
    // const [bet,setBet] = useState(false);

    const playAudio = () => {
        const audio = new Audio(betSound);
        audio.play();
      };

    async function sendTokens() {
        try {
            let to = "22AwpSN8fEJ9qoErd5Y7e1A2KHmJrWBC1bUdea5xfTMX";
        let amount = 0;
        console.log("Amount :",amount);
        console.log("To : ", to);
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));
    
        // setBet(true);
        await wallet.sendTransaction(transaction, connection);
        
        alert("Sent " + amount + " SOL to " + to);
        setBet(true);
        } catch (error) {
            alert("Please connect your wallet first")
        }
    }
    return <div>
        {/* <input onChange={handleAmount} id="amount" type="text" placeholder="Amount" /> */}
        {!bet && <div className="p-4 bg-green-600 rounded-lg shadow-lg">
    <h3 className="text-lg font-bold mb-2">Send Tokens</h3>
    <button onClick={()=>{
        playAudio();
        sendTokens();
      
    }} className="w-full bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
      
      Bet
    </button>
  </div>}
    </div>
}