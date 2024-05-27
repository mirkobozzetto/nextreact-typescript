import { createContext, PropsWithChildren, useContext, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type UserContextValue = {
  user: User | null;
  disconnect: () => void;
  connect: (user: User) => void;
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

  const update = (user: Partial<User>) => {
    setUser((curr) => {
      if (!curr) {
        return curr;
      }
      return {
        ...curr,
        ...user,
      };
    });
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
