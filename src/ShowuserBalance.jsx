import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { Banknote } from "lucide-react";
import CustomToast from "./CustomToast";

const ShowUserBalance = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);

  async function getBalance() {
    if (!wallet.publicKey) {
      setToastOpen(true);
      return;
    }
    const balance = await connection.getBalance(wallet.publicKey);
    setBalance(balance / LAMPORTS_PER_SOL);
  }

  return (
    <div className="bg-gradient-to-r from-zinc-900 via-gray-900 to-zinc-800 rounded-xl  text-center p-5 shadow-lg w-full flex flex-col items-center">
      <button
        className="flex items-center justify-center gap-2 text-white bg-black hover:bg-gray-800 focus:ring-2 focus:ring-purple-400 font-bold rounded-lg text-lg px-5 py-2 shadow transition hover:scale-105 active:scale-95"
        onClick={getBalance}
      >
        <Banknote size={22} className="text-green-400" />
        Show Balance
      </button>
      <div className="mt-4 text-3xl font-extrabold text-white min-h-[2.25rem]">
        {balance === null ? "SOL" : `${balance.toFixed(3)} SOL`}
      </div>
      {toastOpen && (
        <div className="mt-2">
          <CustomToast message="Connect your wallet first." onClose={() => setToastOpen(false)} color="bg-red-600/90" />
        </div>
      )}
    </div>
  );
}

export default ShowUserBalance;