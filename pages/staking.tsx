import { ethers } from "ethers";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Asset, Button, Layout, Staker } from "../components";
import { useContract, useStats, useWallet } from "../contexts";
import { IExtAsset, IStat } from "../interfaces";

const Staking = () => {
  // hooks
  const { stats: tempStats } = useStats();
  const { NFTCollection, NFTStaker } = useContract();
  const { account } = useWallet();
  const router = useRouter();

  // State variables
  const [assets, setAssets] = useState<IExtAsset[]>([]);
  const [checked, setChecked] = useState<IExtAsset[]>([]);
  const [tokens, setTokens] = useState([0]);
  const [stats, setStats] = useState<IStat[]>([]);

  // Functions
  const redirect = () => {
    router.push("/marketplace");
  };
  const stake = () => {};
  const stakeAll = () => {};
  const unStakeAll = () => {};
  const check = (id: string | number) => {
    const newAssets = assets.map((asset) => {
      if (asset.tokenId === id) {
        asset = {
          ...asset,
          checked: true,
        };
      }
      return asset;
    });
    const newStats = stats.map((stat) => {
      if (stat.name.toLowerCase() === "checked") {
        stat = {
          ...stat,
          value: Number(stat.value) + 1,
        };
      }
      if (stat.name.toLowerCase() === "unchecked") {
        stat = {
          ...stat,
          value: Number(stat.value) - 1,
        };
      }
      return stat;
    });
    setStats(newStats);
    setAssets(newAssets);
    setTokens([...tokens, Number(id)]);
  };
  const getAssets = async () => {
    if (!NFTCollection) {
      toast.info("Please connect your wallet first");
      return;
    }
    try {
      let tokenIds = await NFTCollection.balanceOf(account);
      tokenIds = tokenIds.toNumber();
      tokenIds = Array.from(Array(tokenIds + 1).keys());
      for (let tokenId of tokenIds) {
        if (tokenId) {
          const tokenUri = await NFTCollection.tokenURI(tokenId);
          let asset = null;
          console.log(tokenUri);
          let meta: any = await fetch(tokenUri, {
            mode: "no-cors",
            referrer: "localhost",
            keepalive: true,
          });
          meta = await meta.text();
          // meta = await meta.json();
          // asset = {
          //   active: false,
          //   checked: false,
          //   tokenId,
          //   name: meta.name,
          //   image: meta.image,
          //   owner: account,
          // };
          // setTokens([...tokens, tokenId]);
          // setAssets([...assets, asset]);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error: Asset query failed");
    }
  };
  const getStats = async () => {
    try {
      let claimed = await NFTStaker.claimed(account);
      claimed = claimed.toString();

      let earningInfo = await NFTStaker.earningInfo(tokens);
      earningInfo = earningInfo.map((el) =>
        Math.ceil(Number(ethers.utils.formatEther(el.toString())))
      );

      let totalNFTs = await NFTCollection.balanceOf(account);
      totalNFTs = totalNFTs.toString();

      let totalStaked = await NFTStaker.totalStaked(account);
      totalStaked = totalStaked.toString();

      const stats = tempStats.map((stat) => {
        if (stat.name.toLowerCase().includes("claimed")) {
          stat = {
            ...stat,
            value: claimed,
          };
        } else if (stat.name.toLowerCase().includes("nfts")) {
          stat = {
            ...stat,
            value: totalNFTs,
          };
        } else if (stat.name.toLowerCase().includes("staked")) {
          stat = {
            ...stat,
            value: totalStaked,
          };
        }
        return stat;
      });
      setStats(stats);
    } catch (error) {
      toast.error("Error: Failed to retrieve staking info");
      console.log(error);
    }
  };

  // Effectful code
  useEffect(() => {
    getAssets();
    NFTStaker && getStats();
    return () => {};
  }, [NFTCollection]);

  useEffect(() => {
    const stats = tempStats.map((stat) => {
      if (stat.name.toLowerCase() === "unchecked") {
        stat = {
          ...stat,
          value: assets.length,
        };
      }
      return stat;
    });
    setStats(stats);
  }, [assets]);
  return (
    <main className="sm:max-w-screen-xl sm:mx-auto mt-24 mb-1">
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
                onClick={stakeAll}
                className="btn mt-0 sm:mr-3 w-fit h-10 sm:w-auto"
              />
              <Button
                text="Unstake All"
                left={true}
                onClick={unStakeAll}
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
          <section className="flex flex-col">
            {assets.length > 0 || checked.length > 0 ? (
              <>
                {assets.length > 0 && (
                  <section className="w-full mt-4">
                    <h1 className="font-bold text-sm uppercase mb-3">
                      Unchecked
                    </h1>
                    <section className="staking-items grid w-full">
                      {assets.map((asset, index) => (
                        <Asset
                          asset={asset}
                          index={index}
                          length={assets.length}
                          key={Number(asset.tokenId) * Date.now()}
                          stake={true}
                          handleCheck={check}
                          handleStake={stake}
                        />
                      ))}
                    </section>
                  </section>
                )}
                {checked.length > 0 && (
                  <section className="w-full mt-4">
                    <h1 className="text-sm font-bold uppercase mb-3">
                      Checked
                    </h1>
                    <section className="staking-items grid w-full">
                      {checked.map((asset, index) => (
                        <Asset
                          asset={asset}
                          index={index}
                          length={checked.length}
                          key={Number(asset.tokenId) * Date.now()}
                          stake={true}
                          handleCheck={check}
                          handleStake={stake}
                        />
                      ))}
                    </section>
                  </section>
                )}
              </>
            ) : (
              <div className="self-center justify-self-center flex flex-col items-center justify-center w-[300px] mt-24">
                <h1 className="font-bold text-base">No NFTs Available</h1>
                <h2 className="text-center text-gray-500 mt-2">
                  You don't seem to have any assets to stake. Buy some to get
                  rewards!!
                </h2>
                <Button
                  text="Purchase"
                  left={true}
                  onClick={redirect}
                  className="btn-variant w-fit h-10"
                />
              </div>
            )}
          </section>
        </div>
        <div className="col-start-3 col-end-4 px-3">
          <Staker />
        </div>
      </div>
    </main>
  );
};

Staking.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default Staking;
