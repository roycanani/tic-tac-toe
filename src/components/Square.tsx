import React from "react";

interface SquareProps {
  value: "X" | "O" | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value && <img src={`/images/${value.toLowerCase()}.png`} alt={value} />}
    </button>
  );
};

export default Square;
