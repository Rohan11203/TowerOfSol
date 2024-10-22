import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import betSound from "./assets/299223-BET_BUTTON_UP_-Cute_Interface_Melodic_Click_Confirmation_Tune_05_002194_.wav";
import Toast from "./Alert/Alert";
import { useState } from "react";
import ToastError from "./Alert/Error";

export function BetAmount({ bet, setBet }) {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [showToastError, setShowToastError] = useState(false);

  const playAudio = () => {
    const audio = new Audio(betSound);
    audio.play();
  };

  async function BetAmount() {
    try {
      let to = "22AwpSN8fEJ9qoErd5Y7e1A2KHmJrWBC1bUdea5xfTMX";
      let amount = 0;
      console.log("Amount :", amount);
      console.log("To : ", to);
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      // setBet(true);
      await wallet.sendTransaction(transaction, connection);

      // console.log("Sent " + amount + " SOL to " + to);
      setBet(true);
    } catch (error) {
        setShowToastError(true);
    //   alert("Please connect your wallet first");
    }
  }
  return (
    <div className="text-center">
  {/* <input onChange={handleAmount} id="amount" type="text" placeholder="Amount" /> */}
  {!bet && (
    <button 
      onClick={() => {
        playAudio();
        BetAmount();
      }} 
      className="w-60 mt-5 mb-4 bg-yellow-400 text-white px-6 py-3 font-bold rounded-xl transition duration-200 ease-in-out transform hover:bg-yellow-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-lg"
      disabled={bet} // Disable the button when the bet is placed
      aria-label="Place your bet"
    >
      Bet
    </button>
  )}
  {showToastError && (
    <ToastError message={`Connect Your Wallet First`} onClose={() => setShowToastError(false)} />
  )}
</div>

  );
}
