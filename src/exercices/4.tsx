import {
  createContext,
  FormEvent,
  PropsWithChildren,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";
import { Board } from "../lib/tictactoe/Board";
import { GameInfo } from "../lib/tictactoe/GameInfo";
import {
  calculateNextValue,
  calculateStatus,
  getDefaultSquares,
  NonNullableUserNames,
  SquareValue,
  UserNames,
} from "../lib/tictactoe/helpers";

type UserNameFormProps = {
  onUserNamesSubmitted: (userNames: NonNullableUserNames) => void;
};
// aaaaaaaaaaaaaaaaaaah
type UseUserNamesFormReturnType = {
  userXRef: RefObject<HTMLInputElement>;
  userORef: RefObject<HTMLInputElement>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

// 🦁 Supprime les props et utilise notre context pour récupérer les valeurs
const useUserNamesForm = (
  onUserNamesSubmitted: (userNames: NonNullableUserNames) => void
): UseUserNamesFormReturnType => {
  const userXRef = useRef<HTMLInputElement>(null);
  const userORef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userX = userXRef.current?.value;
    const userO = userORef.current?.value;
    if (!userX || !userO) {
      return;
    }

    onUserNamesSubmitted({ X: userX, O: userO });
  };

  return {
    userXRef,
    userORef,
    onSubmit,
  };
};

const UserNameForm = ({ onUserNamesSubmitted }: UserNameFormProps) => {
  const { userXRef, userORef, onSubmit } =
    useUserNamesForm(onUserNamesSubmitted);

  return (
    <form onSubmit={onSubmit} className="vertical-stack">
      <h3>Put players usernames</h3>
      <label htmlFor="user1">User X</label>
      <input id="user1" ref={userXRef} required minLength={2} />
      <label htmlFor="user2">User O</label>
      <input id="user2" ref={userORef} required minLength={2} />
      <button type="submit">Submit</button>
    </form>
  );
};

type GameContextOutput = {
  squares: SquareValue[];
  xUserName: string | null;
  oUserName: string | null;
  status: string;
  setUserNames: (userNames: UserNames) => void;
};

// 🦁 Utilise le type ci-dessus pour créer un context qui est par défaut à `null`

const GameContext = createContext<GameContextOutput | null>(null);

// 🦁 Refactor GameProvider pour qu'il devienne `GameProvider`
// Il doit prendre en paramètre un children
// Il doit retourner le contexte créé plus haut avec le children
const GameProvider = ({ children }: PropsWithChildren) => {
  const [squares] = useState<SquareValue[]>(() => getDefaultSquares());
  const [userNames, setUserNames] = useState<UserNames>({
    X: "Player X",
    O: "Player O",
  });

  const nextValue = calculateNextValue(squares);

  const xUserName = userNames.X;
  const oUserName = userNames.O;

  const status = calculateStatus(
    squares,
    `${userNames[nextValue]}'s turn (${nextValue})`
  );

  const value = {
    squares,
    xUserName,
    oUserName,
    status,
    setUserNames,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGame = (): GameContextOutput => {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

const Game = () => {
  const { squares, xUserName, oUserName, status, setUserNames } = useGame();

  if (!xUserName || !oUserName) {
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
      <GameInfo
        status={status}
        userNames={{
          X: xUserName,
          O: oUserName,
        }}
      />
      <Board squares={squares} />
    </div>
  );
};

export default function App() {
  return (
    <div>
      <h2>TicTacToe</h2>
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}
