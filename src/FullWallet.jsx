import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import AirDrop from "./CashOut";
import ShowuserBalance from "./ShowuserBalance";
import BetAmount from "./BetAmount";
import DragonEggGame from "./DragonGame";
import { Trophy } from "lucide-react";

const FullWallet = ({ score, setScore, bet, setBet, cashout, setCashout }) => {
  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="w-full max-w-7xl">
        <div className="relative flex flex-col items-center w-full py-8 mb-3 select-none">
          <span className="mb-2">
            <Trophy
              size={40}
              className="text-yellow-400 drop-shadow-[0_2px_12px_rgba(255,215,75,0.33)] animate-bounce"
            />
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r  from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_3px_24px_rgba(168,85,247,0.25)] uppercase font-sans">
            Tower<span className="mx-2">of</span>
            <span className="inline-block font-black text-green-400 animate-pulse">
              SOL
            </span>
          </h1>
          <div className="mt-2 text-lg text-gray-400 font-medium tracking-widest italic">
            Dragon Egg Challenge
          </div>
        </div>

        {/* Main container - responsive grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full   p-4 sm:p-6 shadow-2xl ">
          {/* Wallet Controls Section */}
          <div className="bg-gray-800 rounded-xl  p-4 sm:p-6  shadow-lg border border-gray-700 order-2 xl:order-1 ">
            <ConnectionProvider
              endpoint={
                "https://solana-devnet.g.alchemy.com/v2/VDnQvpyFzMy5QhBaE3WzKup4fib-Qibl"
              }
            >
              <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  {/* Wallet Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4  p-4 bg-gray-900 rounded-lg shadow-lg border border-gray-600 mb-6">
                    <WalletMultiButton className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-5 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-500/50 text-sm sm:text-base" />

                    <WalletDisconnectButton className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-3 px-5 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-500/50 text-sm sm:text-base" />
                  </div>

                  {/* Game Controls */}
                  <div className="bg-gray-900 rounded-lg p-2 shadow-inner text-white border border-gray-600">
                    <div className="">
                      <AirDrop
                        score={score}
                        setCashout={setCashout}
                        cashout={cashout}
                        bet={bet}
                        setBet={setBet}
                      />
                      <BetAmount bet={bet} setBet={setBet} />
                      <ShowuserBalance />
                    </div>
                  </div>
                </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
          </div>

          {/* Game Section */}
          <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700 order-1 xl:order-2">
            <DragonEggGame
              score={score}
              setScore={setScore}
              bet={bet}
              setBet={setBet}
              cashout={cashout}
              setCashout={setCashout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullWallet;
