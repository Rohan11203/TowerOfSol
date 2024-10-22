import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import Toast from "./Alert/Alert";

export function AirDrop({ score, setCashout, cashout, bet, setBet }) {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [showToastCashout, setShowToastCashout] = useState(false);


  async function sendAirdropToUser() {
    try {
      await connection.requestAirdrop(wallet.publicKey, score * LAMPORTS_PER_SOL);
      setShowToastCashout(true);
      setCashout(true);
      setBet(false);
      console.log("Airdrop sent successfully",score);
      setTimeout(() => {
        setShowToastCashout(false);
      }, 3000);

    } catch (error) {
      alert("Please connect your wallet first");
    }
  }

  return (
    <div className="text-center">
      {bet && (
        <button
          className="mt-4 mb-6 bg-red-500 text-white px-6 py-4 font-bold rounded-xl transition duration-200 ease-in-out transform hover:bg-red-600 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300 shadow-lg"
          onClick={sendAirdropToUser}
        >
          CashOut
        </button>
      )}

      {/* Toast Notification */}
      {showToastCashout && (
        <Toast message={`Cashout Successful`} onClose={() => setShowToastCashout(false)} />
      )}
    </div>
  );
}
