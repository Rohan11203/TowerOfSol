import { Trophy } from "lucide-react";
import CustomToast from "./CustomToast";
import { useState, useEffect } from "react";

const ROWS = 8;
const COLS = 4;

const DragonEggGame = ({
  score,
  setScore,
  bet,
  setBet,
  cashout,
  setCashout,
}) => {
  const [board, setBoard] = useState([]);
  const [activeRow, setActiveRow] = useState(ROWS - 1);
  const [gameOver, setGameOver] = useState(false);
  const [showPlaceBet, setShowPlaceBet] = useState(false);

  useEffect(() => {
    initializeBoard();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (bet) {
      initializeBoard();
    }
    // eslint-disable-next-line
  }, [bet]);

  useEffect(() => {
    if (cashout) {
      initializeBoard();
      setCashout(false);
    }
    // eslint-disable-next-line
  }, [cashout]);

  const initializeBoard = () => {
    const newBoard = Array(ROWS)
      .fill(null)
      .map(() =>
        Array(COLS)
          .fill(null)
          .map(() => ({
            type: Math.random() < 1 ? "egg" : "bomb",
            revealed: false,
          }))
      );
    setBoard(newBoard);
    setActiveRow(ROWS - 1);
    setGameOver(false);
    setScore(0);
  };

  const handleCellClick = (row, col) => {
    if (!bet) {
      setShowPlaceBet(true);
      return;
    }
    if (row !== activeRow || gameOver) return;
    const newBoard = board.map((r, rIdx) =>
      rIdx === row
        ? r.map((cell, cIdx) => (cIdx === col ? { ...cell, revealed: true } : cell))
        : r
    );
    setBoard(newBoard);

    if (newBoard[row][col].type === "bomb") {
      setGameOver(true);
      setBet(false);
    } else {
      setScore(score + 1);
      if (row > 0) setActiveRow(row - 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Score */}
      <div className="flex items-center gap-2 text-3xl font-bold mb-2 text-yellow-300">
        <Trophy className="mr-1" /> {score}
      </div>
      {/* Game Board */}
      <div className="flex flex-col gap-2 mb-3">
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2 justify-center">
            {row.map((cell, colIdx) => (
              <button
                key={colIdx}
                className={[
                  "rounded-xl w-16 h-16 md:w-20 md:h-20 text-2xl font-bold flex items-center justify-center select-none border-2 transition-all duration-200",
                  cell.revealed
                    ? cell.type === "egg"
                      ? "bg-yellow-300 border-yellow-400 text-amber-900 shadow-[0_0_16px_2px_rgba(251,191,36,0.35)] scale-105"
                      : "bg-red-500 border-red-400 text-white shadow-[0_0_16px_1px_rgba(239,68,68,0.23)] scale-90 animate-pulse"
                    : rowIdx === activeRow
                    ? "bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-600 border-cyan-400/20 hover:shadow-xl hover:scale-105 cursor-pointer"
                    : "bg-gray-700/70 border-gray-600/80 opacity-60 cursor-not-allowed"
                ].join(" ")}
                style={{
                  filter: cell.revealed && cell.type !== "egg" ? "drop-shadow(0 0 24px red)" : undefined
                }}
                onClick={() => handleCellClick(rowIdx, colIdx)}
                disabled={rowIdx !== activeRow || gameOver || !!cell.revealed}
              >
                {cell.revealed ? (cell.type === "egg" ? "🥚" : "💣") : ""}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Overlay: Game Over */}
      {gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg">
          <div className="bg-gray-900 rounded-xl border border-yellow-400/60 py-8 px-6 md:px-12 shadow-2xl flex flex-col items-center animate-fade-in">
            <Trophy className="text-yellow-300 mb-2" size={40} />
            <h2 className="text-2xl font-extrabold text-yellow-200 mb-2">Game Over!</h2>
            <p className="mb-5 text-lg text-gray-300">
              You scored <span className="font-bold text-yellow-300">{score}</span> points.
            </p>
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-lg text-lg shadow-lg focus:outline-none transition-transform active:scale-95"
              onClick={initializeBoard}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      {/* Toast if not placed bet */}
      {showPlaceBet && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <CustomToast message="Please place a bet before starting the game." onClose={() => setShowPlaceBet(false)} color="bg-red-600/95" />
        </div>
      )}
    </div>
  );
};

export default DragonEggGame;