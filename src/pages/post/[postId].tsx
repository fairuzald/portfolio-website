import React, { type ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import type { PostProps } from "@/types/post";
import PageHead from "@/components/PageHead";
import { StructuredText } from "react-datocms/structured-text";
import type { GetStaticPropsContext } from "next";
import Navbar from "@/components/Navbar";
import MappingTagFrame from "@/components/MappingTagFrame";

const PostDetails = ({ post }: { post: PostProps }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  return (
    <>
      <PageHead
        title={post.title + " | Moh Fairuz Alauddin Yahya"}
        description="Yuhu"
        imageUrl="www.datocms"
        faviconDirectory="/LogoWebsite.png"
      />
      <section className="flex min-h-screen w-full flex-col justify-center gap-6 overflow-hidden bg-secondary px-8  py-28 text-white md:px-20 md:py-40 lg:px-28">
        {/* Title */}
        <h2
          className="text-center text-2xl font-bold text-primary md:text-4xl lg:text-left"
          data-aos="zoom-in-down"
          data-aos-duration="600"
        >
          {post.title}
        </h2>
        {/* Mapping Tag */}
        <div
          className="flex flex-row flex-wrap items-center justify-center gap-x-5 font-semibold sm:gap-x-6 lg:justify-start"
          data-aos="slide-right"
          data-aos-duration="1000"
        >
          {post.tag.map((list: string, index: number) => (
            <MappingTagFrame key={index}>{list}</MappingTagFrame>
          ))}
        </div>
        {/* SETUP CONTENT */}
        <div className="flex w-full flex-col gap-5 lg:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-5 px-6 lg:w-1/2 lg:items-start">
            {/* Image */}
            <Image
              alt={post.title}
              src={post.image.url}
              width={post.image.width}
              height={post.image.height}
              data-aos="slide-right"
              data-aos-duration="1000"
              className="mx-auto h-fit w-full rounded-2xl object-cover object-center lg:w-[calc(100%-20px)]"
            />
          </div>
          {/* Description */}
          <div
            className="flex w-full cursor-pointer flex-col gap-4 px-4 lg:w-1/2 lg:gap-5 lg:px-6"
            data-aos="slide-left"
            data-aos-duration="1000"
          >
            <h3 className="flex w-full flex-wrap items-center justify-center text-xl font-bold md:text-2xl lg:justify-start lg:text-3xl">
              Description
            </h3>
            <p className="text-justify font-inter-r text-base leading-7 text-slate-200 lg:text-xl lg:leading-[35px]">
              {isMounted && <StructuredText data={post.description} />}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
const data = [
  { href: "/", context: "Home" },
  { href: "/portfolio", context: "Menu Portfolio" },
  { href: "/post", context: "Menu Post" },
];
PostDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <div
      className={`absolute inset-0 flex w-full flex-col scroll-smooth`}
      style={{ scrollBehavior: "smooth" }}
    >
      <Navbar data={data} />
      <main className="flex-auto">{page}</main>
    </div>
  );
};
export default PostDetails;
export async function getStaticPaths() {
  // Request & response data cms
  const res = await (
    await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.CMS_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
        {
            homePage {
                postDetailsDescription {
                  value
                }
            }
            allPosts {
                id
                show
                tag
                textLinkDetails
                title
                image {
                  width
                  id
                  height
                  title
                  url
                }
                description {
                  value
                }
            }
          }
        `,
      }),
    })
  ).json();

  const paths = res.data.allPosts.map((list: PostProps) => {
    return {
      params: {
        postId: `${list.id}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const res = await (
    await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer 8d829e204d4422697be4181a3febfa",
      },
      body: JSON.stringify({
        query: `
        {
            homePage {
                postDetailsDescription {
                  value
                }
            }
            allPosts {
                id
                show
                tag
                textLinkDetails
                title
                image {
                  width
                  id
                  height
                  title
                  url
                }
                description {
                  value
                }
            }
          }
          `,
      }),
    })
  ).json();
  const cleanData = res.data.allPosts.filter((item: PostProps) => {
    return item.id.toString() === ctx.params?.postId;
  });
  return {
    props: {
      post: cleanData[0],
    },
  };
}
