import { type ReactElement, useEffect, useState } from "react";
import type { PostProps } from "@/types/post";
import PageHead from "@/components/PageHead";
import SearchIcon from "@/components/icons/SearchIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import { StructuredText } from "react-datocms/structured-text";
import type { Document } from "datocms-structured-text-utils";
import LayoutPagePreview from "@/components/LayoutPagePreview";
import PostCard from "@/components/PostCard";

const PostDetail = ({
  postDetailsDescription,
  posts,
}: {
  postDetailsDescription: Document;
  posts: PostProps[];
}) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(posts);

  function handleSearch(search: string) {
    setSearch(search);
    const newData = posts.filter((itemData: PostProps) => {
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
          {filteredData.map((postData: PostProps) => (
           <PostCard data={postData} key={postData.id}/>
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

  return {
    props: {
      posts: res.data.allPosts,
      postDetailsDescription: res.data.homePage.postDetailsDescription,
    },
  };
}
