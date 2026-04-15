import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const routes = [
	"",
	"/services",
	"/pricing",
	"/portfolio",
	"/quote",
	"/contact",
	"/admin/login",
  ];

  return routes.map((route) => ({
	url: `${siteUrl}${route}`,
	lastModified: new Date(),
  }));
}

