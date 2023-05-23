import type { Document } from "datocms-structured-text-utils";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { StructuredText } from "react-datocms/structured-text";

interface ResumeProps {
  title: string;
  description: Document;
  urlCV: string;
  buttonTextCV: string;
}
const Resume: NextPage<ResumeProps> = ({
  title,
  description,
  urlCV,
  buttonTextCV,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  return (
    <>
      <section
        id="resume"
        className="w-full bg-gradient-to-b from-[#1E2436] to-[#22273B] px-20 pb-[15vh] pt-[13vh] md:pt-[27vh] lg:pt-[32vh]"
      >
        <div className="flex flex-wrap">
          <div
            className="2xl:px-17 mb-16 w-full px-4 text-center text-[4.6vh] font-semibold text-primary lg:mb-8 lg:text-right xl:px-10"
            data-aos="fade-down-left"
          >
            {title}
          </div>
          <div
            className="2xl:px-17 self-top flex w-full flex-wrap justify-center px-4 text-center lg:w-5/12 lg:flex-col xl:px-10"
            data-aos-duration="600"
            data-aos="zoom-in-right"
          >
            <div className="flex w-1/2 flex-col items-center lg:h-1/2 lg:w-full lg:flex-row">
              <span className="mb-2 mr-2 flex h-[8vh] w-[8vh] items-center justify-center rounded-full bg-gradient-to-br from-[#11e0a5] to-[#5430e2] text-[2.4vh] font-semibold lg:mx-10">
                2+
              </span>
              <div className="text-[1.8vh]">
                {">1 tahun"}
                <span className="mb-2 mt-1 block text-[1.9vh] lg:text-[2.5vh]">
                  Physics Olympiad Tutor
                </span>
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-center lg:h-1/2 lg:w-full lg:flex-row">
              <span className="mb-2 flex  h-[8vh] w-[8vh] items-center justify-center rounded-full bg-gradient-to-br from-[#11e0a5] to-[#5430e2] text-[2.4vh] font-semibold lg:mx-10">
                1+
              </span>
              <div className="text-[1.8vh]">
                {"<1 tahun"}
                <span className="mb-2 mt-1 block text-[1.9vh]  lg:text-[2.5vh]">
                  Web Development
                </span>
              </div>
            </div>
          </div>
          <div className="2xl:px-17 w-full px-4 text-center lg:w-7/12 lg:text-right xl:px-10">
            <p
              className="my-14 text-justify text-[2.2vh] text-slate-200 "
              data-aos-duration="600"
              data-aos="zoom-in-left"
            >
              {isMounted && <StructuredText data={description} />}
            </p>
            <div data-aos="fade-up-left" data-aos-delay="100">
              <button className="rounded-full bg-gradient-to-br from-primary to-primary px-[3vh] py-[1.8vh] text-[1.8vh]  font-semibold text-white shadow-md shadow-primary transition duration-300  ease-in-out hover:scale-110 hover:from-[#11e0a5] hover:to-[#5430e2] hover:opacity-80 hover:shadow-xl  lg:px-8 lg:py-3 xl:text-[2.3vh]">
                <a href={urlCV} rel="noreferrer" target="_blank">
                  {buttonTextCV}
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Resume;
