import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { PiggyBank } from "lucide-react";
import { useState } from "react";
import CustomToast from "./CustomToast";

const AirDrop = ({ score, setCashout, bet, setBet }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  async function sendAirdropToUser() {
    if (!wallet.publicKey) {
      setShowError(true);
      return;
    }
    try {
      await connection.requestAirdrop(
        wallet.publicKey,
        score * LAMPORTS_PER_SOL
      );

      setShowSuccess(true);
      setCashout(true);
      setBet(false);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setShowError(true);
    }
  }

  return (
    <div className="flex flex-col items-center my-1">
      {bet && (
        <button
          className="flex items-center gap-2 mt-2 bg-red-500 hover:bg-red-400 text-white px-6 py-3 font-bold rounded-2xl transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300 shadow-lg text-base"
          onClick={sendAirdropToUser}
        >
          <PiggyBank size={22} className="text-yellow-300" />
          Cash Out ({score} SOL)
        </button>
      )}
      {showSuccess && (
        <div className="mt-2">
          <CustomToast
            message="Cashout successful! Check your wallet."
            color="bg-green-600/95"
            onClose={() => setShowSuccess(false)}
          />
        </div>
      )}
      {showError && (
        <div className="mt-2">
          <CustomToast
            message="Connect your wallet first."
            color="bg-red-600/95"
            onClose={() => setShowError(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AirDrop;
