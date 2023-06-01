import Head from "next/head";
const PageHead = ({
  title,
  description,
  imageUrl,
  faviconDirectory,
}: {
  title: string;
  description: string;
  imageUrl: string;
  faviconDirectory: string;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta
        name="robots"
        content="follow, index, max-snippet:-1, max-image-preview:large"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:locale" content="en" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1326" />
      <meta property="og:image:height" content="904" />
      <meta name="google-site-verification" content="MTkDsVpnuGTmZtmtbgRUlnkjsA33EJO20OzpTz-gzLM" />
      <meta name="twitter: image" content={imageUrl} />
      <link rel="icon" href={faviconDirectory} />
    </Head>
  );
};
export default PageHead;
