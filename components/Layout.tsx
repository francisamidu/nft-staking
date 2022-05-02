import React, { PropsWithChildren } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Nav } from ".";
import { useApp } from "../contexts";
import { useIntersectionObserver } from "../hooks";
import Footer from "./Footer";

const HomeLayout = ({
  children,
  color,
}: Partial<
  PropsWithChildren<
    AppProps & {
      color?: string;
    }
  >
>) => {
  const { name } = useApp();
  return (
    <>
      <Head>
        <title>{name} - Start earning passive income on your NFTs</title>
        <meta
          name="description"
          content="Start earning passive income on your NFTs"
        />
        <meta name="site-name" content={name} />
        <meta name="author" content="Francis Amidu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav color={color} />
      {children}
      <Footer />
    </>
  );
};

export default HomeLayout;
