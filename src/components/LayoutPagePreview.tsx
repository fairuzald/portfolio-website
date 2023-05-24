import Footer from "./Footer";
import React from "react";
import Navbar from "./Navbar";

export const MyContext = React.createContext({});

interface NavbarDataProps {
  href: string;
  context: string;
}
export default function LayoutPagePreview({
  dataNavbar,
  children,
}: {
  dataNavbar: NavbarDataProps[];
  children: JSX.Element;
}) {
  return (
    <div
      className={`absolute inset-0 flex w-full flex-col scroll-smooth`}
      style={{ scrollBehavior: "smooth" }}
    >
      <Navbar data={dataNavbar} />
      <main className="flex-auto">{children}</main>
      <Footer />
    </div>
  );
}
