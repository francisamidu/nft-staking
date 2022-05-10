import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { uid, formatCurrency } from "../helpers";
import { IStat } from "../interfaces";

const StatsContext = createContext<{
  stats: IStat[];
  setStats: Dispatch<SetStateAction<IStat[]>>;
}>({
  stats: [],
  setStats: () => {},
});

export const StatsProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const [stats, setStats] = useState([
    {
      id: uid(),
      name: "Claimed rewards",
      value: 0,
    },
    {
      id: uid(),
      name: "Unclaimed rewards",
      value: 0,
    },
    {
      id: uid(),
      name: "Total Value",
      value: 0,
    },
    {
      id: uid(),
      name: "Total NFTs",
      value: 0,
    },
    {
      id: uid(),
      name: "Staked",
      value: 0,
    },
    {
      id: uid(),
      name: "Checked",
      value: 0,
    },
    {
      id: uid(),
      name: "Unchecked",
      value: 0,
    },
  ]);

  return (
    <StatsContext.Provider value={{ stats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => useContext(StatsContext);
