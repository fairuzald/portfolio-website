import type { ReactElement, ReactNode } from "react";
import { api } from "@/utils/api";
import type { NextPage } from "next";
import "@/styles/globals.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: any = ({ Component, pageProps }: AppPropsWithLayout) => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 200,
    });
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    // <Layout>
      <Component {...pageProps} />
    // </Layout>
  );
};

export default api.withTRPC(MyApp);
