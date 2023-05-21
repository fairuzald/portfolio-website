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
      icon: <GithubIcon />,
      title: "Github",
    },
    {
      href: "https://www.linkedin.com/in/moh-fairuz-alauddin-yahya-b793b5232/",
      icon: <LinkedInIcon />,
      title: "LinkedIn",
    },
    {
      href: "mailto:fairuzy210@gmail.com",
      icon: <EmailIcon />,
      title: "Email",
    },
    {
      href: "https://instagram.com/fairuzal__",
      icon: <InstagramIcon />,
      title: "Instagram",
    },
    {
      href: "https://wa.me/628993577066",
      icon: <WhatsappIcon />,
      title: "WhatsApp",
    },
  ];

  return (
    <>
      <footer className="bg-secondary pb-12 w-full">
          <div className="w-full border-t border-slate-700 pt-10">
            <div className="flex items-center justify-center">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  rel="noreferrer"
                  target="_blank"
                  className="mr-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-300 duration-300 ease-in-out hover:scale-[1.2] hover:border-teal-500 hover:bg-teal-500 hover:text-white"
                >
                  <title>{link.title}</title>
                  {link.icon}
                </Link>
              ))}
            </div>
            <p className="mt-6 font-montserrat-r text-center text-sm font-medium text-slate-500">
              2023©<span className="text-primary font-semibold"> Fairuz</span> -
              All Rights Reserved
            </p>
          </div>
      </footer>
    </>
  );
}
