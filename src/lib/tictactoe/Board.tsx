/* eslint-disable react-hooks/rules-of-hooks */
import { SquareValue } from "./helpers";
import { Square } from "./Square";

type BoardProps = {
  squares: SquareValue[];
  winningSquares?: number[];
  onClick?: (index: number) => void;
};

export const Board = ({ squares, onClick, winningSquares }: BoardProps) => {
  console.log("Board rendered", { squares, onClick, winningSquares });

  return (
    <div className="game-board">
      {squares.map((square, index) => (
        <Square
          onClick={() => onClick?.(index)}
          isWinningSquare={winningSquares?.includes(index)}
          key={index}
        >
          {square}
        </Square>
      ))}
    </div>
  );
};
