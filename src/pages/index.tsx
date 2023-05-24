import { type NextPage } from "next";
import PageHead from "@/components/PageHead";
import Hero from "@/components/pages/hero";
import About from "@/components/pages/about";
import Resume from "@/components/pages/resume";
import Portfolio from "@/components/pages/portfolio";
import { type PortfolioPageProps } from "@/types/portfolio";
import { type HomePageProps } from "@/types/homePage";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import Post from "@/components/pages/post";
import type { PostInterface } from "@/types/post";

const Home: NextPage<{
  homePage: HomePageProps;
  portfolio: PortfolioPageProps[];
  post: PostInterface[]
}> = ({ homePage, portfolio, post }) => {
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
      <PageHead
        title="Fairuz Website"
        description="Yuhu"
        imageUrl="www.datocms"
        faviconDirectory="/LogoWebsite.png"
      />
          <Hero />
          <About
            aboutTitle={homePage.aboutTitle}
            introductionSubtitle={homePage.introductionSubtitle}
            introductionDescription={homePage.introductionDescription}
            contactDescription={homePage.contactDescription}
            contactSubtitle={homePage.contactSubtitle}
            socialLinks={socialLinks}
          />
          <Resume
            title={homePage.resumeTitleSection}
            description={homePage.descriptionResume}
            buttonTextCV={homePage.buttonTextCv}
            urlCV={homePage.cvUrl}
          />
          <Portfolio
            data={portfolio}
            title={homePage.portfolioTitleSection}
            description={homePage.portfolioDescription}
          />
          <Post postTitle={homePage.postTitleSection} postData={post} postDescription={homePage.postDescription} recentText={homePage.recentPostSubtitle} buttonTextViewMore={homePage.buttonTextPostMore}/>
        </>
  );
};

export default Home;
export async function getStaticProps() {
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
        homePage {
          portfolioDescription {
            value
          }
          portfolioTitleSection
          postDescription {
            value
          }
          postTitleSection
          recentPortfolioSubtitle
          recentPostSubtitle
          resumeTitleSection
          whatsappUrl
          linkedinUrl
          instagramUrl
          githubUrl
          emailUrl
          cvUrl
          introductionDescription {
            value
          }
          introductionSubtitle
          contactSubtitle
          contactDescription {
            value
          }
          buttonTextPostMore
          buttonTextPortfolioMore
          buttonTextCv
          aboutTitle
          descriptionResume {
            value
          }
          logo {
            url
            width
            title
            height
          }
        }
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
        }
        allPosts {
          title
          show
          tag
          id
          image {
            width
            url
            title
            height
          }
          description {
            value
          }
          textLinkDetails
        }
      }
      `,
      }),
    })
  ).json();

  return {
    props: {
      portfolio: res.data.allPortfolios,
      post: res.data.allPosts,
      homePage: res.data.homePage,
    },
  };
}
