import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 200,
    });
  }, []);
  return (<Component {...pageProps} />);
};

export default api.withTRPC(MyApp);
