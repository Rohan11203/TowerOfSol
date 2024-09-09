import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function AirDrop({score,cashout,setCashout}){

  const wallet = useWallet();
  const { connection } = useConnection();
 
  async function sendAirdropToUser (){
    console.log(score)
    // let amount = document.getElementById("amount").value;
   await connection.requestAirdrop(wallet.publicKey,score * LAMPORTS_PER_SOL)
   alert("Cashout Succesfull" + score);
   setCashout(true);
  }

  return ( 
  <div>
    {/* <input id="amount" type="text" placeholder="Amount"/> */}
    <button className="mt-5 bg-green-500 text-white px-4 py-2 rounded transition duration-150 active:bg-green-500" onClick={sendAirdropToUser}>CashOut</button>
  </div>
  )
}