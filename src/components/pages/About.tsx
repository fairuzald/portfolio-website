import Link from "next/link";
import { StructuredText } from "react-datocms/structured-text";
import type { Document } from "datocms-structured-text-utils";
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
  return (
    <section
      id="about"
      className="flex w-full flex-col gap-y-14 overflow-x-hidden bg-gradient-to-b from-[#1e2436] to-[#1E2436]   px-10 py-28 md:px-20 md:py-60 lg:px-36 2xl:px-40"
    >
      {/* Title */}
      <h2
        className="w-full text-center text-3xl font-semibold text-primary md:text-4xl lg:text-left lg:text-5xl"
        data-aos="fade-down-right"
      >
        {aboutTitle}
      </h2>
      <div className="flex w-full flex-wrap gap-y-12">
        {/* Introduction Section */}
        <div className="flex w-full flex-col gap-10 lg:w-1/2 lg:pr-14">
          {/* Introduction Title */}
          <h3
            className="text-center text-2xl font-semibold md:text-3xl lg:text-left lg:text-[45px]"
            data-aos="zoom-out-right"
          >
            {introductionSubtitle}
          </h3>
          {/* Introduction Description */}
          <h5
            className="break-all text-justify text-base leading-7 text-slate-200 md:text-xl lg:text-[23px] lg:leading-[35px]"
            data-aos-duration="600"
            data-aos="zoom-in-right"
          >
            <StructuredText data={introductionDescription} />
          </h5>
        </div>
        {/* Contact Section */}
        <div className="self-top flex w-full flex-col  gap-10 text-center lg:w-1/2 lg:pl-14">
          {/* Contact Title */}
          <h3
            className="text-center text-2xl font-semibold md:text-3xl lg:text-[45px]"
            data-aos="zoom-out-left"
          >
            {contactSubtitle}
          </h3>
          {/* Contact Description */}
          <h5
            className="text-center text-base leading-7 text-slate-200 md:text-xl lg:text-[23px] lg:leading-[35px]"
            data-aos-duration="600"
            data-aos="zoom-in-left"
          >
            <StructuredText data={contactDescription} />
          </h5>
          {/* Mapping Social Media Account */}
          <div
            className="mt-3 flex items-center justify-center gap-x-5 lg:gap-x-8"
            data-aos="slide-left"
            data-aos-duration="1000"
          >
            {socialLinks.map((item: SocialLinkProps, index: number) => (
              <div key={index} data-aos="slide-left" data-aos-duration="800">
                <Link
                  href={item.href}
                  rel="noreferrer"
                  target="_blank"
                  className="flex items-center justify-center rounded-full text-slate-300 duration-200 ease-in-out hover:scale-[1.25] hover:bg-[#1c2338] hover:text-primary "
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
