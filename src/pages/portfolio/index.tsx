import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import PageHead from "@/components/PageHead";
import type { PortfolioPageProps } from "@/types/portfolio";
import SearchIcon from "@/components/icons/SearchIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import type { ReactElement } from "react";
import LayoutPagePreview from "@/components/LayoutPagePreview";
import { StructuredText } from "react-datocms/structured-text";

const PortfolioPreview = ({
  portfolio,
}: {
  portfolio: PortfolioPageProps[];
}) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(portfolio);

  function handleSearch(search: string) {
    setSearch(search);
    const newData = portfolio.filter((itemData: PortfolioPageProps) => {
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
        id="#"
        className="min-h-screen w-full bg-gradient-to-b from-[#22273B] to-[#1C2034]  px-20 py-[11vh] lg:py-[18vh]"
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
              Here are some of the projects I have made. Regarding other project
              details, you can see via the view more button under the project
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
          {filteredData.map((project: PortfolioPageProps) => (
            <div
              role="button"
              key={project.id}
              className="w-full px-4 duration-300 hover:scale-[1.05] hover:text-primary lg:w-1/2 xl:w-1/3"
            >
              <Link
                href="portfolio/[portfolioId]"
                as={`portfolio/${project.id.toString()}`}
              >
                <div
                  className="mb-10 h-fit overflow-hidden rounded-2xl bg-back shadow-lg"
                  data-aos-duration="600"
                  data-aos="zoom-in-down"
                >
                  <Image
                    src={project.image[0] ? project.image[0].url : ""}
                    alt={project.image[0] ? project.image[0]?.title : ""}
                    className="mb-[1.38vh] h-[270px] w-full"
                    width="1000"
                    height="500"
                  />
                  <div className="px-6 py-8">
                    <h3 className="mb-3 block truncate text-[2.67vh] font-semibold">
                      {project.title}
                    </h3>
                    <p className="mb-5 line-clamp-3 text-[2.21vh] font-medium text-slate-400">
                      {isMounted && 
                      
                      <StructuredText data={project.description} />
                      }
                    </p>
                    <div className="mb-[0.92vh] flex flex-row flex-wrap justify-start  gap-x-[4vw] sm:gap-x-[0.78vw]">
                      {project.app.length > 4
                        ? [...project.app]
                            .slice(0, 3)
                            .concat(["..."])
                            .map((list: string, index: number) => (
                              <div
                                key={index}
                                className="mb-3 flex w-fit items-center rounded-lg bg-primary px-[3vw] py-[0.55vh] text-center text-[1.5vh] font-medium text-white shadow-sm  shadow-primary sm:px-[0.7vw] lg:text-[2vh]"
                              >
                                {list}
                              </div>
                            ))
                        : project.app.map((list: string, index: number) => (
                            <div
                              key={index}
                              className="mb-3 flex w-fit items-center rounded-lg bg-primary px-[3vw] py-[0.55vh] text-center text-[1.5vh] font-medium text-white shadow-sm  shadow-primary sm:px-[0.7vw] lg:text-[2vh]"
                            >
                              {list}
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
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
  { href: "#", context: "Menu Portfolio" },
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
        Authorization: "Bearer 8d829e204d4422697be4181a3febfa",
      },
      body: JSON.stringify({
        query: `
        {
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
    },
  };
}
