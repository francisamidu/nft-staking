import React from "react";
import Image from "next/image";
import { useApp } from "../contexts";
import Button from "./Button";
import router from "next/router";
import { IoLogoYoutube as IYoutube } from "react-icons/io";
import { VscArrowRight as ArrowRight } from "react-icons/vsc";

const Header = () => {
  const handleClick = () => {
    router.push("/dashboard?tag=mint_an_nft");
  };
  return (
    <section className="min-h-[90vh] py-3">
      <div className="md:max-w-screen-lg md:mx-auto flex flex-col sm:flex-row items-center py-3 sm:mt-20 my-10 h-full">
        <div className="flex flex-col w-1/2">
          <h1 className="sm:text-5xl text-3xl leading-relaxed font-bold ">
            Earn up to 30% from NFT staking + daily rewards
          </h1>
          <h2 className="text-1xl mt-5 w-3/5 text-[#ffffff8f]">
            Learn how to stake your NFT and earn passive income from it
          </h2>
          <div className="flex flex-row items-center mt-4">
            <Button
              text="Get Started"
              right={true}
              icon={<ArrowRight className="text-1xl text-white ml-2" />}
              onClick={handleClick}
              className="btn mr-3"
            />
            <Button
              text="Watch Video"
              left={true}
              onClick={handleClick}
              className="btn-variant"
              icon={<IYoutube className="mr-2 text-2xl text-white" />}
            />
          </div>
        </div>
        <div className="relative hidden sm:flex flex-row justify-center px-6 ml-4">
          <Image
            src="/crypto-coins.png"
            layout="intrinsic"
            width="400"
            height="400"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
