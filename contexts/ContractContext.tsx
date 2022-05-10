import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Signer as JsonRpcSigner } from "ethers/src.ts/ethers";
import { Contract } from "ethers";

type ContractValues = {
  NFTStaker: Contract;
  NFTCollection: Contract;
  setNFTCollection: Dispatch<SetStateAction<Contract>>;
  setNFTStaker: Dispatch<SetStateAction<Contract>>;
};
const ContractContext = createContext<ContractValues>(null);
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
