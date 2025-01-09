import { env } from "process";

// pages/api/robots.js
export default function handler(req:any, res:any) {
    res.setHeader('Content-Type', 'text/plain');

    const BASE_URL = env.NODE_ENV === "production" ? 'https://predien.vercel.app' : 'http://localhost:3000'
  
    // You can modify the content dynamically based on conditions
    const robotsTxt = `
      # Robots.txt generated dynamically for Next.js
      User-agent: *
      Disallow: /private/
  
      # Allow specific user agents
      User-agent: Googlebot
      Disallow: /private/
      Allow: /
  
      # Sitemap location
      Sitemap: ${BASE_URL}/sitemap.xml/
    `;
  
    res.status(200).send(robotsTxt);
  }
  