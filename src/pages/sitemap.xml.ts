import { site } from "../data/site";
import { articles } from "../data/articles";

const pages = [
  {
    path: "/",
    changefreq: "monthly",
    priority: "1.0",
  },
  ...articles.map((article) => ({
    path: article.slug,
    changefreq: "monthly",
    priority: "0.7",
  })),
] as const;

export function GET() {
  const urls = pages
    .map(({ path, changefreq, priority }) => {
      const loc = new URL(path, site.url).toString();

      return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
