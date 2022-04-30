import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import { IAppData } from "../interfaces";

const AppContext = createContext<IAppData>({
  name: "",
  year: 0,
});

export const AppProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const [name, setName] = useState("NFTStakes");
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <AppContext.Provider
      value={{
        name,
        year,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
