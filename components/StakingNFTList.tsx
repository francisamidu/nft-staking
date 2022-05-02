import React from "react";
import { Button } from ".";

const StakingNFTList = () => {
  const handleClick = () => {};
  return (
    <main className="grid place-content-center place-items-center">
      <div className="flex flex-col items-center w-[300px] mt-24">
        <h1 className="font-bold text-base">No NFTs Available</h1>
        <h2 className="text-center text-gray-500 mt-2">
          You don't seem to have any assets to stake. Buy some to get rewards!!
        </h2>
        <Button
          text="Purchase"
          left={true}
          onClick={handleClick}
          className="btn-variant w-fit h-10"
        />
      </div>
      <div className="min-h-full flex flex-row items-center staking-nft-list"></div>
    </main>
  );
};

export default StakingNFTList;
