import React from "react";
import router from "next/router";
import Image from "next/image";
import { NextComponentType } from "next";
import { Button, Layout } from "../components";
import { IoArrowForwardOutline as ArrowRight } from "react-icons/io5";
import { AiFillCheckCircle as ICheck } from "react-icons/ai";
import { useApp } from "../contexts";

const About = () => {
  const { name } = useApp();
  const handleClick = () => {
    router.push("/staking");
  };
  return (
    <main className="sm:max-w-screen-xl sm:mx-auto mt-28 flex flex-col items-center min-h-[75vh]">
      <div className="text-center">
        <h1 className="font-bold text-base uppercase">About {name}</h1>
        <p className="text-gray-500 my-1 sm:w-3/5 sm:mx-auto">
          NFT staking is the process of locking/depositting your NFT assets into
          a pool to earn passive income. {name} is one of the industry leading
          projects that help you benefit from staking. Stake your NFTs in our
          pools an earn up to 6%.
        </p>
      </div>
      <p className="text-gray-500 my-1"></p>
      <Button
        text="Start Earning"
        right={true}
        icon={<ArrowRight className="text-1xl text-white ml-2" />}
        onClick={handleClick}
        className="btn sm:mr-3 w-3/5 sm:w-auto hover:-translate-y-1 duration-200 transition-all"
      />
      <div className="flex flex-row justify-center mt-10">
        <div className="relative hidden sm:flex flex-row justify-center px-6 mr-5">
          <Image
            src="/crypto-coins.png"
            layout="intrinsic"
            width="300"
            height="300"
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-xl mb-4 text-center sm:text-left">
            Let's do the math
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <div className="sm:mx-0 sm:mb-0 marker:mb-2 mx-2 sm:mr-2 bg-[#383b42] rounded p-5">
              <div className="flex flex-col">
                <div className="flex flex-row items-center mb-3">
                  <ICheck className="mr-3 text-white" />
                  <p className="text-gray-500">
                    Assets staked:
                    <span className="text-white ml-1">100,000</span>
                  </p>
                </div>
                <div className="flex flex-row items-center mb-3">
                  <ICheck className="mr-3 text-white" />
                  <p className="text-gray-500">
                    Time:
                    <span className="text-white ml-1">1 month</span>
                  </p>
                </div>
                <div className="flex flex-row items-center mb-3">
                  <ICheck className="mr-3 text-white" />
                  <p className="text-gray-500">
                    APY:
                    <span className="text-white ml-1">6%</span>
                  </p>
                </div>
                <div className="flex flex-row items-center mb-3">
                  <ICheck className="mr-3 text-white" />
                  <p className="text-gray-500">
                    Reward Math:
                    <span className="text-white ml-1">
                      100,000 * 1 * (0.06/12) = 500
                    </span>
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center text-xl">
                  <p className="text-gray-500 text-1xl">
                    Total:
                    <span className="text-white ml-1">$100,500</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:mx-0 mx-2 sm:ml-2 bg-[#383b42] rounded p-5">
              <div className="flex flex-col">
                <div className="flex flex-row items-center mb-3">
                  <ICheck className="mr-3 text-white" />
                  <p className="text-gray-500">
                    Assets staked:
                    <span className="text-white ml-1">500,000</span>
                  </p>
                </div>
                <div className="flex flex-row items-center mb-3">
                  <ICheck className="mr-3 text-white" />
                  <p className="text-gray-500">
                    Time:
                    <span className="text-white ml-1">2 month</span>
                  </p>
                </div>
                <div className="flex flex-row items-center mb-3">
                  <ICheck className="mr-3 text-white" />
                  <p className="text-gray-500">
                    APY:
                    <span className="text-white ml-1">6%</span>
                  </p>
                </div>
                <div className="flex flex-row items-center mb-3">
                  <ICheck className="mr-3 text-white" />
                  <p className="text-gray-500">
                    Reward Math:
                    <span className="text-white ml-1">
                      500,000 * 2 * (0.06/12) = 2,500
                    </span>
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center text-xl">
                  <p className="text-gray-500 text-1xl">
                    Total:
                    <span className="text-white ml-1">$502,500</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

About.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default About;
