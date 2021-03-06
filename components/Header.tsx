import React from "react";
import Image from "next/image";
import Button from "./Button";
import router from "next/router";
import { IoLogoYoutube as IYoutube } from "react-icons/io";
import { VscArrowRight as ArrowRight } from "react-icons/vsc";

const Header = () => {
  const handleClick = () => {
    router.push("/staking");
  };
  return (
    <section className="min-h-[90vh] py-3">
      <div className="sm:max-w-screen-lg sm:mx-auto flex flex-col sm:flex-row items-center py-3 sm:mt-20 mt-24 h-full">
        <div className="flex flex-col w-full sm:w-1/2">
          <h1 className="sm:text-5xl text-3xl w-4/5 mx-auto sm:mx-0 sm:w-full text-center sm:text-left sm:leading-relaxed font-bold ">
            Earn up to 6% from NFT staking + daily rewards
          </h1>
          <h2 className="text-1xl mt-5 w-4/5 mx-auto sm:mx-0 text-center sm:text-left text-[#ffffff8f]">
            Learn how to stake your NFT and earn passive income from it
          </h2>
          <div className="flex flex-col sm:flex-row items-center mt-4">
            <Button
              text="Get Started"
              right={true}
              icon={<ArrowRight className="text-1xl text-white ml-2" />}
              onClick={handleClick}
              className="btn sm:mr-3 w-3/5 sm:w-auto"
            />
            <Button
              text="Watch Video"
              left={true}
              onClick={handleClick}
              className="btn-variant w-3/5 sm:w-auto "
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
