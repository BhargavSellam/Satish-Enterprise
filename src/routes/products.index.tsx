import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageHero } from "@/components/site/Reveal";
import { Catalogue } from "@/components/site/Catalogue";

export const Route = createFileRoute("/products/")({
  validateSearch: z.object({ application: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Products — Satish Enterprises" },
      { name: "description", content: "Browse granites, tiles, quartz and sanitaryware and add products to your quote list." },
      { property: "og:title", content: "Products — Satish Enterprises" },
      { property: "og:description", content: "Granites, tiles, quartz and sanitaryware in Amalapuram." },
    ],
  }),
  component: () => {
    const { application } = Route.useSearch();
    return (
      <>
        <PageHero eyebrow="Catalogue" title="All products" intro="Search, filter and shortlist. Listings marked “Demo product” are samples until real inventory is added." />
        <Catalogue initialApplication={application} />
      </>
    );
  },
});
