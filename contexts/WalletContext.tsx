import { ethers } from "ethers";
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

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
  // const providerOptions = {
  //   binancechainwallet: {
  //     display: {
  //       name: "Binance",
  //     },
  //     package: true,
  //   },
  //   walletconnect: {
  //     package: WalletConnectProvider, // required
  //     options: {
  //       infuraId: process.env.NEXT_PUBLIC_INFURA_ID, // required
  //     },
  //   },
  //   coinbasewallet: {
  //     package: CoinbaseWalletSDK, // Required
  //     options: {
  //       appName: "NFTStakes", // Required
  //       infuraId: process.env.NEXT_PUBLIC_INFURA_ID, // Required
  //       rpc: "", // Optional if `infuraId` is provided; otherwise it's required
  //       chainId: 4, // Optional. It defaults to 1 if not provided
  //       darkMode: true, // Optional. Use dark theme, defaults to false
  //     },
  //   },
  // };

  // const web3Modal = new Web3Modal({
  //   network: "rinkeby",
  //   theme: {
  //     border: "rgb(19,21,18)",
  //     background: "rgb(19,21,18)",
  //     main: "#fff",
  //     secondary: "#fff",
  //     hover: "rgb(47,215,191)",
  //   },
  //   cacheProvider: true,
  //   providerOptions,
  // });
  const connectWallet = async () => {
    try {
      const connection = await new Web3Modal().connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const signerAddress = await signer.getAddress();
      let accountBalance = Math.floor(
        Number(
          ethers.utils.formatEther(await provider.getBalance(signerAddress))
        )
      ).toString();
      setAccount(signerAddress);
      setBalance(accountBalance);

      const NFTCollection = new ethers.Contract(
        NFT_COLLECTION_ADDRESS,
        NFT_COLLECTION_ABI,
        signer
      );
      const NFTStaker = new ethers.Contract(
        NFT_STAKE_ADDRESS,
        NFT_STAKE_ABI,
        signer
      );
      setNFTCollection(NFTCollection);
      setNFTStaker(NFTStaker);

      setActive(true);
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
