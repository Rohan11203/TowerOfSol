import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect } from "react";

export function ShowuserBalance() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function getBalance() {
    if (wallet.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      let Totalamout = balance / LAMPORTS_PER_SOL;
      document.getElementById("balance").innerHTML = Totalamout;
      console.log("balance : ", Totalamout);
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md mx-auto text-center">
  <button
    className="mt-4 focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-bold rounded-xl text-lg px-6 py-3 mb-4 shadow-lg transition-transform transform hover:scale-105 active:scale-95"
    onClick={getBalance}
  >
    Show Balance
  </button>

  <div className="bg-gray-800 shadow-lg rounded-xl p-6 max-w-sm mx-auto mt-4 border-2 border-green-500">
    <h2 className="text-xl font-bold text-green-400 tracking-wider uppercase">Your Balance</h2>
    <p id="balance" className="text-4xl font-extrabold text-white mt-3">
      SOL
    </p>
  </div>
</div>

  );
}
