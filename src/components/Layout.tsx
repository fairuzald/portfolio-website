import Footer from "./Footer";
import React from "react";
import Navbar from "./Navbar";

export const MyContext = React.createContext({});

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <div
      className={`absolute inset-0 flex w-full flex-col scroll-smooth`}
      style={{ scrollBehavior: "smooth" }}
    >
      <Navbar />
      <main className="flex-auto">{children}</main>
      <Footer />
    </div>
  );
}
