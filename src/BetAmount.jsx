import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { DollarSign } from "lucide-react";
import betSound from "./assets/sound.wav";
import { useState } from "react";
import CustomToast from "./CustomToast";

const WALLET_TO = "3AkwTKtHUu589xecTUJhAyXy7h1NbU9X8FCpeko9dTgp";

const BetAmount = ({ bet, setBet }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [error, setError] = useState(false);

  const playAudio = () => {
    const audio = new Audio(betSound);
    audio.play();
  };

  async function handleBet() {
    if (!wallet.publicKey) {
      setError(true);
      return;
    }
    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(WALLET_TO),
          lamports: 1 * LAMPORTS_PER_SOL,
        })
      );
      await wallet.sendTransaction(transaction, connection);
      setBet(true);
      playAudio();
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="flex flex-col w-full items-center my-1">
      {!bet && (
        <button
          onClick={handleBet}
          className="flex gap-2 items-center justify-center w-56 mt-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3 font-bold rounded-2xl transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-400 shadow-md text-base"
          disabled={bet}
          aria-label="Place your bet"
        >
          <DollarSign size={20} className="text-white" />
          Place Bet (1 SOL)
        </button>
      )}
      {error && (
        <div className="mt-2">
          <CustomToast
            message="Connect your wallet first."
            color="bg-red-600/95"
            onClose={() => setError(false)}
          />
        </div>
      )}
    </div>
  );
};

export default BetAmount;