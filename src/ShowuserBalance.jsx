import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect } from "react";

  
export function ShowuserBalance (){
  const wallet = useWallet();
  const {connection} = useConnection();

  async function getBalance(){
    
    if(wallet.publicKey){
      const balance = await connection.getBalance(wallet.publicKey);
      let Totalamout = balance / LAMPORTS_PER_SOL;
      document.getElementById("balance").innerHTML = Totalamout;
      console.log("balance : ",Totalamout);
    }
  }

    return (<div>
      
      <button className=" mt-5 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={getBalance}>Show balance</button>

      <div className="bg-purple-100 shadow-lg rounded-lg p-4 max-w-sm mx-auto">
  <h2 className="text-lg font-semibold text-purple-700">Your Balance</h2>
  <p id="balance" className="text-3xl font-bold text-purple-500 mt-2">SOL</p>
</div>


    </div>
    )
  }
