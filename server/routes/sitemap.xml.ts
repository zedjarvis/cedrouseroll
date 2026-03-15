const publishedPages = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/writing/hello-world",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: "2026-01-26",
  },
];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const siteUrl = (
    config.public.siteUrl || "https://www.cedrouseroll.dev"
  ).replace(/\/$/, "");

  const urlEntries = publishedPages
    .map((page) => {
      const lastmod = page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : "";

      return `  <url>
    <loc>${escapeXml(`${siteUrl}${page.path}`)}</loc>${lastmod}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join("\n");

  setHeader(event, "content-type", "application/xml; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=3600, s-maxage=3600");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
});
