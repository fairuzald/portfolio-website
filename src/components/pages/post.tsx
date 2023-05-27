import Link from "next/link";
import Image from "next/image";
import type { PostProps } from "@/types/post";
import type { NextPage } from "next";
import { StructuredText } from "react-datocms/structured-text";
import type { Document } from "datocms-structured-text-utils";
import { useEffect, useState } from "react";

interface PostPageProps {
  title: string;
  recentText: string;
  description: Document;
  postData: PostProps[];
  buttonText: string;
}

const Post: NextPage<PostPageProps> = ({
  title,
  recentText,
  description,
  postData,
  buttonText,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  return (
    <section
      id="post"
      className="w-full bg-gradient-to-b from-[#1C2034] to-[#22273B] px-20 pb-20 pt-36"
    >
      <div className="w-full px-4">
        <div className="mx-auto mb-16 max-w-xl text-center">
          <h2
            className="mb-3 text-[4.6vh] font-semibold text-primary"
            data-aos="zoom-out-down"
          >
            {title}
          </h2>
          <p
            className="font-base text-justify text-[2.3vh] text-white"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            {isMounted && <StructuredText data={description} />}
          </p>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-wrap justify-center px-2 xl:w-10/12">
        <h1
          className="mb-4 flex w-full justify-center text-[3.6vh] font-bold lg:justify-start"
          data-aos="zoom-out-right"
        >
          {recentText}
        </h1>
        {postData.slice(0, 2).map((post: PostProps) => (
          <div
            className="mb-12 w-full p-6 md:w-1/2"
            key={post.id}
            data-aos="flip-left"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <div className="rounded-md shadow-md ">
              <Image
                src={post.image.url}
                alt={post.title}
                width="1000"
                height="500"
                className="mb-[1.38vh] w-full"
              />
            </div>
            <div className="mt-[0.92vh] flex flex-row flex-wrap justify-start  gap-x-[4vw] sm:gap-x-[0.78vw]">
              {post.tag.map((list: string, index: number) => (
                <div
                  key={index}
                  className="mt-3 flex w-fit items-center rounded-lg bg-primary px-[3vw] py-[0.55vh] text-center text-[1.5vh] font-medium text-white shadow-sm  shadow-primary sm:px-[0.7vw] lg:text-[2vh]"
                >
                  {list}
                </div>
              ))}
            </div>
            <h2 className="mb-3 mt-5 truncate text-[2.6vh] text-xl font-semibold">
              {post.title}
            </h2>
            <p className="mb-8 line-clamp-3 text-[2.1vh] font-medium text-slate-300">
              {isMounted && <StructuredText data={post.description} />}
            </p>
            <Link
              href={`post/${post.id.toString()}`}
              className="mt-10 cursor-pointer text-[2.4vh] font-semibold underline duration-300 hover:text-lg hover:text-primary"
            >
              {post.textLinkDetails}
            </Link>
          </div>
        ))}
        <div data-aos="zoom-in" data-aos-duration="200">
          <button className="rounded-full bg-gradient-to-br from-primary to-primary px-[3vh] py-[1.8vh] text-[1.8vh]  font-bold text-white shadow-md shadow-primary transition duration-300  ease-in-out hover:scale-110 hover:from-[#11e0a5] hover:to-[#5430e2] hover:opacity-80 hover:shadow-xl  lg:px-8 lg:py-3 xl:text-[2.3vh]">
            <Link href="/post">{buttonText}</Link>
          </button>
        </div>
      </div>
    </section>
  );
};
export default Post;
