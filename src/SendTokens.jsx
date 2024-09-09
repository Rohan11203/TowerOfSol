import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import { useState } from "react";


export function SendTokens({bet,setBet}) {
    const wallet = useWallet();
    const {connection} = useConnection();
    // const [bet,setBet] = useState(false);

    async function sendTokens() {
        let to = "22AwpSN8fEJ9qoErd5Y7e1A2KHmJrWBC1bUdea5xfTMX";
        let amount = 1;
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
    }
    return <div>
        {/* <input onChange={handleAmount} id="amount" type="text" placeholder="Amount" /> */}
        <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded transition duration-150 active:bg-green-500" onClick={sendTokens}>BET</button>
    </div>
}