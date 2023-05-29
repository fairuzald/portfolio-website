import Link from "next/link";
import type { PortfolioProps } from "@/types/portfolio";
import type { Document } from "datocms-structured-text-utils";
import { StructuredText } from "react-datocms/structured-text";
import { useEffect, useState } from "react";
import PortfolioCards from "../PortfolioCard";

export default function Portfolio({
  portfolioData,
  title,
  description,
  buttonText,
  recentText,
}: {
  portfolioData: PortfolioProps[];
  title: string;
  description: Document;
  buttonText: string;
  recentText: string;
}) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  return (
    <section
      id="portfolio"
      className="w-full bg-gradient-to-b from-[#22273B] to-[#1C2034] px-20 py-[11vh] lg:py-[18vh]"
    >
      <div className="w-full px-4">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <h3
            className="mb-3  text-[4.6vh] font-semibold text-primary"
            data-aos="zoom-out-down"
          >
            {title}
          </h3>
          <p
            className="font-base text-justify text-[2.3vh] text-white"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            {isMounted && <StructuredText data={description}></StructuredText>}
          </p>
        </div>
        <h4 className="mb-5 text-2xl font-bold" data-aos="zoom-out-right">
          {recentText}
        </h4>
      </div>
      <div className="flex h-fit flex-wrap items-stretch justify-center">
        {portfolioData.length >= 3 &&
          portfolioData
            .slice(0, 3)
            .map((project: PortfolioProps) => (
              <PortfolioCards key={project.id} data={project} />
            ))}
        <div
          className="items-center- mt-4 flex w-full justify-center "
          data-aos="zoom-in"
          data-aos-duration="200"
        >
          <button className="rounded-full bg-gradient-to-br from-primary to-primary px-[3vh] py-[1.8vh] text-[1.8vh]  font-bold text-white shadow-md shadow-primary transition duration-300 ease-in-out hover:scale-110 hover:from-[#11e0a5] hover:to-[#5430e2] hover:opacity-80 hover:shadow-xl  lg:px-8 lg:py-3 xl:text-[2.3vh]">
            <Link href="/portfolio">{buttonText}</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
