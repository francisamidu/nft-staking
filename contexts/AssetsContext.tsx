import { ethers } from "ethers";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  ReactNode,
} from "react";
import { IExtAsset } from "../interfaces";
import { formatDateRelative, uid } from "../helpers";

const AssetContext = createContext<{
  assets: IExtAsset[];
}>({
  assets: [],
});

export const AssetProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const [assets, setAssets] = useState<IExtAsset[]>([
    {
      createdAt: formatDateRelative(new Date("2021-1-1")),
      title: "Some cool NFT",
      image: "/Crypto-Staking-Platform-for-2022.webp",
      owner: "0x00",
      tokenId: uid(),
      userAvatar: "/avatar1.png",
      username: "Some cool guy",
      price: ethers.utils.formatEther("200000000000000000"),
    },
    {
      createdAt: formatDateRelative(new Date("2021-2-2")),
      title: "Some cool NFT",
      image: "/Crypto-Staking-Platform-for-2022.webp",
      owner: "0x00",
      tokenId: uid(),
      userAvatar: "/avatar1.png",
      username: "Some cool guy",
      price: ethers.utils.formatEther("200000000000000000"),
    },
    {
      createdAt: formatDateRelative(new Date("2021-3-3")),
      title: "Some cool NFT",
      image: "/Crypto-Staking-Platform-for-2022.webp",
      owner: "0x00",
      tokenId: uid(),
      userAvatar: "/avatar1.png",
      username: "Some cool guy",
      price: ethers.utils.formatEther("200000000000000000"),
    },
    {
      createdAt: formatDateRelative(new Date("2021-4-4")),
      title: "Some cool NFT",
      image: "/Crypto-Staking-Platform-for-2022.webp",
      owner: "0x00",
      tokenId: uid(),
      userAvatar: "/avatar1.png",
      username: "Some cool guy",
      price: ethers.utils.formatEther("200000000000000000"),
    },
    {
      createdAt: formatDateRelative(new Date("2021-4-5")),
      title: "Some cool NFT",
      image: "/Crypto-Staking-Platform-for-2022.webp",
      owner: "0x00",
      tokenId: uid(),
      userAvatar: "/avatar1.png",
      username: "Some cool guy",
      price: ethers.utils.formatEther("200000000000000000"),
    },
    {
      createdAt: formatDateRelative(new Date("2021-4-6")),
      title: "Some cool NFT",
      image: "/Crypto-Staking-Platform-for-2022.webp",
      owner: "0x00",
      tokenId: uid(),
      userAvatar: "/avatar1.png",
      username: "Some cool guy",
      price: ethers.utils.formatEther("200000000000000000"),
    },
    {
      createdAt: formatDateRelative(new Date("2021-1-7")),
      title: "Some cool NFT",
      image: "/Crypto-Staking-Platform-for-2022.webp",
      owner: "0x00",
      tokenId: uid(),
      userAvatar: "/avatar1.png",
      username: "Some cool guy",
      price: ethers.utils.formatEther("200000000000000000"),
    },
    {
      createdAt: formatDateRelative(new Date("2021-8-8")),
      title: "Some cool NFT",
      image: "/Crypto-Staking-Platform-for-2022.webp",
      owner: "0x00",
      tokenId: uid(),
      userAvatar: "/avatar1.png",
      username: "Some cool guy",
      price: ethers.utils.formatEther("200000000000000000"),
    },
    {
      createdAt: formatDateRelative(new Date("2021-9-9")),
      title: "Some cool NFT",
      image: "/Crypto-Staking-Platform-for-2022.webp",
      owner: "0x00",
      tokenId: uid(),
      userAvatar: "/avatar1.png",
      username: "Some cool guy",
      price: ethers.utils.formatEther("200000000000000000"),
    },
    {
      createdAt: formatDateRelative(new Date("2021-10-10")),
      title: "Some cool NFT",
      image: "/Crypto-Staking-Platform-for-2022.webp",
      owner: "0x00",
      tokenId: uid(),
      userAvatar: "/avatar1.png",
      username: "Some cool guy",
      price: ethers.utils.formatEther("200000000000000000"),
    },
  ]);

  return (
    <AssetContext.Provider value={{ assets }}>{children}</AssetContext.Provider>
  );
};

export const useAsset = () => useContext(AssetContext);
