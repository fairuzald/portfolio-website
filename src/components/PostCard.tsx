import type { PostProps } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StructuredText } from "react-datocms/structured-text";

const PostCard = ({ data }: { data: PostProps }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  return (
    <div
      className="flex w-[calc(100%-30px)] flex-col gap-4 lg:gap-6 lg:w-[490px] xl:w-[520px] 2xl:w-[560px]"
      data-aos="flip-left"
      data-aos-duration="800"
      data-aos-delay="200"
    >
      {/* Image */}
      <div className="w-full overflow-hidden rounded-md bg-back shadow-md">
        <Image
          src={data.image.url}
          alt={data.image.title}
          width={data.image.width}
          height={data.image.height}
          className="h-[200px] w-full overflow-hidden object-cover object-center md:h-[270px]"
        />
      </div>
      {/* Text Detail Post Card */}
      <div className="flex flex-col gap-3 lg:gap-5">
        {/* Tag Mapping */}
        <div className="flex flex-row flex-wrap justify-start gap-4">
          {data.tag.map((list: string, index: number) => (
            <p
              key={index}
              className="flex items-center rounded-lg bg-primary px-3.5 py-1.5 text-center text-sm font-medium text-white shadow-sm  shadow-primary lg:text-lg"
            >
              {list}
            </p>
          ))}
        </div>
        {/* Title */}
        <h5 className="line-clamp-1 truncate text-left text-xl font-semibold md:text-[24px] lg:text-[27px]">
          {data.title}
        </h5>
        {/* Description */}
        <p className="line-clamp-4 break-all text-justify text-base font-medium text-slate-300 lg:line-clamp-3  lg:text-xl">
          {isMounted && <StructuredText data={data.description} />}
        </p>
        {/* Read More */}
        <Link
          href={`post/${data.id.toString()}`}
          className="mt-2 cursor-pointer text-base font-semibold underline duration-300 hover:text-lg hover:text-primary lg:text-2xl lg:hover:text-[27px]"
        >
          {data.textLinkDetails}
        </Link>
      </div>
    </div>
  );
};
export default PostCard;
