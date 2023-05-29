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
    <button className="flex w-full flex-col px-4 duration-300 hover:scale-[1.05] hover:text-primary lg:w-1/2 xl:w-1/3">
      <Link href={`portfolio/${data.id}`}>
        <div
          className="mb-10 w-full overflow-hidden rounded-2xl bg-back shadow-lg"
          data-aos="flip-right"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          {data.image && data.image[0] && (
            <Image
              src={data.image[0]?.url}
              alt={data.image[0]?.title}
              width={data.image[0]?.width}
              height={data.image[0]?.height}
              className="mb-[1.38vh] h-[270px] w-full overflow-hidden bg-cover"
            />
          )}
          <div className="flex w-full flex-col items-start px-10 py-8">
            <h5 className="mb-3 text-[2.67vh] text-left font-semibold line-clamp-1">
              {data.title}
            </h5>
            <p className="mb-5 line-clamp-3 text-justify text-[2.21vh] font-medium text-slate-400">
              {isMounted && <StructuredText data={data.description} />}
            </p>
            <div className="mb-[0.92vh] flex flex-row flex-wrap justify-start  gap-x-[4vw] sm:gap-x-[0.78vw]">
              {data.app.length > 4
                ? [...data.app]
                    .slice(0, 3)
                    .concat(["..."])
                    .map((list: string, index: number) => (
                      <div
                        key={index}
                        className="mb-3 flex  items-center rounded-lg bg-primary px-[3vw] py-[0.55vh] text-center text-[1.5vh] font-medium text-white shadow-sm  shadow-primary sm:px-[0.7vw] lg:text-[2vh]"
                      >
                        {list}
                      </div>
                    ))
                : data.app.map((list: string, index: number) => (
                    <div
                      key={index}
                      className="mb-3 flex  items-center rounded-lg bg-primary px-[3vw] py-[0.55vh] text-center text-[1.5vh] font-medium text-white shadow-sm  shadow-primary sm:px-[0.7vw] lg:text-[2vh]"
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
