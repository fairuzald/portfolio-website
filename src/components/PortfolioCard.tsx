import type { PortfolioProps } from "@/types/portfolio";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StructuredText } from "react-datocms/structured-text";

const PortfolioCard = ({ data }: { data: PortfolioProps }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  return (
    <button className="flex w-full flex-col duration-300 hover:scale-[1.05] hover:text-primary lg:w-[490px] xl:w-[520px] 2xl:w-[560px]">
      <Link href={`portfolio/${data.id}`}>
        {/* Container */}
        <div
          className="w-full overflow-hidden rounded-2xl bg-back shadow-lg"
          data-aos="flip-right"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          {/* Image */}
          {data.image && data.image[0] && (
            <Image
              src={data.image[0]?.url}
              alt={data.image[0]?.title}
              width={data.image[0]?.width}
              height={data.image[0]?.height}
              className="h-[200px] w-full overflow-hidden object-cover object-center md:h-[270px]"
            />
          )}
          {/* Description Text Section Below Image */}
          <div className="flex w-full flex-col items-start gap-4 px-8 py-5 pb-7 md:gap-6 md:px-10 md:py-11">
            {/* Title */}
            <h5 className="line-clamp-1 text-left text-xl font-semibold md:text-[24px] lg:text-[27px]">
              {data.title}
            </h5>
            {/* Description */}
            <p className="line-clamp-4 lg:line-clamp-3 break-all text-justify text-base font-medium text-slate-400  lg:text-xl">
              {isMounted && <StructuredText data={data.description} />}
            </p>
            {/* Mapping tag */}
            <div className="flex flex-row flex-wrap justify-start gap-4">
              {data.app.length > 4
                ? [...data.app]
                    .slice(0, 3)
                    .concat(["..."])
                    .map((list: string, index: number) => (
                      <p
                        key={index}
                        className="flex items-center rounded-lg bg-primary px-3.5 py-1.5 text-center text-sm font-medium text-white shadow-sm  shadow-primary lg:text-lg"
                      >
                        {list}
                      </p>
                    ))
                : data.app.map((list: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center rounded-lg bg-primary px-3.5 py-1.5 text-center text-sm font-medium text-white shadow-sm  shadow-primary lg:text-lg"
                    >
                      {list}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </Link>
    </button>
  );
};
export default PortfolioCard;
