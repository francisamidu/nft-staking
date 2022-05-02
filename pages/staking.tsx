import { NextComponentType } from "next";
import React, { useState } from "react";
import { Button, Layout, StakingNFTList } from "../components";
import { formatCurrency, uid } from "../helpers";

const Staking = () => {
  const [stats, setStats] = useState([
    {
      id: uid(),
      name: "Claimed rewards",
      value: formatCurrency(1000),
    },
    {
      id: uid(),
      name: "Unclaimed rewards",
      value: formatCurrency(2700),
    },
    {
      id: uid(),
      name: "Total Value",
      value: formatCurrency(3069),
    },
    {
      id: uid(),
      name: "Total NFTs",
      value: 1586,
    },
    {
      id: uid(),
      name: "Staked",
      value: 0,
    },
    {
      id: uid(),
      name: "Checked",
      value: 0,
    },
    {
      id: uid(),
      name: "Unchecked",
      value: 186,
    },
  ]);
  const handleClick = () => {};
  return (
    <section className="sm:max-w-screen-xl sm:mx-auto mt-24 mb-1">
      <div className="grid grid-cols-3 min-h-[75vh]">
        <div className="col-start-1 col-end-3 border-r-[1px] border-[#ffffff34] pr-4">
          <div className="flex flex-row items-center justify-between">
            <h1 className="font-bold text-sm text-gray-500 uppercase">
              NFT Stake
            </h1>
            <div className="flex flex-col sm:flex-row">
              <Button
                text="Stake All"
                right={true}
                onClick={handleClick}
                className="btn mt-0 sm:mr-3 w-fit h-10 sm:w-auto"
              />
              <Button
                text="Unstake All"
                left={true}
                onClick={handleClick}
                className="btn-variant mt-0 w-fit h-10 sm:w-auto "
              />
            </div>
          </div>
          <div className="flex flex-row items-center mt-5 justify-between">
            {stats.map((stat) => (
              <div
                className="flex flex-col text-center bg-[#181a1d] p-3 rounded"
                key={stat.id}
              >
                <span className="text-gray-500">{stat.name}</span>
                <span className="font-bold text-base text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
          <StakingNFTList />
        </div>
        <div className="col-start-3 col-end-4"></div>
      </div>
    </section>
  );
};

Staking.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Staking;
