import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Reveal";
import { ApplicationsGrid } from "@/components/site/Applications";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Applications & Inspiration — Satish Enterprises" },
      { name: "description", content: "Ideas for flooring, kitchen surfaces, bathrooms, feature walls and commercial spaces." },
      { property: "og:title", content: "Applications & Inspiration — Satish Enterprises" },
      { property: "og:description", content: "Material ideas for every space." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Applications" title="Inspiration for every space" intro="Images on this page are illustrative inspiration, not projects completed by Satish Enterprises. Each links to products whose specifications suit that use." />
      <section className="container-site pb-8"><ApplicationsGrid /></section>
    </>
  ),
});
