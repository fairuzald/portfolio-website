import { type NextPage } from "next";
import PageHead from "@/components/PageHead";
import { type PortfolioProps } from "@/types/portfolio";
import type { BubbleExperienceProps, HomePageProps } from "@/types/homePage";
import GithubIcon from "@/components/icons/GithubIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import type { PostProps } from "@/types/post";
import About from "@/components/pages/About";
import Resume from "@/components/pages/Resume";
import Portfolio from "@/components/pages/Portfolio";
import Post from "@/components/pages/Post";
import Hero from "@/components/pages/Hero";

const Home: NextPage<{
  homePage: HomePageProps;
  portfolio: PortfolioProps[];
  post: PostProps[];
  bubbleExp: BubbleExperienceProps[];
}> = ({ homePage, portfolio, post, bubbleExp }) => {
  const socialLinks = [
    {
      href: homePage.githubUrl,
      icon: (
        <GithubIcon style="fill-current w-[25px] h-[25px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px]" />
      ),
      title: homePage.githubTitle,
    },
    {
      href: homePage.linkedinUrl,
      icon: (
        <LinkedInIcon style="fill-current w-[25px] h-[25px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px]" />
      ),
      title: homePage.linkedinTitle,
    },
    {
      href: homePage.emailUrl,
      icon: (
        <EmailIcon style="fill-current w-[25px] h-[25px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px]" />
      ),
      title: homePage.emailTitle,
    },
    {
      href: homePage.instagramUrl,
      icon: (
        <InstagramIcon style="fill-current w-[25px] h-[25px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px]" />
      ),
      title: homePage.instagramTitle,
    },
    {
      href: homePage.whatsappUrl,
      icon: (
        <WhatsappIcon style="fill-current w-[25px] h-[25px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px]" />
      ),
      title: homePage.whatsappTitle,
    },
  ];

  return (
    <>
      <PageHead
        title="Moh Fairuz Alauddin Yahya"
        description="Yuhu"
        imageUrl="www.datocms"
        faviconDirectory="/LogoWebsite.png"
      />
      <div className="flex w-full flex-col overflow-x-hidden bg-[#1e2436] text-white">
        <Hero
          profilPicture={homePage.profilPicture}
          greetingText={homePage.greetingText}
          textButton={homePage.heroButtonText}
          typeWriterTextArray={homePage.typeWriterText}
        />
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
          bubbleExperience={bubbleExp}
        />
        <Portfolio
          title={homePage.portfolioTitleSection}
          portfolioData={portfolio}
          recentText={homePage.recentPortfolioSubtitle}
          description={homePage.portfolioDescription}
          buttonText={homePage.buttonTextPortfolioMore}
        />
        <Post
          title={homePage.postTitleSection}
          postData={post}
          description={homePage.postDescription}
          recentText={homePage.recentPostSubtitle}
          buttonText={homePage.buttonTextPostMore}
        />
      </div>
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
        Authorization: `Bearer ${process.env.CMS_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
      {
        allBubbleExperiences {
          id
          experienceTitle
          durationTitle
          durationBubble
        }
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
          githubTitle
          emailTitle
          instagramTitle
          greetingText
          heroButtonText
          linkedinTitle
          typeWriterText
          whatsappTitle
          recentPortfolioSubtitle
          buttonTextPortfolioMore
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
          profilPicture {
            id
            height
            url
            title
            width
          }
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
          id
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
      bubbleExp: res.data.allBubbleExperiences,
    },
  };
}
