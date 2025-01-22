import React, { useState } from "react";
import Square from "./Square";

const Board: React.FC = () => {
  const [squares, setSquares] = useState<(null | "X" | "O")[]>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: (null | "X" | "O")[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = [...squares];
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${isXNext ? "X" : "O"}`;

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="wrapper">
        <div className="board">
          {squares.map((square, index) => (
            <Square
              key={index}
              value={square}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
      {winner && (
        <button className="reset-button" onClick={resetGame}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default Board;
