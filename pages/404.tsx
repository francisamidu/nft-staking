import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Button } from "../components";
import { useRouter } from "next/router";

const NotFoundPage = () => {
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };
  return (
    <>
      <Head>
        <title>404 - It appears youre lost</title>
      </Head>
      <main className="dark flex flex-row items-center justify-center min-h-[94h]">
        <div className="flex flex-col items-center justify-center h-full mt-20">
          <Image src="/discussing-code.png" width="300" height="300" />
          <h1 className="text-xl font-bold mt-4">Ehhh you lost</h1>
          <Button
            text="Go back"
            className="btn-variant"
            onClick={() => redirect("/")}
          />
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
