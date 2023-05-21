import React, { useEffect, useState } from "react";
import Link from "next/link";
import ChevronIcon from "./icons/ChevronIcon";
import { useRouter } from "next/router";

const Breadcrumbs = ({ currentText }: { currentText: string }) => {
  const router = useRouter();
  // Take title from pathname Url router with no empty string
  const [titlePages, setTitlePages] = useState(
    router.pathname.split("/").filter((title) => title !== "")
  );
  // DataUrl for href on Next Link
  const [dataUrls, setDataUrls] = useState<string[]>([]);
  // Taking data url and changing for first time rendering
  useEffect(() => {
    setTitlePages(router.pathname.split("/").filter((title) => title !== ""));
    const newDataUrls = titlePages.reduce(
      (array: string[], current: string, index: number) => {
        const prev = array?.[index - 1] ?? "";
        return [...array, `${prev}/${current}`];
      },
      []
    );
    setDataUrls(newDataUrls);
  }, []);
  return (
    <>
      <nav className="flex items-center gap-4 font-gantari-md text-base capitalize text-white">
        {/* Homepage */}
        <Link
          href="/"
          className="transition-all duration-300 ease-in-out hover:underline hover:drop-shadow-[0px_2px_4px_#FFFFFF]"
        >
          Home
        </Link>
        <ChevronIcon style="fill-white -rotate-90"></ChevronIcon>
        {/* Mapping Other Page */}
        {dataUrls.map((item, index) => (
          <>
            {/* For current page */}
            {index === titlePages.length - 1 ? (
              <Link
                key={index}
                href={item}
                className="capitalize text-ted-yellow transition-all duration-300 ease-in-out hover:underline hover:drop-shadow-[0px_2px_4px_#FECC4E]"
              >
                {currentText
                  ? currentText
                  : titlePages[index]?.replace("-", " ")}
              </Link>
            ) : (
              // Other not current page
              <>
                <Link
                  key={index}
                  href={item}
                  className="capitalize transition-all duration-300 ease-in-out hover:underline hover:drop-shadow-[0px_2px_4px_#FFFFFF]"
                >
                  {titlePages[index]?.replace("-", " ")}
                </Link>
                <ChevronIcon style="fill-white -rotate-90"></ChevronIcon>
              </>
            )}
          </>
        ))}
      </nav>
    </>
  );
};
Breadcrumbs.defaultProps = {
  currentText: "",
};
export default Breadcrumbs;
