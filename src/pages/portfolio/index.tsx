import { useEffect, useState } from "react";
import PageHead from "@/components/PageHead";
import type { PortfolioProps } from "@/types/portfolio";
import type { ReactElement } from "react";
import LayoutPagePreview from "@/components/LayoutPagePreview";
import { StructuredText } from "react-datocms/structured-text";
import type { Document } from "datocms-structured-text-utils";
import PortfolioCard from "@/components/PortfolioCard";
import SearchBar from "@/components/SearchBar";

const PortfolioPreview = ({
  portfolio,
  portfolioDetailsDescription,
  title,
  placeholder,
  subtitle,
}: {
  portfolio: PortfolioProps[];
  portfolioDetailsDescription: Document;
  title: string;
  placeholder: string;
  subtitle: string;
}) => {
  // State to update search field input string
  const [search, setSearch] = useState("");
  // State to update the data will be displayed on list
  const [filteredData, setFilteredData] = useState(portfolio);

  // Function to handle mismatch ui rendering
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  return (
    <>
      <PageHead
        title={title + " | Moh Fairuz Alauddin Yahya"}
        description="Yuhu"
        imageUrl="www.datocms"
        faviconDirectory="/LogoWebsite.png"
      />
      <section
        id="home"
        className="flex min-h-screen w-full flex-col justify-center gap-12 overflow-x-hidden bg-gradient-to-b from-[#22273B] to-[#1C2034] px-10 py-28 text-white md:px-20 md:py-40 lg:px-24"
      >
        {/* Title */}
        <h2
          className="text-center text-3xl font-semibold text-primary md:text-4xl lg:text-5xl"
          data-aos-duration="600"
          data-aos="zoom-in-down"
        >
          {title}
        </h2>
        {/* Description */}
        <p
          className="mx-auto w-[calc(100%-20px)] text-justify font-inter-r text-base leading-7 text-slate-200 md:w-[500px] md:text-xl lg:w-[42rem] lg:text-xl lg:leading-[35px]"
          data-aos-duration="600"
          data-aos="slide-right"
        >
          {isMounted && <StructuredText data={portfolioDetailsDescription} />}
        </p>
        {/* Search Bar */}
        <SearchBar
          type="portfolio"
          defaultData={portfolio}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          search={search}
          setSearch={setSearch}
          placeholder={placeholder}
        />
        {/* All Projects Text */}
        <h3
          className={`flex items-start  text-left text-xl font-bold md:text-2xl lg:text-3xl ${
            search !== "" && "justify-center text-center text-primary"
          } `}
        >
          {search === ""
            ? subtitle
            : `${filteredData.length} search result was found`}
        </h3>
        {/* Mapping card portfolio */}
        <div className="flex w-full flex-wrap items-stretch justify-center gap-12">
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
            portfolioTitleSection
            placeholderPortfolio
            allPortfolioSubtitle
            portfolioDetailsDescription {
              value
            }
          }
          allPortfolios {
            image {
              id
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
      title: res.data.homePage.portfolioTitleSection,
      placeholder: res.data.homePage.placeholderPortfolio,
      subtitle: res.data.homePage.allPortfolioSubtitle,
    },
  };
}
