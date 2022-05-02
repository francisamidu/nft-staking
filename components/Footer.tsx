import React, { useState } from "react";
import { uid } from "../helpers";

import {
  AiFillFacebook as IFacebook,
  AiFillTwitterCircle as ITwitter,
  AiFillLinkedin as ILinkedin,
} from "react-icons/ai";
import { RiDiscordLine as IDiscord } from "react-icons/ri";
import { useApp } from "../contexts";

const Footer = () => {
  const { name } = useApp();
  const [socials, setSocials] = useState([
    {
      id: uid(),
      icon: <IFacebook className="text-3xl text-white" />,
      link: "http://www.facebook.com/monster_nfts",
    },
    {
      id: uid(),
      icon: <ILinkedin className="text-3xl text-white" />,
      link: "http://www.linkedin.com/monster_nfts",
    },
    {
      id: uid(),
      icon: <ITwitter className="text-3xl text-white" />,
      link: "http://www.twitter.com/monster_nfts",
    },
    {
      id: uid(),
      icon: <IDiscord className="text-3xl text-white" />,
      link: "http://www.discord.com/monster_nfts",
    },
  ]);
  return (
    <footer className="sm:max-w-screen-lg mx-auto">
      <div className="flex flex-col sm:flex-row py-4 border-t-2 border-[#ffffff34] justify-between items-center text-center sm:text-inherit">
        <h1 className="text-1xl font-bold capitalize">{name}</h1>
        <p className="my-4 sm:my-0">
          <span className="font-bold">
            &copy; 2022
            <span className="ml-2">{name}</span>
          </span>
          <span className="mx-2">-</span>
          <span>All Rights Reserved</span>
        </p>

        <div className="flex flex-row items-center justify-between">
          {socials.map((social) => (
            <a key={social.id} href={social.link} className="w-fit mr-4">
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
