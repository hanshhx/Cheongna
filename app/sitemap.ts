import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  "",
  "/business",
  "/special",
  "/floor",
  "/photos",
  "/location",
  "/map",
  "/vision",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
