import React, { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import PlaceBetError from "./Alert/PlaceBetError";
const ROWS = 8;
const COLS = 4;
const ACTIVE_ROWS = 4;

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
  const [ToastPlaceBet,setToastBetPlace] = useState(false);
  // const [score, setScore] = useState(0);

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    if (bet) {
      initializeBoard();
    }
  }, [bet]);

  useEffect(() => {
    if (cashout) {
      initializeBoard();
      setCashout(false); // Reset cashout after re-initializing
    }
  }, [cashout]);

  const initializeBoard = () => {
    const newBoard = Array(ROWS)
      .fill()
      .map(() =>
        Array(COLS)
          .fill()
          .map(() => ({
            type: Math.random() < 0.6 ? "egg" : "bomb",
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
      setToastBetPlace(true);
      return;
    }

    if (row !== activeRow || gameOver) return;

    const newBoard = [...board];
    newBoard[row][col].revealed = true;
    setBoard(newBoard);

    if (newBoard[row][col].type === "bomb") {
      setGameOver(true);
      setBet(false);
    } else {
      setScore(score + 1);
      if (row > 0) setActiveRow(row - 1);
    }
    console.log(bet);
  };

  return (
    <div className="w-96 flex flex-col items-center bg-gray-800 m-4 p-6 rounded-lg">
      <div className="mb-6 text-3xl font-bold text-yellow-400 flex items-center">
        <Trophy className="mr-2" />
        Score: {score}
      </div>

      <div className="grid gap-2">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((cell, colIndex) => (
              <button
                key={colIndex}
                className={`w-16 h-16 rounded ${
                  cell.revealed
                    ? cell.type === "egg"
                      ? "bg-yellow-300"
                      : "bg-red-500"
                    : rowIndex === activeRow
                    ? "bg-green-500"
                    : "bg-gray-600"
                } ${
                  rowIndex <= activeRow
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                disabled={rowIndex !== activeRow || gameOver}
              >
                {cell.revealed && (cell.type === "egg" ? "🥚" : "💣")}
              </button>
            ))}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-2">Game Over!</h2>
            <p className="mb-4">You scored {score} points.</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={initializeBoard}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      {ToastPlaceBet && (
        <PlaceBetError message="Please place a bet before starting the game." onClose={()=>{setToastBetPlace(false)}} />
      )}
    </div>
  );
};

export default DragonEggGame;
