import React, { useState } from "react";
import Square from "./Square";

const Board: React.FC = () => {
  const [squares, setSquares] = useState<(null | "X" | "O")[]>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState(true);

  // Function to calculate the winner
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

  // Handle click events on the squares
  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = [...squares];
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every((square) => square !== null); // Check if all squares are filled

  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull
    ? "Tie!"
    : `Next Player: ${isXNext ? "X" : "O"}`;

  // Reset the game
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
      {(winner || isBoardFull) && (
        <button className="reset-button" onClick={resetGame}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default Board;
