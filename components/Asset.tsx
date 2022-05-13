import React from "react";
import Image from "next/image";
import { IExtAsset } from "../interfaces";
import Button from "./Button";

const Asset = ({
  asset,
  index,
  length,
  handleCheck,
  handleStake,
  stake,
}: {
  asset: IExtAsset;
  index: number;
  length: number;
  handleCheck?: (id: string | number) => any;
  handleStake?: () => any;
  stake: boolean;
}) => {
  const { checked, image, name, tokenId, owner, staked } = asset;
  return (
    <div
      className={`rounded-md relative flex flex-col 
    sm:col-start-${index === 0 ? 1 : ++index} sm:col-end-${
        index === 0 ? 2 : length - ++index === 0 ? ++index : length
      } min-h-[150px] transition-colors duration-300 shadow py-4 sm:mr-3 mb-3 nft-item border-[1.5px] border-transparent ${
        checked && "border-[#e6a901]"
      }`}
    >
      <div className="flex flex-row justify-center place-center px-4">
        <Image
          src={image}
          loader={({ src }) => src}
          width="310"
          height="300"
          layout="intrinsic"
          className="rounded-md"
        />
      </div>
      <div className="px-4 sm:text-left">
        <h1 className="font-bold text-xl relative">{name}</h1>
        <p>
          Owner: <span className="font-bold">{owner}</span>
        </p>
        <div className="flex flex-row items-center justify-center">
          {stake && (
            <>
              <Button
                className="btn-secondary w-full mr-2"
                text={checked ? "Uncheck" : "Check"}
                onClick={() => handleCheck(tokenId)}
              />
              <Button
                className="btn w-full ml-2"
                text={staked ? "Unstake" : "Stake"}
                onClick={handleStake}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Asset;
