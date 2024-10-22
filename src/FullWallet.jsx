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
import { AirDrop } from "./CashOut";
import { ShowuserBalance } from "./ShowuserBalance";
import { BetAmount } from "./BetAmount";
import DragonEggGame from "./DragonGame";

const FullWallet = ({ score, setScore, bet, setBet, cashout, setCashout }) => {
  return (
  <div className="flex flex-col items-center h-full w-full max-w-5xl p-2 mx-auto">
    {/* Game Title */}
    <h1 className="text-4xl font-bold text-white mb-4 text-center">
      Tower-of-SOL
    </h1>
    <div className="grid grid-cols-2 gap-4 justify-center items-center h-full w-full max-w-5xl bg-gradient-to-r from-indigo-900 to-purple-800 rounded-2xl p-2 mx-auto shadow-2xl border-4">
      
      {/* Left side: Wallet functionality */}
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
        <ConnectionProvider
          endpoint={
            "https://solana-devnet.g.alchemy.com/v2/VDnQvpyFzMy5QhBaE3WzKup4fib-Qibl"
          }
        >
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className="flex space-x-4 p-4 bg-gray-950 rounded-lg shadow-lg">
                {/* Wallet Buttons with Game Theme */}
                <WalletMultiButton className="bg-violet-70 hover:bg-violet-800 text-white font-bold py-3 px-5 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-violet-500" />

                <WalletDisconnectButton className="bg-rose-700 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400" />
              </div>

              {/* Additional Functionalities: AirDrop, Bet, Show Balance */}
              <div className="bg-gray-800 rounded-lg p-4 mt-4 shadow-inner text-white">
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
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>

      {/* Right side: DragonEggGame */}
      <div className="bg-violet-800 border-violet-800 rounded-lg p-6 shadow-lg flex justify-center items-center">
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
  );
};

export default FullWallet;
