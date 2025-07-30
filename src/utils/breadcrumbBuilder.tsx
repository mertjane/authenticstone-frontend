/* import { SLUG_TO_TITLE_MAP } from "./slugMaps";
import { useLocation } from "react-router-dom"; // make sure it's `react-router-dom`

export const useBreadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const crumbs = [{ name: "Home", link: "/" }];

  segments.forEach((slug, i) => {
    const name =
      SLUG_TO_TITLE_MAP[slug] ||
      slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    const link = "/" + segments.slice(0, i + 1).join("/");

    crumbs.push({ name, link });
  });

  return crumbs;
}; */

import { SLUG_TO_TITLE_MAP } from "./slugMaps";
import { useLocation } from "react-router-dom";

export const useBreadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const crumbs = [{ name: "Home", link: "/" }];

  segments.forEach((slug, i) => {
    const name =
      SLUG_TO_TITLE_MAP[slug] ||
      slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    const link = "/" + segments.slice(0, i + 1).join("/");

    crumbs.push({ name, link });
  });

  // Custom logic: remove "Collection" if "Stone Collection" exists
  const shouldRemoveCollection =
    crumbs.some((c) => c.name === "Stone Collection") ||
    crumbs.some((c) => c.name === "Custom Stonework") || 
    crumbs.some((c) => c.name === "Design Pattern Collection");

  const filteredCrumbs = shouldRemoveCollection
    ? crumbs.filter((c) => c.name !== "Collection" && c.name !== "Collections")
    : crumbs;

  return filteredCrumbs;
};

