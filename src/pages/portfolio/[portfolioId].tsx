import React from "react";
import Image from "next/image";
import "@/aos/dataaos";
import PageHead from "@/components/PageHead";


export default function PortfolioDetails({ pageData } : { pageData: PortfolioInterface  }) {
  const data = pageData;
  return (
    <>
      <PageHead
        title="Fairuz Website"
        description="Yuhu"
        imageUrl="www.datocms"
        faviconDirectory="/LogoWebsite.png"
      />
      <div className="flex flex-col items-center min-h-[100vh] pt-[11vh] lg:pt-[20vh] pb-[8vh] bg-gradient-to-b from-[#1C2036] to-[#22273B]">
        <p
          className="text-center px-10 w-full flex-wrap text-primary mb-[0.925vh] font-bold text-[1.6rem] md:text-[1.8rem] lg:text-[2.1rem]"
          data-aos="zoom-in-down"
          data-aos-duration="600"
        >
          {data.title}
        </p>
        <div className="flex flex-wrap w-full m-auto justify-center">
          <div
            className="w-full xl:w-6/12 px-10 py-10 flex flex-col items-center justify-center "
            data-aos="slide-right"
            data-aos-duration="1000"
          >
            <Image
              alt="Just Do List!"
              src={`/${data.image}`}
              width="1000"
              height="500"
              className="w-[auto] max-h-[50vh] mx-auto rounded-[2.78vh] mb-[2.78vh]"
            />
          </div>
          <div
            className="w-full xl:w-5/12 px-6 py-10 flex flex-col"
            data-aos="slide-left"
            data-aos-duration="1000"
          >
            <p className="flex w-full justify-center items-center xl:justify-start flex-wrap mb-[1.3vh] font-bold text-[1.4rem] md:text-[1.6rem] lg:text-[1.9rem]">
              Description
            </p>
            <div className="text-justify leading-[1.8] text-[1rem] lg:text-[1.1rem]">
              <p>{data.description}</p>
            </div>
            <div className="flex flex-row flex-wrap  justify-center xl:justify-start gap-x-[20px] xl:mt-[11vh] mt-[4.17vh] font-semibold sm:gap-x-[1.5vw]">
              {data &&
                data.app.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center text-center text-white py-[0.7vh] sm:px-[0.9vw] w-fit px-[3.3vw] rounded-lg font-semibold text-[0.8rem] lg:text-[0.85rem] bg-primary shadow-primary shadow-sm mb-4"
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
}

const HOMEPAGE_QUERY = `query MyQuery {
  allPortfolios {
    id
    title
    description
    image
    app
  }
}
`;

export async function getStaticPaths() {
  // Request & response data cms
  const data = await request({
    query: HOMEPAGE_QUERY,
  });

  const paths = data.allPortfolios.map((list: PortfolioInterface) => {
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
  // Request & response data cms
  const data = await request({
    query: HOMEPAGE_QUERY,
  });

  const pageDataFiltered = data.allPortfolios.filter((item: PortfolioInterface) => {
    return item.id.toString() === ctx.params.portfolioId;
  });

  return {
    props: {pageData: pageDataFiltered[0]},
  };
}

// export async function getStaticProps(ctx: any) {
//   const { params } = ctx;
//   const req = await fetch("https://graphql.datocms.com/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
//     },
//     body: JSON.stringify({
//       query: `
//       {
//         allPortfolios {
//           id
//           title
//           description
//           image
//           app
//         }
//       }
//       `,
//     }),
//   });
//   const res = await req.json();
//   console.log(res.data.allPortfolios)

//   const pageData = res.data.allPortfolios.filter((item: any) => {
//     return item.id.toString() === params.portfolioId;
//   });
//   console.log(res);
//   return {
//     props: {
//       portfolio: pageData[0],
//     }, // will be passed to the page component as props
//   };
// }
