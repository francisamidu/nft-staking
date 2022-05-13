import { ethers } from "ethers";
import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  ReactNode,
} from "react";
import { IExtAsset } from "../interfaces";

const AssetContext = createContext<{
  assets: IExtAsset[];
}>({
  assets: [],
});

export const AssetProvider = ({ children }: PropsWithChildren<ReactNode>) => {
  const [assets, setAssets] = useState<IExtAsset[]>([]);

  return (
    <AssetContext.Provider value={{ assets }}>{children}</AssetContext.Provider>
  );
};

export const useAsset = () => useContext(AssetContext);
