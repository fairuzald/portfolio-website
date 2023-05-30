import Link from "next/link";
import GithubIcon from "./icons/GithubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import EmailIcon from "./icons/EmailIcon";
import WhatsappIcon from "./icons/WhatsappIcon";
import InstagramIcon from "./icons/InstagramIcon";
export default function Footer() {
  const socialLinks = [
    {
      href: "https://github.com/fairuzald",
      icon: (
        <GithubIcon style="fill-current w-[18px] h-[20px] md:w-[25px] md:h-[25px]" />
      ),
      title: "Github",
    },
    {
      href: "https://www.linkedin.com/in/moh-fairuz-alauddin-yahya-b793b5232/",
      icon: (
        <LinkedInIcon style="fill-current w-[18px] h-[20px] md:w-[25px] md:h-[25px]" />
      ),
      title: "LinkedIn",
    },
    {
      href: "mailto:fairuzy210@gmail.com",
      icon: (
        <EmailIcon style="fill-current w-[18px] h-[20px] md:w-[25px] md:h-[25px]" />
      ),
      title: "Email",
    },
    {
      href: "https://instagram.com/fairuzal__",
      icon: (
        <InstagramIcon style="fill-current w-[18px] h-[20px] md:w-[25px] md:h-[25px]" />
      ),
      title: "Instagram",
    },
    {
      href: "https://wa.me/628993577066",
      icon: (
        <WhatsappIcon style="fill-current w-[18px] h-[20px] md:w-[25px] md:h-[25px]" />
      ),
      title: "WhatsApp",
    },
  ];

  return (
    <>
      <footer className="w-full bg-secondary pb-12">
        <div className="w-full border-t border-slate-700 pt-10">
          {/* Mapping Social Media */}
          <div className="flex items-center justify-center gap-3 lg:gap-5">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                rel="noreferrer"
                target="_blank"
                className="flex w-8 h-8 lg:h-10 lg:w-10 items-center justify-center rounded-full border border-slate-300 text-slate-300 duration-300 ease-in-out hover:scale-[1.2] hover:border-teal-500 hover:bg-teal-500 hover:text-white"
              >
                <title>{link.title}</title>
                {link.icon}
              </Link>
            ))}
          </div>
          {/* Text Section */}
          <p className="mt-6 text-center font-montserrat-r text-sm font-medium text-slate-500">
            2023©<span className="font-semibold text-primary"> Fairuz</span> -
            All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}
