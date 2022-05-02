import { NextComponentType } from "next";
import React from "react";
import { Layout, Header } from "../components";

const App = () => {
  return (
    <>
      <Header />
    </>
  );
};

App.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default App;
