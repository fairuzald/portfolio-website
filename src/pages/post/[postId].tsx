import React, { type ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import type { PostInterface } from "@/types/post";
import PageHead from "@/components/PageHead";
import { StructuredText } from "react-datocms/structured-text";
import Navbar from "@/components/Navbar";

const PostDetails = ({ post }: { post: PostInterface }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  return (
    <>
      <PageHead
        title="Fairuz Website"
        description="Yuhu"
        imageUrl="www.datocms"
        faviconDirectory="/LogoWebsite.png"
      />
      <div className="flex min-h-[100vh] flex-col items-center justify-center bg-secondary pb-[8vh] pt-[9vh]">
        <div className="flex w-[75vw] flex-col xl:flex-row">
          <div className="flex w-full flex-col items-center justify-center px-6 lg:items-start xl:w-1/2">
            <p
              className="mb-[0.925vh] text-[1.6rem] font-bold text-primary md:text-[1.8rem] lg:text-[2.1rem]"
              data-aos="zoom-in-down"
              data-aos-duration="600"
            >
              {post.title}
            </p>
            <div
              className="mb-[4.17vh] flex flex-row flex-wrap items-center justify-center gap-x-[20px] font-semibold sm:gap-x-[1.5vw] lg:justify-start"
              data-aos="slide-right"
              data-aos-duration="1000"
            >
              {post.tag.map((list: string, index: number) => (
                <div
                  key={index}
                  className="flex w-fit items-center rounded-lg bg-primary px-[3.3vw] py-[0.7vh] text-center text-[0.8rem] font-semibold text-white shadow-sm shadow-primary sm:px-[0.9vw] lg:text-[0.85rem]"
                >
                  {list}
                </div>
              ))}
            </div>
            <Image
              alt={post.title}
              src={post.image.url}
              width="1000"
              height="500"
              data-aos="slide-right"
              data-aos-duration="1000"
              className="mx-auto mb-[2.78vh] max-h-[50vh] w-[auto] rounded-[2.78vh]"
            />
          </div>
          <div
            className="mb-2 flex w-full cursor-pointer flex-col items-center justify-center px-6 text-justify font-[] text-[2vh] leading-[1.8] sm:text-[2.5vh] xl:w-1/2"
            data-aos="slide-left"
            data-aos-duration="1000"
          >
            <p className="mb-[1.3vh] flex w-full flex-wrap items-center justify-center text-[1.4rem] font-bold md:text-[1.6rem] lg:text-[1.9rem] xl:justify-start">
              Description
            </p>
            <p className="text-justify text-[1rem] leading-[1.8] lg:text-[1.1rem]">
              {isMounted && <StructuredText data={post.description} />}
            </p>
          </div>
        </div>
      </div>
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

  const paths = res.data.allPosts.map((list: PostInterface) => {
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

export async function getStaticProps(ctx: any) {
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
  const cleanData = res.data.allPosts.filter((item: PostInterface) => {
    return item.id.toString() === ctx.params.postId;
  });
  return {
    props: {
      post: cleanData[0],
    },
  };
}
