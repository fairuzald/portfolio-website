import { useEffect, useState } from "react";
import PageHead from "@/components/PageHead";
import type { PortfolioProps } from "@/types/portfolio";
import SearchIcon from "@/components/icons/SearchIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import type { ReactElement } from "react";
import LayoutPagePreview from "@/components/LayoutPagePreview";
import { StructuredText } from "react-datocms/structured-text";
import type { Document } from "datocms-structured-text-utils";
import PortfolioCard from "@/components/PortfolioCard";

const PortfolioPreview = ({
  portfolio,
  portfolioDetailsDescription,
}: {
  portfolio: PortfolioProps[];
  portfolioDetailsDescription: Document;
}) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(portfolio);

  function handleSearch(search: string) {
    setSearch(search);
    const newData = portfolio.filter((itemData: PortfolioProps) => {
      if (
        itemData.title
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        itemData.app.some((item: string) =>
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
    setFilteredData(portfolio);
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
        className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#22273B] to-[#1C2034]  px-20 py-[11vh] lg:py-[18vh]"
      >
        <div className="w-full px-4">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h2
              className="mb-3  text-[4.6vh] font-semibold text-primary"
              data-aos-duration="600"
              data-aos="zoom-in-down"
            >
              Portfolio
            </h2>
            <p
              className="font-base text-justify text-[2.3vh] text-white"
              data-aos-duration="600"
              data-aos="slide-right"
            >
              {isMounted && (
                <StructuredText data={portfolioDetailsDescription} />
              )}
            </p>
          </div>
          <div
            className="mx-auto mb-12 flex w-[70vw] items-center justify-center gap-[1.5vw] rounded-[7px] bg-white py-[0.17rem] lg:w-[50vw]"
            data-aos-duration="600"
            data-aos="slide-left"
          >
            <input
              type="text"
              placeholder="Search Portfolio"
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
                <SearchIcon style={"w-[1rem] h-[1rem]"} />
              ) : (
                <CrossIcon style={"w-[1rem] h-[1rem]"} />
              )}
            </button>
          </div>
          <h1
            className={`mb-5 text-2xl font-bold ${
              search !== "" && "text-center text-primary"
            } `}
          >
            {search === ""
              ? "All Project"
              : `${filteredData.length} search result was found`}
          </h1>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center ">
          {filteredData.map((project: PortfolioProps) => (
            <PortfolioCard key={project.id} data={project} />
          ))}
        </div>
      </section>
    </>
  );
};
const dataNaNavbar = [
  { href: "/", context: "Home" },
  { href: "#home", context: "Menu Portfolio" },
  { href: "/post", context: "Menu Post" },
];

PortfolioPreview.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutPagePreview dataNavbar={dataNaNavbar}>{page}</LayoutPagePreview>
  );
};
export default PortfolioPreview;

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
            portfolioDetailsDescription {
              value
            }
          }
          allPortfolios {
            image {
              url
              title
              width
              height
            }
            title
            description {
              value
            }
            app
            id
          }
        }
        `,
      }),
    })
  ).json();

  return {
    props: {
      portfolio: res.data.allPortfolios,
      portfolioDetailsDescription:
        res.data.homePage.portfolioDetailsDescription,
    },
  };
}
