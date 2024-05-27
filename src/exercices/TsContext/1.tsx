import { createContext, PropsWithChildren, useContext, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type UserContextValue = {
  user: User | null;
  disconnect: () => void;
  // 🦁 Ajoute la fonction connect
  connect: (user: User) => void;
  // 🦁 Ajoute la fonction update
  update: (user: User) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  // 🦁 Ajoute la fonction connect
  const connect = (user: User) => {
    setUser(user);
  };

  const disconnect = () => {
    setUser(null);
  };

  // 🦁 Ajoute la fonction update
  const update = (user: User) => {
    setUser(user);
  };

  const values: UserContextValue = {
    user,
    disconnect,
    connect,
    update,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
