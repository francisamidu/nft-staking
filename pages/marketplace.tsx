import React from "react";
import { NextComponentType } from "next";
import { Asset, Layout } from "../components";
import { useAsset, useContract, useWallet } from "../contexts";
import { toast } from "react-toastify";
import { ethers } from "ethers";

const Marketplace = () => {
  const { assets } = useAsset();
  const { account } = useWallet();
  const { NFTCollection } = useContract();
  const buyAsset = async () => {
    if (!account && !NFTCollection) {
      toast.error("Please connect your wallet first");
      return;
    }
    try {
      const request = await NFTCollection.mint(
        account,
        "http://gateway.ipfs.io/somehash",
        Date.now(),
        "/avatar1.png",
        "Might guy",
        {
          value: ethers.utils.parseEther("0.3"),
        }
      );
      await request.wait();
      toast.success("Yay NFT bought");
    } catch (error) {
      toast.error("Whoopsie!!!!");
      console.log(error);
    }
  };
  return (
    <main className="sm:max-w-screen-xl sm:mx-auto mt-28 mb-1">
      <h1 className="text-2xl font-bold text-center sm:text-left">
        Marketplace Items
      </h1>
      <section className="marketplace-items min-h-screen pt-5 mt-3 grid w-full">
        {assets.map((asset, index) => (
          <Asset
            asset={asset}
            handlePurchase={buyAsset}
            index={index}
            length={assets.length}
            key={asset.tokenId}
            stake={false}
          />
        ))}
      </section>
    </main>
  );
};

Marketplace.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Marketplace;
