import Link from "next/link";
import Image from "next/image";
import "../aos/dataaos";
import type { PostInterface } from "@/types/post";

export default function Post({ pageData }: { pageData: PostInterface[] }) {
  return (
    <>
      <section
        id="post"
        className="bg-gradient-to-b from-[#1C2034] to-[#22273B] pb-20 pt-36"
      >
          <div className="w-full px-4">
            <div className="mx-auto mb-16 max-w-xl text-center">
              <h2
                className="mb-3 text-[4.6vh] font-semibold text-primary"
                data-aos="zoom-out-down"
              >
                Post
              </h2>
              <p
                className="font-base text-justify text-[2.3vh] text-white"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                Hello Everyone, Here is a post related to the writing I have
                made, click read more to see the details and click view more to
                see another complete post
              </p>
            </div>
          </div>
          <div className="mx-auto flex w-full flex-wrap justify-center px-2 xl:w-10/12">
            <h1
              className="mb-4 flex w-full justify-center text-[3.6vh] font-bold lg:justify-start"
              data-aos="zoom-out-right"
            >
              Recent Post
            </h1>{" "}
            {pageData.slice(0, 2).map((post: PostInterface) => (
              <div
                className="mb-12 w-full p-6 md:w-1/2"
                key={post.id}
                data-aos="flip-left"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                <div className="rounded-md shadow-md ">
                  <Image
                    src={post.image.url}
                    alt={post.title}
                    width="1000"
                    height="500"
                    className="mb-[1.38vh] w-full"
                  />
                </div>
                <div className="mt-[0.92vh] flex flex-row flex-wrap justify-start  gap-x-[4vw] sm:gap-x-[0.78vw]">
                  {post.app.map((list: string, index: number) => (
                    <div
                      key={index}
                      className="mt-3 flex w-fit items-center rounded-lg bg-primary px-[3vw] py-[0.55vh] text-center text-[1.5vh] font-medium text-white shadow-sm  shadow-primary sm:px-[0.7vw] lg:text-[2vh]"
                    >
                      {list}
                    </div>
                  ))}
                </div>
                <h2 className="mb-3 mt-5 truncate text-[2.6vh] text-xl font-semibold">
                  {post.title}
                </h2>
                <p className="mb-8 line-clamp-3 text-[2.1vh] font-medium text-slate-300">
                  {post.description}{" "}
                  <a href={post.link} rel="noreferrer" target="_blank">
                    link
                  </a>{" "}
                  to the solution. thank you!
                </p>
                <Link
                  href={`post/${post.id.toString()}`}
                  className="mt-10 cursor-pointer text-[2.4vh] font-semibold underline duration-300 hover:text-lg hover:text-primary"
                >
                  Read More...
                </Link>
              </div>
            ))}
            <div data-aos="zoom-in" data-aos-duration="200">
              <button className="rounded-full bg-gradient-to-br from-primary to-primary px-[3vh] py-[1.8vh] text-[1.8vh]  font-bold text-white shadow-md shadow-primary transition duration-300  ease-in-out hover:scale-110 hover:from-[#11e0a5] hover:to-[#5430e2] hover:opacity-80 hover:shadow-xl  lg:px-8 lg:py-3 xl:text-[2.3vh]">
                <Link href="/post">View More Post</Link>
              </button>
            </div>
          </div>
      </section>
    </>
  );
}
