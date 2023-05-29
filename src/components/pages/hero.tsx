import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";
interface HeroProps {
  typeWriterTextArray: string | string[] | undefined;
  greetingText: string;
  textButton: string;
}
const Hero = ({
  typeWriterTextArray,
  greetingText,
  textButton,
}:HeroProps) => {
  return (
    <section
      id="home"
      className="flex min-h-screen w-full flex-wrap items-center justify-center overflow-x-hidden xl:px-20"
      style={{
        background: "linear-gradient(0.17deg, #1e2436 6.22%, #16162d 139.21%)",
      }}
    >
      <div
        className="mb-4 self-center px-6 pb-10 md:mb-0 md:px-0 lg:w-1/2"
        data-aos="flip-up"
        data-aos-offset="0"
        data-aos-transition="1000"
      >
        <div className="m-auto mt-10 h-[50vw] w-[50vw] overflow-hidden rounded-full border-opacity-50 md:mt-0 md:h-[35vw] md:w-[35vw] xl:h-[25vw] xl:w-[25vw]">
          <Image
            src="/profil.png"
            alt="Fairuz"
            width="400"
            height="400"
            className="mx-auto h-[50vw] object-cover md:h-[35vw] xl:h-[25vw]"
          ></Image>
        </div>
      </div>
      <div className="self-center px-2 lg:w-1/2 2xl:px-10">
        <h1
          className="mb-2 text-[2.3vh] font-[550] lg:text-[2.8vh]"
          data-aos="slide-left"
          data-aos-duration="800"
        >
          {greetingText}
          <span className="font-montserrat mb-2 mt-3 block text-[4vh] font-semibold leading-tight text-primary caret-black lg:text-[4.5vh]">
            {typeWriterTextArray && (
              <Typewriter
                options={{
                  strings: typeWriterTextArray,
                  autoStart: true,
                  loop: true,
                  delay: 100,
                  deleteSpeed: 50,
                }}
              />
            )}
          </span>
        </h1>
        <h2
          className="mb-8 mt-3 text-[2.1vh] font-medium leading-relaxed text-slate-400 lg:text-lg"
          data-aos="slide-left"
          data-aos-duration="1000"
        >
          Undergraduate{" "}
          <span className="text-white text-opacity-80">
            Informatics Engineering{" "}
          </span>
          Student in{" "}
          <span className="text-white text-opacity-80">
            Bandung Institute of Technology
          </span>
        </h2>
        <h2
          className="mb-10 text-[1.8vh] font-medium leading-relaxed text-slate-500 lg:text-lg"
          data-aos="slide-left"
          data-aos-duration="1200"
        >
          Interest in{" "}
          <span className="text-white text-opacity-80">
            Software Engineering{" "}
          </span>
          and{" "}
          <span className="text-white text-opacity-80">Web Development</span>
        </h2>
        <div data-aos="fade-up-left" data-aos-duration="200">
          <button className="rounded-full bg-primary px-[3vh] py-[1.8vh] text-[1.8vh] font-semibold text-white shadow-md shadow-primary transition duration-300 ease-in-out hover:scale-110 hover:opacity-80 hover:shadow-lg  lg:px-8 lg:py-3 xl:text-[2.3vh]">
            <Link scroll={false} href="#about">
              {textButton}
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
