import { createFileRoute, Link } from "@tanstack/react-router";
import wall from "@/assets/app-wall.jpg";
import { PageHero, Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/content/products";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Satish Enterprises, Amalapuram" },
      { name: "description", content: "Granites, tiles, quartz and sanitaryware supplier in Amalapuram, Andhra Pradesh." },
      { property: "og:title", content: "About Satish Enterprises" },
      { property: "og:description", content: "Materials for homes and commercial projects in Amalapuram." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="About" title="Materials for homes and businesses in Amalapuram" />
      <section className="container-site grid gap-12 py-16 lg:grid-cols-2 lg:items-center">
        <Reveal><img src={wall} alt="Illustrative stone feature wall" width={1200} height={900} loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover shadow-lift" /></Reveal>
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>{SITE.displayName} supplies {CATEGORIES.map((c) => c.name.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " and $1")} from {SITE.address}.</p>
          {/* OWNER: replace this paragraph with your real business story and customer-service approach. */}
          <p className="rounded-md border border-dashed border-gold bg-ivory p-5 text-base">Our story is coming soon. This space is reserved for the owner's own words about the business and how we help customers.</p>
          <Button asChild variant="navy" size="lg"><Link to="/contact">Get in touch</Link></Button>
        </Reveal>
      </section>
    </>
  ),
});
