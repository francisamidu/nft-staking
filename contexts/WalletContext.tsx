import { ethers } from "ethers";
import { JsonRpcSigner } from "ethers/node_modules/@ethersproject/providers";
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import Web3Modal from "web3modal";
import {
  NFT_COLLECTION_ABI,
  NFT_COLLECTION_ADDRESS,
  NFT_STAKE_ABI,
  NFT_STAKE_ADDRESS,
} from "../config";
import { useContract } from ".";

type Wallet = {
  account: string;
  active: boolean;
  balance: string;
  connectWallet: () => any;
};
const WalletContext = createContext<Wallet>({
  account: "",
  active: false,
  balance: "",
  connectWallet: () => {},
});

export const WalletProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const [balance, setBalance] = useState("");
  const [account, setAccount] = useState("");
  const [active, setActive] = useState(false);
  const { setNFTCollection, setNFTStaker } = useContract();
  const connectWallet = async () => {
    try {
      const modal = new Web3Modal();
      const connection = await modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const signerAddress = await signer.getAddress();
      const accountBalance = (
        await provider.getBalance(signerAddress)
      ).toString();

      const NFTCollection = new ethers.Contract(
        NFT_COLLECTION_ADDRESS,
        NFT_COLLECTION_ABI,
        provider
      );
      const NFTStaker = new ethers.Contract(
        NFT_STAKE_ADDRESS,
        NFT_STAKE_ABI,
        provider
      );
      setNFTCollection(NFTCollection);
      setNFTStaker(NFTStaker);

      setAccount(signerAddress);
      setActive(true);
      setBalance(accountBalance);
    } catch (error) {
      console.log(error);
      toast.error("Failed to connect to wallet");
    }
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        active,
        balance,
        connectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
