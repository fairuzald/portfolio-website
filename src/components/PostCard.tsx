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
      className="mb-12 h-[680px] w-full p-6 md:w-1/2"
      data-aos="flip-left"
      data-aos-duration="800"
      data-aos-delay="200"
    >
      <div className="rounded-md shadow-md ">
        <Image
          src={data.image.url}
          alt={data.title}
          width="1000"
          height="500"
          className="mb-[1.38vh] w-full"
        />
      </div>
      <div className="mt-[0.92vh] flex flex-row flex-wrap justify-start gap-x-[4vw] sm:gap-x-[0.78vw]">
        {data.tag.map((list: string, index: number) => (
          <div
            key={index}
            className="mt-3 flex w-fit items-center rounded-lg bg-primary px-[3vw] py-[0.55vh] text-center text-[1.5vh] font-medium text-white shadow-sm  shadow-primary sm:px-[0.7vw] lg:text-[2vh]"
          >
            {list}
          </div>
        ))}
      </div>
      <h5 className="mb-3 mt-5 truncate text-[2.6vh] text-xl font-semibold">
        {data.title}
      </h5>
      <p className="mb-8 line-clamp-3 text-[2.1vh] font-medium text-slate-300">
        {isMounted && <StructuredText data={data.description} />}
      </p>
      <Link
        href={`post/${data.id.toString()}`}
        className="mt-10 cursor-pointer text-base font-semibold underline duration-300 hover:text-lg hover:text-primary lg:text-2xl lg:hover:text-[28px]"
      >
        {data.textLinkDetails}
      </Link>
    </div>
  );
};
export default PostCard;
