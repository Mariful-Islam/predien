import { env } from "process";

// pages/api/robots.js
export default function handler(req:any, res:any) {
    res.setHeader('Content-Type', 'text/plain');

    const BASE_URL = 'https://predien.vercel.app' 
  
    // You can modify the content dynamically based on conditions
    const robotsTxt = `
      User-agent: *
      
      Allow: /
  
      # Sitemap location
      Sitemap: ${BASE_URL}/sitemap.xml/
    `;
  
    res.status(200).send(robotsTxt);
  }
  