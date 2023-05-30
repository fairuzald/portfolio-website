import Link from "next/link";
import type { PortfolioProps } from "@/types/portfolio";
import type { Document } from "datocms-structured-text-utils";
import { StructuredText } from "react-datocms/structured-text";
import { useEffect, useState } from "react";
import PortfolioCards from "../PortfolioCard";
import Button from "../Button";

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
      className="flex w-full flex-col items-center justify-center gap-10 bg-gradient-to-b from-[#22273B] to-[#1C2034] px-14 py-28 md:px-20 md:py-60 lg:px-28"
    >
      {/* Description and Title */}
      <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-12 text-center">
        {/* Title */}
        <h2
          className="text-center text-3xl font-semibold text-primary md:text-4xl lg:text-5xl"
          data-aos="zoom-out-down"
        >
          {title}
        </h2>
        {/* Description */}
        <p
          className="text-justify font-inter-r text-base leading-7 text-slate-200 md:text-xl lg:text-[23px] lg:leading-[35px]"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          {isMounted && <StructuredText data={description}></StructuredText>}
        </p>
      </div>
      {/* Recent Text */}
      <h3
        className="mb-3 mr-auto mt-6 flex items-start justify-start text-left text-xl font-bold md:text-2xl lg:text-3xl"
        data-aos="zoom-out-right"
      >
        {recentText}
      </h3>
      {/* Mapping Cards */}
      <div className="flex flex-wrap items-stretch justify-center gap-12 2xl:gap-14">
        {portfolioData.length >= 3 &&
          portfolioData
            .slice(0, 3)
            .map((project: PortfolioProps) => (
              <PortfolioCards key={project.id} data={project} />
            ))}
        {/* button */}
        <div
          className="items-center- mt-4 flex w-full justify-center "
          data-aos="zoom-in"
          data-aos-duration="200"
        >
          <Link href="/portfolio">
            <Button color="gradient">{buttonText}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
