import { type ReactElement, useEffect, useState } from "react";
import type { PostProps } from "@/types/post";
import PageHead from "@/components/PageHead";
import { StructuredText } from "react-datocms/structured-text";
import type { Document } from "datocms-structured-text-utils";
import LayoutPagePreview from "@/components/LayoutPagePreview";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";

const PostDetail = ({
  title,
  subtitle,
  placeholder,
  postDetailsDescription,
  posts,
}: {
  title: string;
  subtitle: string;
  placeholder: string;
  postDetailsDescription: Document;
  posts: PostProps[];
}) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(posts);

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
        className="flex min-h-screen w-full flex-col justify-center gap-12 overflow-x-hidden bg-gradient-to-b from-secondary to-[#20233a] px-10 py-28 md:px-20 md:py-40 lg:px-24"
      >
        {/* Title */}
        <h2
          className="text-center text-3xl font-semibold text-primary md:text-4xl lg:text-5xl"
          data-aos-duration="600"
          data-aos="zoom-in-down"
        >
          {title}
        </h2>
        <p
          className="mx-auto w-[calc(100%-20px)] text-justify font-inter-r text-base leading-7 text-slate-200 md:w-[500px] md:text-xl lg:w-[42rem] lg:text-xl lg:leading-[35px]"
          data-aos-duration="600"
          data-aos="slide-right"
        >
          {isMounted && <StructuredText data={postDetailsDescription} />}
        </p>
        <SearchBar
          type="post"
          search={search}
          setSearch={setSearch}
          placeholder={placeholder}
          defaultData={posts}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
        <h3
          className={`flex items-start lg:ml-20 text-left text-xl font-bold md:text-2xl lg:text-3xl ${
            search !== "" && "justify-center text-center text-primary"
          } `}
        >
          {search === ""
            ? subtitle
            : `${filteredData.length} search result was found`}
        </h3>
        <div className="flex w-full flex-wrap items-stretch justify-center gap-14 lg:gap-20">
          {filteredData.map((postData: PostProps) => (
            <PostCard data={postData} key={postData.id} />
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
                postTitleSection
                placeholderPost
                allPostSubtitle
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
      title: res.data.homePage.postTitleSection,
      placeholder: res.data.homePage.placeholderPost,
      subtitle: res.data.homePage.allPostSubtitle,
    },
  };
}
