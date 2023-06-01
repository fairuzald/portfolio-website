import Link from "next/link";
import type { PostProps } from "@/types/post";
import { StructuredText } from "react-datocms/structured-text";
import type { Document } from "datocms-structured-text-utils";
import { useEffect, useState } from "react";
import PostCard from "../PostCard";
import Button from "../Button";

interface PostPageProps {
  title: string;
  recentText: string;
  description: Document;
  postData: PostProps[];
  buttonText: string;
}

const Post = ({
  title,
  recentText,
  description,
  postData,
  buttonText,
}: PostPageProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  return (
    <section
      id="post"
      className="flex w-full flex-col items-center justify-center gap-10 bg-gradient-to-b from-[#1C2034] to-[#22273B] px-10 py-28 md:px-20 md:py-60 md:pt-20 lg:px-28 2xl:px-36"
    >
      {/* Description and Title Post Section */}
      <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-12 text-center">
        {/* Title Post */}
        <h2
          className="text-center text-3xl font-semibold text-primary md:text-4xl lg:text-5xl"
          data-aos="zoom-out-down"
        >
          {title}
        </h2>
        {/* Description Post */}
        <p
          className="text-justify font-inter-r text-base leading-7 text-slate-200 md:text-xl lg:text-xl lg:leading-[35px]"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          {isMounted && <StructuredText data={description} />}
        </p>
      </div>
      {/* Recent Text */}
      <h3
        className="mb-3 mr-auto mt-6 lg:px-10 flex items-start justify-start text-left text-xl font-bold md:text-2xl lg:text-3xl"
        data-aos="zoom-out-right"
      >
        {recentText}
      </h3>
      {/* Mapping postCard */}
      <div className="flex flex-wrap items-stretch justify-center gap-12 2xl:gap-14">
        {postData.slice(0, 2).map((post: PostProps) => (
          <PostCard key={post.id} data={post} />
        ))}
      </div>
      {/* Button  */}
      <div
        className="items-center- mt-8 flex w-full justify-center "
        data-aos="zoom-in"
        data-aos-duration="200"
      >
        <Link href="/post">
          <Button color="gradient">{buttonText}</Button>
        </Link>
      </div>
    </section>
  );
};
export default Post;
