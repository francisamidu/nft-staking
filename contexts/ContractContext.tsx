import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Contract } from "ethers";

const ContractContext = createContext(null);
export const ContractProvider = ({
  children,
}: PropsWithChildren<Partial<ReactNode>>) => {
  const [NFTStaker, setNFTStaker] = useState<Contract>(null);
  const [NFTCollection, setNFTCollection] = useState<Contract>(null);

  return (
    <ContractContext.Provider
      value={{
        NFTStaker,
        setNFTStaker,
        setNFTCollection,
        NFTCollection,
      }}
    >
      {children}{" "}
    </ContractContext.Provider>
  );
};
export const useContract = () => useContext(ContractContext);
