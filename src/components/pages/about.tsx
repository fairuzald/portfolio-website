import Link from "next/link";
import { StructuredText } from "react-datocms/structured-text";
import type { Document } from "datocms-structured-text-utils";
import { useEffect, useState } from "react";
interface SocialLinkProps {
  href: string;
  icon: JSX.Element;
  title: string;
}

interface AboutProps {
  aboutTitle: string;
  introductionSubtitle: string;
  introductionDescription: Document;
  contactSubtitle: string;
  contactDescription: Document;
  socialLinks: SocialLinkProps[];
}

const About = ({
  aboutTitle,
  introductionDescription,
  introductionSubtitle,
  contactSubtitle,
  contactDescription,
  socialLinks,
}: AboutProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);
  return (
    <section
      id="about"
      className="w-full overflow-x-hidden bg-[#22273B] px-20 pb-[13vh] pt-[15vh] md:pt-[27vh] lg:pt-[32vh]"
    >
      <div className="flex flex-wrap">
        <div
          className="2xl:px-17 mb-8 w-full px-4 text-center text-[4.6vh] font-semibold text-primary lg:text-left xl:px-10"
          data-aos="fade-down-right"
        >
          {aboutTitle}
        </div>
        <div className="2xl:px-17 w-full px-4 lg:w-1/2 xl:px-10">
          <h1
            className="mb-8 text-center text-[4.7vh] font-semibold lg:text-left"
            data-aos="zoom-out-right"
          >
            {introductionSubtitle}
          </h1>
          <p
            className="mb-16 text-[2.3vh] text-slate-200"
            data-aos-duration="600"
            data-aos="zoom-in-right"
          >
            {isMounted && <StructuredText data={introductionDescription} />}
          </p>
        </div>
        <div className="2xl:px-17 self-top w-full px-4 text-center lg:w-1/2 xl:px-10">
          <h1
            className=" mb-10 text-[4.2vh] font-semibold"
            data-aos="zoom-out-left"
          >
            {contactSubtitle}
          </h1>
          <p
            className="mb-8 text-[2.3vh]"
            data-aos-duration="600"
            data-aos="zoom-in-left"
          >
            {isMounted && <StructuredText data={contactDescription} />}{" "}
          </p>
          <div
            className="flex items-center justify-center"
            data-aos="slide-left"
            data-aos-duration="1000"
          >
            {socialLinks.map((item: SocialLinkProps, index: number) => (
              <div key={index} data-aos="slide-left" data-aos-duration="800">
                <Link
                  href={item.href}
                  rel="noreferrer"
                  target="_blank"
                  className="mx-3 flex h-[4.5vh] w-[4.5vh] items-center justify-center rounded-full text-slate-300 duration-200 ease-in-out hover:scale-[1.25] hover:bg-[#1c2338] hover:text-primary "
                >
                  <title>{item.title}</title>
                  {item.icon}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
