import type { BubbleExperienceProps } from "@/types/homePage";
import type { Document } from "datocms-structured-text-utils";
import { useEffect, useState } from "react";
import { StructuredText } from "react-datocms/structured-text";
import BubbleFrame from "../BubbleFrame";
import Link from "next/link";
import Button from "../Button";

interface ResumeProps {
  title: string;
  description: Document;
  urlCV: string;
  buttonTextCV: string;
  bubbleExperience: BubbleExperienceProps[];
}
const Resume = ({
  title,
  description,
  urlCV,
  buttonTextCV,
  bubbleExperience,
}: ResumeProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  return (
    <section
      id="resume"
      className="flex w-full flex-col gap-y-14 bg-gradient-to-b from-[#1E2436] to-[#22273B] px-14 py-28 md:px-20 md:py-60 lg:px-36"
    >
      {/* Title */}
      <h2
        className="w-full text-center text-3xl font-semibold text-primary md:text-4xl lg:text-right lg:text-5xl"
        data-aos="fade-down-left"
      >
        {title}
      </h2>
      {/* Left Section */}
      <div className="flex flex-wrap gap-y-10">
        {/* Bubble Experience */}
        <div
          className="flex h-fit w-full flex-wrap justify-center gap-x-10 gap-y-10 text-center lg:w-5/12 lg:flex-col lg:pl-0 lg:pr-10 lg:text-left 2xl:pr-10"
          data-aos-duration="600"
          data-aos="zoom-in-right"
        >
          {bubbleExperience.map((item) => {
            return (
              <div
                key={item.id}
                className="flex w-[calc(50%-50px)] flex-col items-center gap-x-2 gap-y-7 lg:w-full lg:flex-row"
              >
                {/* Bubble Frame */}
                <BubbleFrame>{item.durationBubble}</BubbleFrame>
                {/* Explanation of Bubble */}
                <h4 className="flex flex-1 flex-col gap-2 break-all text-sm md:text-lg lg:text-xl">
                  {item.durationTitle}
                  {/* Role on experience */}
                  <span className="block text-base lg:text-2xl">
                    {item.experienceTitle}
                  </span>
                </h4>
              </div>
            );
          })}
        </div>
        {/* Right Section */}
        <div className="flex w-full flex-col items-center gap-16 px-4 text-center lg:w-7/12 lg:items-end lg:pr-0 lg:text-right xl:pl-10">
          {/* Description */}
          <p
            className="text-base leading-7 text-slate-200 md:text-xl lg:text-[23px] lg:leading-[38px]"
            data-aos-duration="600"
            data-aos="zoom-in-left"
          >
            {isMounted && <StructuredText data={description} />}
          </p>
          {/* Button */}
          <div data-aos="fade-up-left" data-aos-delay="100">
            <Link href={urlCV} rel="noreferrer" target="_blank">
              <h4>
                <Button color="gradient">{buttonTextCV}</Button>
              </h4>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Resume;
