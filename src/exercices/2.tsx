import { useRef, useState } from "react";
import { Board } from "../lib/tictactoe/Board";
// import { UserNameForm } from "../lib/tictactoe/UserNamesForm";
import {
  calculateNextValue,
  calculateStatus,
  getDefaultSquares,
} from "../lib/tictactoe/helpers";

type GameInfoProps = {
  status: string;
  userNames: UserNames;
};

type UserNames = {
  X: string | null;
  O: string | null;
};

type UserNameFormProps = {
  onUserNamesSubmitted: (userNames: NonNullableUserNames) => void;
};

type DeepNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type NonNullableUserNames = DeepNonNullable<UserNames>;

const GameInfo = ({ status, userNames }: GameInfoProps) => {
  return (
    <div className="game-info">
      <div className="flex gap-3 center">
        <span>
          <b>X</b>:{userNames.X}
        </span>
        <span>VS</span>
        <span>
          <b>O</b>:{userNames.O}
        </span>
      </div>
      <div>{status}</div>
      <ol>{/* TODO */}</ol>
    </div>
  );
};

const Game = () => {
  // 🦁 Utilise `useState` pour gérer l'état des cases (attention à l'utiliser correctement) et résout les erreurs TypeScript
  const [squares, setQuares] = useState(getDefaultSquares());
  const [userNames, setUserNames] = useState<UserNames>({ X: null, O: null });

  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(squares, nextValue);

  if (!userNames.X || !userNames.O) {
    return (
      <UserNameForm
        onUserNamesSubmitted={(userNames) => {
          setUserNames(userNames);
        }}
      />
    );
  }

  return (
    <div className="game">
      <GameInfo status={status} userNames={userNames} />{" "}
      <Board squares={squares} />
    </div>
  );
};

const UserNameForm = ({ onUserNamesSubmitted }: UserNameFormProps) => {
  const userXRef = useRef<HTMLInputElement>(null);
  const userORef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userX = userXRef.current?.value;
    const userO = userORef.current?.value;

    if (!userX || !userO) {
      return;
    }

    if (userX === userO) {
      alert("Usernames must be different");
      return;
    }

    onUserNamesSubmitted({ X: userX, O: userO });
  };

  return (
    <form onSubmit={onSubmit} className="vertical-stack">
      <label htmlFor="user1">User X</label>
      <input id="user1" ref={userXRef} required minLength={2} />
      <label htmlFor="user2">User O</label>
      <input id="user2" ref={userORef} required minLength={2} />
      <button type="submit">Submit</button>
    </form>
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
