import Link from "next/link";
import type { PostProps } from "@/types/post";
import type { NextPage } from "next";
import { StructuredText } from "react-datocms/structured-text";
import type { Document } from "datocms-structured-text-utils";
import { useEffect, useState } from "react";
import PostCard from "../PostCard";

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
          <PostCard key={post.id} data={post} />
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
