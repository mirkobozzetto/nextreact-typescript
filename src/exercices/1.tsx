/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

type SquareProps = ComponentPropsWithoutRef<"button"> & {
  isWinningSquare?: boolean;
};

const Square = ({ children, isWinningSquare, ...props }: SquareProps) => {
  return (
    <button
      className={clsx("square", {
        "winning-square": isWinningSquare,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

type SquareValue = "X" | "O" | null;

type BoardProps = {
  squares: SquareValue[];
  winningLine?: number[];
  onClick?: (index: number) => void;
};

const Board = ({ squares, onClick, winningLine }: BoardProps) => {
  return (
    <div className="game-board">
      {squares.map((square, i) => (
        <Square
          key={`square-${i}`}
          onClick={() => onClick?.(i)}
          isWinningSquare={winningLine.includes(i)}
        >
          {square}
        </Square>
      ))}
    </div>
  );
};

const getDefaultSquares = (): SquareValue[] => [
  null,
  null,
  null,
  null,
  null,
  null,
  "O",
  null,
  "X",
];

const Game = () => {
  const squares = getDefaultSquares();
  return (
    <div className="game">
      <Board squares={squares} />
    </div>
  );
};

export default function App() {
  return (
    <div>
      <h2>TicTacToe</h2>
      <Game />
    </div>
  );
}
