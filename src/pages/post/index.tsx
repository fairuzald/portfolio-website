import Link from "next/link";
import Image from "next/image";
import { type ReactElement, useEffect, useState } from "react";
import type { PostInterface } from "@/types/post";
import PageHead from "@/components/PageHead";
import SearchIcon from "@/components/icons/SearchIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import { StructuredText } from "react-datocms/structured-text";
import type { Document } from "datocms-structured-text-utils";
import LayoutPagePreview from "@/components/LayoutPagePreview";

const PostDetail = ({
  postDetailsDescription,
  posts,
}: {
  postDetailsDescription: Document;
  posts: PostInterface[];
}) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(posts);

  function handleSearch(search: string) {
    setSearch(search);
    const newData = posts.filter((itemData: PostInterface) => {
      if (
        itemData.title
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        itemData.tag.some((item: string) =>
          item.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      ) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredData(newData);
  }

  function handleCancelSearch() {
    setSearch("");
    setFilteredData(posts);
  }
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
      <section
        id="home"
        className="min-h-[100vh] bg-gradient-to-b from-secondary to-[#20233a]  px-20 pb-20 pt-36"
      >
        <div className="w-full px-4">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <h2
              className="mb-3 text-[4.6vh] font-semibold text-primary"
              data-aos-duration="600"
              data-aos="zoom-in-down"
            >
              Post
            </h2>
            <p
              className="font-base text-justify text-[2.3vh] text-white"
              data-aos-duration="600"
              data-aos="slide-right"
            >
              {isMounted && <StructuredText data={postDetailsDescription} />}
            </p>
          </div>
          <div
            className="mx-auto mb-12 flex w-[70vw] items-center justify-center gap-[1.5vw] rounded-[7px] bg-white py-[0.17rem] lg:w-[50vw]"
            data-aos-duration="600"
            data-aos="slide-left"
          >
            <input
              type="text"
              placeholder="Search Post"
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
              value={search}
              className="w-[60vw] bg-transparent text-center font-semibold text-black outline-none lg:w-[40vw]"
            ></input>
            <button
              onClick={() => {
                search === "" ? handleSearch(search) : handleCancelSearch();
              }}
            >
              {search === "" ? (
                <SearchIcon style="w-[1rem] h-[1rem]" />
              ) : (
                <CrossIcon style="w-[1rem] h-[1rem]" />
              )}
            </button>
          </div>
          <h1
            className={`mb-5 text-2xl font-bold ${
              search !== "" && "text-center text-primary"
            } `}
          >
            {search === ""
              ? "All Posts"
              : `${filteredData.length} search result was found`}
          </h1>
        </div>
        <div className="mx-auto flex w-full flex-wrap justify-center px-2 xl:w-10/12">
          {filteredData.map((item: PostInterface) => (
            <div
              key={item.id}
              className="mb-12 w-full p-6 md:w-1/2 "
              data-aos-duration="600"
              data-aos="zoom-in-down"
            >
              <div className="rounded-md shadow-md ">
                <Image
                  src={item.image.url}
                  alt={item.title}
                  width="1000"
                  height="500"
                  className="mb-[1.38vh] w-full"
                />
              </div>
              <div className="mt-[0.92vh] flex flex-row flex-wrap justify-start  gap-x-[4vw] sm:gap-x-[0.78vw]">
                {item.tag.map((list: string, index: number) => (
                  <div
                    key={index}
                    className="mt-3 flex w-fit items-center rounded-lg bg-primary px-[3vw] py-[0.55vh] text-center text-[1.5vh] font-medium text-white shadow-sm  shadow-primary sm:px-[0.7vw] lg:text-[2vh]"
                  >
                    {list}
                  </div>
                ))}
              </div>
              <h2 className="mb-3 mt-5 truncate text-[2.6vh] text-xl font-semibold">
                {item.title}
              </h2>
              <p className="mb-8 line-clamp-3 text-[2.1vh] font-medium text-slate-300">
                {isMounted && <StructuredText data={item.description} />}
              </p>
              <Link
                href={`post/${item.id.toString()}`}
                className="hover:scale-200 mt-10  cursor-pointer text-[2.4vh] font-semibold underline duration-300 hover:text-lg hover:text-primary"
              >
                {item.textLinkDetails}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
const dataNaNavbar = [
  { href: "/", context: "Home" },
  { href: "/portfolio", context: "Menu Portfolio" },
  { href: "#home", context: "Menu Post" },
];

PostDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutPagePreview dataNavbar={dataNaNavbar}>{page}</LayoutPagePreview>
  );
};
export default PostDetail;
export async function getStaticProps() {
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

  return {
    props: {
      posts: res.data.allPosts,
      postDetailsDescription: res.data.homePage.postDetailsDescription,
    },
  };
}
