import React, { useEffect, useState } from "react";
import { uid } from "../helpers";
import { useApp, useWallet } from "../contexts";
import Link from "next/link";
import millify from "millify";
import { Button } from ".";
import { BiWallet as IWallet, BiMenu as IMenu } from "react-icons/bi";
import { useRouter } from "next/router";
import Image from "next/image";

const Nav = ({ color }: { color?: string }) => {
  const [links, setLinks] = useState([
    {
      active: false,
      id: uid(),
      path: "/about",
      text: "About",
    },
    {
      active: false,
      id: uid(),
      path: "/marketplace",
      text: "Marketplace",
    },
  ]);
  const { name, year } = useApp();
  const {
    account,
    active,
    balance: accountBalance,
    connectWallet,
  } = useWallet();
  const setLinkState = (id: string) => {
    setLinks(
      links.map((link) => {
        if (link.id === id) {
          link.active = true;
        } else {
          link.active = false;
        }
        return link;
      })
    );
  };

  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const [balance, setBalance] = useState<string | number>("0x00");
  const [trimmedAddress, setTrimmedAddress] = useState("0x00");

  const redirect = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    if (balance && account && active) {
      setTrimmedAddress(
        `${account.slice(0, 5)}...${account.slice(
          account.length - 5,
          account.length
        )}`
      );
      setBalance(
        Number(
          Number(accountBalance) > 10000
            ? accountBalance.slice(0, 4)
            : accountBalance
        )
      );
    }
  }, [active, account]);

  return (
    <section
      className={`sm:px-0 px-4 bg-[#24272c] ${
        color ? color : ""
      } fixed top-0 left-0 w-full z-20`}
    >
      <div className="md:max-w-screen-lg md:mx-auto relative border-b-[1px] border-[#ffffff34] py-3">
        <nav className="flex flex-row items-center justify-between">
          <h1 className="font-bold text-2xl ">{name}</h1>
          <div className="sm:flex flex-row items-center relative">
            <div className="hidden sm:flex flex-col sm:flex-row items-center">
              {links.map((link) => (
                <Link href={link.path} key={link.id}>
                  <a
                    className={`transition-colors relative duration-300 py-1 mr-5  border-transparent text-[#ababbb] hover:text-[#eee] ${
                      link.active ? "text-[#eee]" : ""
                    }`}
                    onClick={() => setLinkState(link.id)}
                  >
                    {link.text}
                  </a>
                </Link>
              ))}
              <Button
                text="Start Staking"
                className="btn-variant mt-0 ml-2 text-sm font-bold rounded-xl"
                onClick={() => redirect("/staking")}
              />
            </div>
            <div className="ml-3 rounded-3xl hidden sm:flex flex-row items-center border-[1px] border-[#ffffff34] cursor-pointer">
              <span className="hidden sm:block font-bold mx-4 mr-6  text-white">
                0.00
              </span>
              <Image
                className="rounded-full"
                width="35"
                height="35"
                src="/avatar1.png"
              ></Image>
            </div>
            <IMenu
              className="text-2xl text-white ml-2 sm:hidden cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="flex flex-col p-3 rounded shadow absolute top-2 right-6 bg-[#383b42] w-max transition-all duration-500">
                {links.map((link) => (
                  <Link href={link.path} key={link.id}>
                    <a
                      className={`transition-colors relative duration-300 mb-2 border-transparent text-[#ababbb] hover:text-[#eee] ${
                        link.active ? "text-[#eee]" : ""
                      }`}
                      onClick={() => setLinkState(link.id)}
                    >
                      {link.text}
                    </a>
                  </Link>
                ))}
                <Link href="">
                  <a
                    className={`transition-colors relative duration-300 border-transparent text-[#ababbb] hover:text-[#eee] `}
                    onClick={() => redirect("/staking")}
                  >
                    Start Staking
                  </a>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Nav;
