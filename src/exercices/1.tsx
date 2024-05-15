/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import clsx from "clsx";

// 🦁 Supprime ce commentaire et définis correctement les types pour ce composant
type SquareProps = {
  isWinningSquare: boolean;
  value: "X" | "O" | null;
};

const Square = (props: SquareProps) => {
  return (
    <button
      className={clsx("square", {
        "winning-square": props.isWinningSquare,
      })}
    >
      {props.value}
    </button>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Square isWinningSquare={true} value="X" />
      <Square isWinningSquare={false} value="X" />
      <Square isWinningSquare={true} value="O" />
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
