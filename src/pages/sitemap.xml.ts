// pages/sitemap.xml.ts

import { GetServerSideProps } from "next";
import { env } from "process";
import { SitemapStream, streamToPromise } from "sitemap";

interface PageInfo {
  url: string;
  changefreq: string;
  priority: number;
}

// Define your static pages here
const pages: PageInfo[] = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/projects", changefreq: "weekly", priority: 0.7 },
  { url: "/contact", changefreq: "weekly", priority: 0.7 },
  { url: "/services/custom-software-development", changefreq: "daily", priority: 1.0 },
  { url: "/services/mobile-application-development", changefreq: "daily", priority: 1.0  },
  { url: "/services/desktop-application-development", changefreq: "daily", priority: 1.0 },
  { url: "/services/data-extraction", changefreq: "daily", priority: 1.0 },
  { url: "/services/wordpress-development", changefreq: "daily", priority: 1.0 },
  { url: "/services/geographic-information-system", changefreq: "daily", priority: 1.0 },


  // Add more static pages here
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const BASE_URL = env.NODE_ENV === "production" ? 'https://predien.vercel.app' : 'http://localhost:3000'
  
  const sitemap = new SitemapStream({ hostname: BASE_URL });

  // Push each page to the sitemap stream
  pages.forEach((page) => sitemap.write(page));

  sitemap.end();

  // Generate the sitemap XML
  const sitemapXML = await streamToPromise(sitemap).then((data) => data.toString());

  // Set the response type to XML
  res.setHeader("Content-Type", "application/xml");
  res.write(sitemapXML);
  res.end();

  return { props: {} }; // We don't need to pass props here
};

// The component won't be used as it's handled by `getServerSideProps`
const Sitemap = () => {
  return null;
};

export default Sitemap;
