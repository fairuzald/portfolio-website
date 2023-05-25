import React, { type ReactElement } from "react";
import Image from "next/image";
import PageHead from "@/components/PageHead";
import type { PortfolioPageProps } from "@/types/portfolio";
import { StructuredText } from "react-datocms/structured-text";
import Navbar from "@/components/Navbar";

const PortfolioDetails = ({ portfolio }: { portfolio: PortfolioPageProps }) => {
  return (
    <>
      <PageHead
        title={portfolio.title + "| Fairuz Website"}
        description="Yuhu"
        imageUrl="www.datocms"
        faviconDirectory="/LogoWebsite.png"
      />
      <div className="flex min-h-[100vh] w-full flex-col items-center overflow-x-hidden bg-gradient-to-b from-[#1C2036] to-[#22273B] pb-[8vh] pt-[11vh] lg:pt-[20vh]">
        <p
          className="mb-[0.925vh] w-full flex-wrap px-10 text-center text-[1.6rem] font-bold text-primary md:text-[1.8rem] lg:text-[2.1rem]"
          data-aos="zoom-in-down"
          data-aos-duration="600"
        >
          {portfolio.title}
        </p>
        <div className="m-auto flex w-full flex-wrap justify-center">
          <div
            className="flex w-full flex-col items-center justify-center px-10 py-10 xl:w-6/12 "
            data-aos="slide-right"
            data-aos-duration="1000"
          >
            <Image
              src={portfolio.image[0]?.url || ""}
              alt={portfolio.image[0]?.title || ""}
              width={1000}
              height={500}
            />
          </div>
          <div
            className="flex w-full flex-col px-6 py-10 xl:w-5/12"
            data-aos="slide-left"
            data-aos-duration="1000"
          >
            <p className="mb-[1.3vh] flex w-full flex-wrap items-center justify-center text-[1.4rem] font-bold md:text-[1.6rem] lg:text-[1.9rem] xl:justify-start">
              Description
            </p>
            <div className="text-justify text-[1rem] leading-[1.8] lg:text-[1.1rem]">
              <StructuredText data={portfolio.description} />
            </div>
            <div className="mt-[4.17vh] flex flex-row  flex-wrap justify-center gap-x-[20px] font-semibold sm:gap-x-[1.5vw] xl:mt-[11vh] xl:justify-start">
              {portfolio &&
                portfolio.app.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="mb-4 flex w-fit items-center rounded-lg bg-primary px-[3.3vw] py-[0.7vh] text-center text-[0.8rem] font-semibold text-white shadow-sm shadow-primary sm:px-[0.9vw] lg:text-[0.85rem]"
                  >
                    {item}
                  </div>
                ))}
            </div>
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
PortfolioDetails.getLayout = function getLayout(page: ReactElement) {
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
export default PortfolioDetails;
export async function getStaticPaths() {
  // Request & response data cms
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

  const paths = res.data.allPortfolios.map((list: PortfolioPageProps) => {
    return {
      params: {
        portfolioId: `${list.id}`,
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
        Authorization: `Bearer ${process.env.CMS_API_TOKEN}`,
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
  const cleanData = res.data.allPortfolios.filter(
    (item: PortfolioPageProps) => {
      return item.id.toString() === ctx.params.portfolioId;
    }
  );
  return {
    props: {
      portfolio: cleanData[0],
    },
  };
}
