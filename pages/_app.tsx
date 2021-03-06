import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import "../styles/main.scss";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { NextPage } from "next";

import {
  AppProvider,
  ContractProvider,
  StatsProvider,
  WalletProvider,
} from "../contexts";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout): unknown => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AppProvider>
      <ContractProvider>
        <StatsProvider>
          <WalletProvider>
            <ToastContainer />
            {getLayout(<Component {...pageProps} />)}
          </WalletProvider>
        </StatsProvider>
      </ContractProvider>
    </AppProvider>
  );
};

export default App;
