import React from "react";
import { useStats } from "../contexts";
import { formatCurrency, formatCurrencyNumber } from "../helpers";
import Button from "./Button";

const Staker = () => {
  const { stats } = useStats();
  const staked =
    stats.find((stat) => stat.name.toLocaleLowerCase() === "staked")?.value ||
    0;
  const totalStaked =
    stats.find((stat) => stat.name.toLocaleLowerCase() === "total nfts")
      ?.value || 0;
  const earnings = stats
    .filter(
      (stat) =>
        stat.name.toLocaleLowerCase() === "unclaimed rewards" ||
        stat.name.toLocaleLowerCase() === "claimed rewards"
    )
    .map((stat) => formatCurrencyNumber(stat.value))
    .reduce((prev, current) => {
      return prev + current;
    }, 0);

  return (
    <section className="flex flex-col justify-center">
      <div className="bg-[#181a1d] p-6 rounded-md mb-3">
        <h1 className="font-bold text-center border-b border-gray-500 pb-3">
          Staking Details
        </h1>
        <div className="border-b text-gray-500 border-gray-500 py-3 flex flex-row items-center justify-between">
          <span>Staked</span>
          <p className="text-[#f0f0f0]">{staked || 0} NFTs</p>
        </div>
        <div className="border-b text-gray-500 border-gray-500 py-3 flex flex-row items-center justify-between">
          <span>Staked Reward</span>
          <p className="text-[#f0f0f0]">
            {Number(staked) * 0.6 || 0} Matic (
            {typeof staked === "number"
              ? formatCurrency(Number(staked) * 0.6)
              : 0}
            )
          </p>
        </div>
        <div className="text-gray-500 py-3 flex flex-row items-center justify-between">
          <span>Average APY</span>
          <p className="text-[#f0f0f0]">0.6%</p>
        </div>
      </div>
      <div className="bg-[#181a1d] p-6 rounded-md mb-3">
        <h1 className="font-bold text-center border-b border-gray-500 pb-3">
          Rewards Overview
        </h1>
        <div className="border-b text-gray-500 border-gray-500 py-3 flex flex-row items-center justify-between">
          <span>Total Earnings</span>
          <p className="text-[#f0f0f0]">
            {Math.ceil(Number(totalStaked) * 0.6) || 0} Matic (
            {typeof earnings === "number" ? formatCurrency(earnings) : 0})
          </p>
        </div>
        <div className="text-gray-500 py-3 flex flex-row items-center justify-between">
          <span>Staking Rewards</span>
          <p className="text-[#f0f0f0]">
            {Number(staked) * 0.6 || 0} Matic (
            {typeof staked === "number"
              ? formatCurrency(Number(staked) * 0.6)
              : 0}
            )
          </p>
        </div>
        <Button className="btn w-full" text="Claim now" />
      </div>
    </section>
  );
};

export default Staker;
