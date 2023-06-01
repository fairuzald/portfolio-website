import type { PortfolioProps } from "@/types/portfolio";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StructuredText } from "react-datocms/structured-text";
import MappingTagFrame from "./MappingTagFrame";

const PortfolioCard = ({ data }: { data: PortfolioProps }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    if (data.image.length > 1) {
      const timerId = setTimeout(() => {
        let newOffset = itemOffset + 1;
        if (newOffset >= data.image.length) {
          newOffset = 0;
        }
        setItemOffset(newOffset);
      }, 3000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [data.image.length, itemOffset, setItemOffset]);
  return (
    <Link
      href={`portfolio/${data.id}`}
      className="flex w-full flex-col duration-300 hover:scale-[1.05] hover:text-primary md:w-[460px] lg:w-[490px] xl:w-[520px] 2xl:w-[540px]"
    >
      {/* Container */}
      <div
        className="w-full overflow-hidden rounded-2xl bg-back shadow-lg"
        data-aos="flip-right"
        data-aos-duration="800"
        data-aos-delay="200"
      >
        {/* Image */}
        {data.image && data.image[itemOffset] && (
          <Image
          key={data.image[itemOffset]?.id}
            src={data.image[itemOffset]?.url ?? ""}
            alt={data.image[itemOffset]?.title ?? ""}
            width={data.image[itemOffset]?.width}
            height={data.image[itemOffset]?.height}
            style={{ animation: "fade-in-out 1s ease-in-out" }}
            className="h-[200px] w-full transform animate-fade-in-out overflow-hidden object-cover object-center transition-opacity duration-1000 ease-in-out md:h-[270px]"
          />
        )}

        {/* Description Text Section Below Image */}
        <div className="flex w-full flex-col items-start gap-4 px-7 py-5 pb-7 md:gap-6 md:px-10 md:py-11">
          {/* Title */}
          <h5 className="line-clamp-1 text-left text-xl font-semibold md:text-[24px] lg:text-[27px]">
            {data.title}
          </h5>
          {/* Description */}
          <p className="line-clamp-4 break-all text-justify text-base font-medium text-slate-400 lg:line-clamp-3  lg:text-xl">
            {isMounted && <StructuredText data={data.description} />}
          </p>
          {/* Mapping tag */}
          <div className="flex flex-row flex-wrap justify-start gap-4">
            {data.app.length > 4
              ? [...data.app]
                  .slice(0, 3)
                  .concat(["..."])
                  .map((list: string, index: number) => (
                    <MappingTagFrame key={index}>{list}</MappingTagFrame>
                  ))
              : data.app.map((list: string, index: number) => (
                  <MappingTagFrame key={index}>{list}</MappingTagFrame>
                ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PortfolioCard;
