import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DataProps {
  href: string;
  context: string;
}
export default function Navbar({ data }: { data: DataProps[] }) {
  const [navbarShow, setNavbarShow] = useState(false);
  // Handle change of hamburger animation
  function handleNavbar() {
    if (navbarShow) {
      document.querySelector("#hamburger")?.classList.remove("hamburgeractive");
      setNavbarShow(false);
    } else {
      document.querySelector("#hamburger")?.classList.add("hamburgeractive");
      setNavbarShow(true);
    }
  }
  // Add logic to make navbar fixed on top
  useEffect(() => {
    window.onscroll = () => {
      const header = document.querySelector("header");
      if (header != null) {
        window.pageYOffset > header.offsetTop
          ? header.classList.add("navbarfixed")
          : header.classList.remove("navbarfixed");
      }
    };

    return () => {
      window.onscroll = null;
    };
  }, []);
  return (
    <header className="absolute left-0 top-0 z-10 flex w-full items-center bg-transparent">
      <div className="relative flex items-center justify-between w-full lg:mx-20">
        {/* Logo websites */}
        <div className="flex">
          <Link
            href="#home"
            scroll={false}
            className="flex px-10 py-[14px] md:py-[17px]"
          >
            <Image
              src="/LogoWebsite.png"
              alt="Fairuz"
              width="76"
              height="73"
              className="hover:shadow-outline-lg mx-auto h-[30px] w-[30px] object-cover shadow-blue-600 duration-300 ease-in-out hover:scale-110 lg:h-[45px] lg:w-[45px]"
            ></Image>
          </Link>
        </div>
        <div className="flex items-center px-10">
          {/* Hamburger button */}
          <button
            id="hamburger"
            name="hamburger"
            className="hover:color-primary absolute right-10 block lg:hidden"
            onClick={handleNavbar}
          >
            <span className="hamburgerline origin-top-left transition duration-300"></span>
            <span className="hamburgerline transition duration-300"></span>
            <span className="hamburgerline origin-bottom-left transition  duration-300"></span>
          </button>
          <nav
            id="nav-menu"
            className={`${
              !navbarShow ? "hidden" : "flex"
            } absolute right-4 top-full w-full max-w-[40vw] rounded-lg bg-[rgb(44,48,77)] py-4 tracking-wider shadow-lg lg:static lg:flex lg:max-w-full lg:rounded-none lg:bg-transparent lg:py-5 lg:shadow-none`}
          >
            <ul className="flex w-full flex-col items-center lg:flex-1 lg:flex-row">
              {data.map((item: DataProps, index: number) => (
                <li
                  key={index}
                  className="list-navbar cursor-pointer transition duration-300 hover:text-primary hover:opacity-90"
                >
                  <Link
                    href={item.href}
                    className="mx-8 font-montserrat-sb flex py-2 text-base tracking-widest md:text-xl"
                    scroll={false}
                    onClick={() => {
                      document
                        .querySelector("#hamburger")
                        ?.classList.remove("hamburgeractive");
                      setNavbarShow(false);
                    }}
                  >
                    {item.context}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
Navbar.defaultProps = {
  data: [
    { href: "#home", context: "Home" },
    { href: "#about", context: "About" },
    { href: "#resume", context: "Resume" },
    { href: "#portfolio", context: "Portfolio" },
    { href: "#post", context: "Post" },
  ],
};
