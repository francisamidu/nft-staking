import React from "react";
import Image from "next/image";
import { IExtAsset } from "../interfaces";
import Button from "./Button";

const Asset = ({
  asset: {
    checked,
    createdAt,
    userAvatar,
    username,
    image,
    title,
    price,
    tokenId,
    staked,
  },
  index,
  length,
  handleCheck,
  handleStake,
  handlePurchase,
  stake,
}: {
  asset: IExtAsset;
  index: number;
  length: number;
  handleCheck?: (id: string | number) => any;
  handleStake?: () => any;
  handlePurchase?: () => any;
  stake: boolean;
}) => {
  return (
    <div
      className={`rounded-md relative flex flex-col 
    sm:col-start-${index === 0 ? 1 : ++index} sm:col-end-${
        index === 0 ? 2 : length - ++index === 0 ? ++index : length
      } min-h-[150px] transition-colors duration-300 shadow py-4 sm:mr-3 mb-3 nft-item border-[1.5px] border-transparent ${
        checked && "border-[#e6a901]"
      }`}
    >
      <div className="flex flex-row items-center px-4 mb-3">
        <Image
          src={userAvatar}
          width="30"
          height="30"
          layout="intrinsic"
          className="rounded-full border-[1px] border-gray-700"
        />
        <span className="ml-3 text-gray-500">@{username}</span>
      </div>
      <div className="flex flex-row justify-center place-center px-4">
        <Image
          src={image}
          width="310"
          height="300"
          layout="intrinsic"
          className="rounded-md"
        />
      </div>
      <div className="px-4 sm:text-left">
        <p className="mt-2 font-thin text-gray-500">{createdAt}</p>
        <h1 className="font-bold text-xl relative">{title}</h1>
        <p className="mt-2 font-thin text-gray-500">{price} Matic</p>
        <div className="flex flex-row items-center justify-center">
          {stake ? (
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
          ) : (
            <Button
              className="btn-variant w-full"
              text="Collect now"
              onClick={handlePurchase}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Asset;
