import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import Button from "../Button";
import type { ImageProps } from "@/types/homePage";

interface HeroProps {
  typeWriterTextArray: string | string[] | undefined;
  greetingText: string;
  textButton: string;
  profilPicture: ImageProps[];
}
const Hero = ({
  typeWriterTextArray,
  greetingText,
  textButton,
  profilPicture,
}: HeroProps) => {
  return (
    <section
      id="home"
      className="flex min-h-screen w-full flex-wrap items-center justify-center overflow-hidden px-10 py-12 xl:px-32"
      style={{
        background: "linear-gradient(0.17deg, #1e2436 6.22%, #16162d 139.21%)",
      }}
    >
      {/* Picture of me */}
      <div
        className="w-full self-center lg:w-1/2"
        data-aos="flip-up"
        data-aos-offset="0"
        data-aos-transition="1000"
      >
        {profilPicture && (
          <Image
            src={profilPicture[0] ? profilPicture[0].url : ""}
            alt={profilPicture[0] ? profilPicture[0].title : ""}
            width={profilPicture[0] ? profilPicture[0].width : 0}
            height={profilPicture[0] ? profilPicture[0].height : 0}
            className="mx-auto h-[240px] w-[240px] overflow-hidden rounded-full border-opacity-50 object-contain md:h-[400px] md:w-[400px] xl:h-[500px] xl:w-[500px]"
          ></Image>
        )}
      </div>
      {/* TEXT SECTION */}
      <div className="flex flex-col gap-y-7 self-center lg:w-1/2">
        {/* Greeting text  */}
        <h3
          className="flex flex-col gap-y-5 text-xl font-[550] md:text-2xl lg:text-3xl"
          data-aos="slide-left"
          data-aos-duration="800"
        >
          {greetingText}
          {/* Text typewriter my name */}
          <span className="font-montserrat block text-3xl font-semibold leading-tight text-primary caret-black md:text-4xl lg:text-5xl">
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
        </h3>
        {/* Description Education */}
        <h4
          className="mb-2 text-[15px] font-medium leading-relaxed text-slate-400 md:text-xl lg:text-xl"
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
        </h4>
        {/* Description interest */}
        <h5
          className="mb-3 text-sm font-medium leading-relaxed text-slate-500 md:text-lg lg:text-lg"
          data-aos="slide-left"
          data-aos-duration="1200"
        >
          Interest in{" "}
          <span className="text-white text-opacity-80">
            Software Engineering{" "}
          </span>
          and{" "}
          <span className="text-white text-opacity-80">Web Development</span>
        </h5>
        {/* Button */}
        <div data-aos="fade-up-left" data-aos-duration="200">
          <Link scroll={false} href="#about">
            <Button color="solid">{textButton}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;
