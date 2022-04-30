import { NextComponentType } from "next";
import React from "react";
import { Layout, Header, Footer } from "../components";

const App = () => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

App.getLayout = (page: NextComponentType) => <Layout>{page}</Layout>;

export default App;
