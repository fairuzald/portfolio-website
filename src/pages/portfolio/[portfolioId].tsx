import React, { type ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import PageHead from "@/components/PageHead";
import type { PortfolioProps } from "@/types/portfolio";
import { StructuredText } from "react-datocms/structured-text";
import type { GetStaticPropsContext } from "next";
import Navbar from "@/components/Navbar";
import MappingTagFrame from "@/components/MappingTagFrame";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper";
import ArrowCircle from "@/components/icons/ArrowCircle";

const PortfolioDetails = ({ portfolio }: { portfolio: PortfolioProps }) => {
  function SlideNextButton() {
    const swiper = useSwiper();

    return (
      <button onClick={() => swiper.slideNext()}>
        <ArrowCircle style="fill-primary w-8 h-8 lg:w-10 lg:h-10" />
      </button>
    );
  }
  function SlidePrevButton() {
    const swiper = useSwiper();

    return (
      <button onClick={() => swiper.slidePrev()}>
        <ArrowCircle style="fill-primary w-8 h-8 lg:w-10 lg:h-10 rotate-180" />
      </button>
    );
  }
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      <PageHead
        title={portfolio.title + " | Moh Fairuz Alauddin Yahya"}
        description="Yuhu"
        imageUrl="www.datocms"
        faviconDirectory="/LogoWebsite.png"
      />
      <section className="flex min-h-screen w-full flex-col items-center justify-center gap-10 overflow-hidden bg-secondary px-8 py-28  text-white md:px-20 md:py-40 lg:gap-16 lg:px-28">
        {/* Title */}
        <h2
          className="text-center text-2xl font-bold text-primary md:text-4xl lg:text-left"
          data-aos="zoom-in-down"
          data-aos-duration="600"
        >
          {portfolio.title}
        </h2>
        <div className="flex w-full flex-col gap-7 lg:flex-row">
          {/* Carousel */}
          <div
            className="relative flex w-full flex-col items-center justify-center px-4 xl:w-1/2 "
            data-aos="slide-right"
            data-aos-duration="1000"
          >
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, EffectCoverflow, Pagination]}
              className="mySwiper"
            >
              {portfolio.image.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <Image
                      alt={item.title}
                      src={item.url}
                      width={item.width}
                      height={item.height}
                      data-aos="slide-right"
                      data-aos-duration="1000"
                      className="mx-auto h-fit w-full rounded-2xl object-cover object-center lg:h-[420px] lg:w-[calc(100%-20px)]"
                    />
                  </SwiperSlide>
                );
              })}
              {/* Slider Button */}
              <div data-aos="zoom-out" className="absolute top-[50%-5px] lg:top-1/2 z-30 flex w-full -translate-y-1/2 transform items-center justify-between px-0">
                <SlidePrevButton />
                <SlideNextButton />
              </div>
            </Swiper>
          </div>
          {/* TEXT CONTENT */}
          <div
            className="flex w-full flex-col gap-4 px-4 lg:w-1/2 lg:gap-5 lg:px-6"
            data-aos="slide-left"
            data-aos-duration="1000"
          >
            {/* Description subtitle */}
            <h3 className="flex w-full flex-wrap items-center justify-center text-xl font-bold md:text-2xl lg:justify-start lg:text-3xl">
              Description
            </h3>
            <div className="flex flex-1 flex-col justify-between gap-5">
              {/* Description */}
              <p className="text-justify font-inter-r text-base leading-7 text-slate-200 lg:text-xl lg:leading-[35px]">
                {isMounted && <StructuredText data={portfolio.description} />}
              </p>
              {/* Mapping Tag */}
              <div className="flex flex-row flex-wrap items-center justify-center gap-5 font-semibold sm:gap-6 lg:justify-start">
                {portfolio &&
                  portfolio.app.map((item: string, index: number) => (
                    <MappingTagFrame key={index}>{item}</MappingTagFrame>
                  ))}
              </div>
            </div>
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

  const paths = res.data.allPortfolios.map((list: PortfolioProps) => {
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

export async function getStaticProps(ctx: GetStaticPropsContext) {
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
  const cleanData = res.data.allPortfolios.filter((item: PortfolioProps) => {
    return item.id.toString() === ctx.params?.portfolioId;
  });
  return {
    props: {
      portfolio: cleanData[0],
    },
  };
}
