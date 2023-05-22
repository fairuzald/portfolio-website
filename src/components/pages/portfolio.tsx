import Image from "next/image";
import Link from "next/link";
import type { PortfolioPageProps } from "@/types/portfolio";
import type { PortfolioImages } from "@/types/portfolio";
import type { Document } from "datocms-structured-text-utils";
import { StructuredText } from "react-datocms/structured-text";
import { useEffect, useState } from "react";

export default function Portfolio({
  data,
  title,
  description,
}: {
  data: PortfolioPageProps[];
  title: string;
  description: Document;
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
          <h2
            className="mb-3  text-[4.6vh] font-semibold text-primary"
            data-aos="zoom-out-down"
          >
            {title}
          </h2>
          <p
            className="font-base text-justify text-[2.3vh] text-white"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            {isMounted && <StructuredText data={description}></StructuredText>}
          </p>
        </div>
        <h1 className="mb-5 text-2xl font-bold" data-aos="zoom-out-right">
          Recent Project
        </h1>
      </div>
      <div className="flex h-fit flex-wrap items-stretch justify-center">
        {data.length >= 3 &&
          data.slice(0, 3).map((project: PortfolioPageProps) => (
            <div
              role="button"
              key={project.id}
              className="flex w-full flex-col px-4 duration-300 hover:scale-[1.05] hover:text-primary lg:w-1/2 xl:w-1/3"
            >
              <Link href={`/portfolio/`}>
                <div
                  className="mb-10 overflow-hidden rounded-2xl bg-back shadow-lg"
                  data-aos="flip-right"
                  data-aos-duration="800"
                  data-aos-delay="200"
                >
                  {project.image && project.image[0] && (
                    <Image
                      src={project.image[0]?.url}
                      alt={project.image[0]?.title}
                      width={project.image[0]?.width}
                      height={project.image[0]?.height}
                      className="mb-[1.38vh] w-full h-[270px]"
                    />
                  )}
                  <div className="flex flex-1 flex-col px-10 py-8">
                    <h3 className="mb-3 block truncate text-[2.67vh] font-semibold">
                      {project.title}
                    </h3>
                    <p className="mb-5 line-clamp-3 text-[2.21vh] font-medium text-slate-400">
                      {project.description}{" "}
                    </p>
                    <div className="mb-[0.92vh] flex flex-row flex-wrap justify-start  gap-x-[4vw] sm:gap-x-[0.78vw]">
                      {project.app.length > 4
                        ? [...project.app]
                            .slice(0, 3)
                            .concat(["..."])
                            .map((list: string, index: number) => (
                              <div
                                key={index}
                                className="mb-3 flex w-fit items-center rounded-lg bg-primary px-[3vw] py-[0.55vh] text-center text-[1.5vh] font-medium text-white shadow-sm  shadow-primary sm:px-[0.7vw] lg:text-[2vh]"
                              >
                                {list}
                              </div>
                            ))
                        : project.app.map((list: string, index: number) => (
                            <div
                              key={index}
                              className="mb-3 flex w-fit items-center rounded-lg bg-primary px-[3vw] py-[0.55vh] text-center text-[1.5vh] font-medium text-white shadow-sm  shadow-primary sm:px-[0.7vw] lg:text-[2vh]"
                            >
                              {list}
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        <div
          className="items-center- mt-4 flex w-full justify-center "
          data-aos="zoom-in"
          data-aos-duration="200"
        >
          <button className="rounded-full bg-gradient-to-br from-primary to-primary px-[3vh] py-[1.8vh] text-[1.8vh]  font-bold text-white shadow-md shadow-primary transition duration-300 ease-in-out hover:scale-110 hover:from-[#11e0a5] hover:to-[#5430e2] hover:opacity-80 hover:shadow-xl  lg:px-8 lg:py-3 xl:text-[2.3vh]">
            <Link href="/portfolio">View More Projects</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
