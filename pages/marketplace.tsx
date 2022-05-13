import React, { useEffect, useState } from "react";
import { NextComponentType } from "next";
import { Button, Layout } from "../components";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useContract } from "../contexts";

const Marketplace = () => {
  const { NFTCollection } = useContract();

  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState("");
  const [cost, setCost] = useState(0);
  const [supply, setSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);

  const mint = async (event) => {
    event.preventDefault();
    if (!account && !NFTCollection) {
      toast.error("Please connect your wallet first");
      return;
    }
    try {
      const request = await NFTCollection.mint(account, amount, {
        value: ethers.utils.parseEther((amount * cost).toString()),
      });
      await request.wait();
      toast.success(`You now own ${amount} NFTs`);
      getData();
    } catch (error) {
      toast.error("Whoopsie!!!!");
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      let cost = await NFTCollection.cost();
      cost = ethers.utils.formatEther(cost.toString());
      setCost(Number(cost));

      let totalSupply = await NFTCollection.totalSupply();
      totalSupply = ethers.utils.formatEther(totalSupply.toString()).toString();
      totalSupply = ethers.utils.parseEther(totalSupply.toString()).toString();
      setSupply(Number(totalSupply));

      let maxSupply = await NFTCollection.maxSupply();
      maxSupply = ethers.utils.formatEther(maxSupply.toString()).toString();
      setMaxSupply(Math.floor(maxSupply));
    } catch (error) {
      console.log(error);
      toast.error("Data couldnt be retrieved");
    }
  };

  useEffect(() => {
    NFTCollection && getData();
  }, [NFTCollection]);
  return (
    <main className="sm:max-w-screen-xl sm:mx-auto mb-1 min-h-[90vh] flex flex-row items-center justify-center">
      <form
        className="rounded-md py-4 px-6 bg-[#1e232b] flex flex-col mt-2 min-w-[410px]"
        onSubmit={mint}
      >
        <h1 className="font-bold text-xl text-center mb-5">Mint Portal</h1>
        <div className="flex flex-col mb-7 relative">
          <label className="active:text-slate-800 text-[#777]">
            Wallet Address
          </label>
          <input
            type="text"
            className="mt-2 rounded-xl w-full py-2 px-4 border-[1.5px] border-gray-200 placeholder:text-[#dbdbdb] outline-none text-slate-800 focus-within:border-slate-800 transition-color duration-200 ease-in-out"
            onChange={(e) => setAccount(e.target.value)}
            placeholder="0x0000000"
            value={account}
          />
        </div>
        <div className="flex flex-col mb-7 relative">
          <label className="active:text-slate-800 text-[#777]">
            Mint Amount
          </label>
          <input
            type="number"
            className="mt-2 rounded-xl w-full py-2 px-4 border-[1.5px] border-gray-200 placeholder:text-[#dbdbdb] outline-none text-slate-800 focus-within:border-slate-800 transition-color duration-200 ease-in-out"
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="e.g 15"
            value={amount || ""}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="w-1/2 border-r-[1px] border-[#ffffff9d] text-center px-3">
            <span className="block text-[#777]">Supply</span>
            <span className="font-bold">
              {supply}/{maxSupply}
            </span>
          </div>
          <div className="w-1/2 border-l-[1px] border-[#ffffff9d] text-center px-3">
            <span className="block text-[#777]">Cost</span>
            <span className="font-bold">{cost} Eth</span>
          </div>
        </div>
        <Button
          amount={amount}
          cost={cost}
          text="Buy"
          className="btn-variant w-full"
          type="submit"
        />
      </form>
    </main>
  );
};

Marketplace.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Marketplace;
