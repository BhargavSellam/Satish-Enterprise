import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, MapPin, Gem, LayoutGrid, Layers, Bath } from "lucide-react";
import heroMaterials from "@/assets/hero-materials.jpg";
import { cn } from "@/lib/utils";

const CAT_ICONS = { granites: Gem, tiles: LayoutGrid, quartz: Layers, sanitaryware: Bath } as const;
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { ApplicationsGrid } from "@/components/site/Applications";
import { Faq } from "@/components/site/Faq";
import { CATEGORIES, PRODUCTS } from "@/content/products";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Satish Enterprises — Granites, Tiles, Quartz & Sanitaryware in Amalapuram" },
      { name: "description", content: "Explore granites, tiles, quartz and sanitaryware for your home or commercial project, and request a quotation." },
      { property: "og:title", content: "Satish Enterprises — Beautiful Materials. Thoughtful Spaces." },
      { property: "og:description", content: "Granites, tiles, quartz and sanitaryware in Amalapuram, Andhra Pradesh." },
    ],
  }),
  component: Home,
});

const STEPS = ["Explore the Collections", "Shortlist Products", "Share Your Requirements", "Receive a Quotation"];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="container-site grid items-center gap-8 pt-10 pb-8 md:grid-cols-[1fr_1.1fr] md:gap-6 md:pt-14 lg:gap-10 lg:pt-16 2xl:min-h-[44rem]">
          <div className="min-w-0">
            <p className="eyebrow animate-rise !text-[0.62rem] !tracking-[0.2em] sm:!text-[0.72rem]">Granites • Tiles • Quartz • Sanitaryware</p>
            <h1 className="animate-rise mt-4 text-[clamp(2.6rem,8.5vw,5.75rem)] font-bold leading-[0.95] tracking-[-0.02em] [animation-delay:100ms] md:text-[clamp(2.6rem,5.6vw,5.75rem)]">
              Beautiful materials. Thoughtful spaces.
            </h1>
            <p className="animate-rise mt-5 max-w-md text-base leading-relaxed text-muted-foreground [animation-delay:200ms] sm:text-lg lg:text-xl">
              Explore surfaces and finishes for your home or commercial project.
            </p>
            <div className="animate-rise mt-7 grid gap-3 [animation-delay:300ms] min-[400px]:flex min-[400px]:flex-wrap">
              <Button asChild variant="navy" size="lg"><Link to="/products">Explore Products <ArrowRight /></Link></Button>
              <Button asChild variant="gold" size="lg" className="text-gold hover:text-primary-foreground"><Link to="/quote">Request a Quote <ArrowRight /></Link></Button>
            </div>
            <div className="animate-rise mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 [animation-delay:400ms]">
              <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-navy hover:text-gold"><Phone className="h-5 w-5 text-gold" />{SITE.phoneDisplay}</a>
              <span className="hidden h-6 w-px bg-border min-[420px]:block" aria-hidden />
              <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-navy hover:text-gold"><MapPin className="h-5 w-5 text-gold" />Amalapuram, Andhra Pradesh</a>
            </div>
          </div>
          <div className="animate-rise relative [animation-delay:150ms]">
            <img src={heroMaterials} alt="Illustrative granite, quartz and tile samples with a wash basin and brass tap" width={1408} height={1200} fetchPriority="high" className="mx-auto w-full max-w-[44rem] object-contain" />
            <p className="absolute bottom-1 right-1 text-[0.6rem] uppercase tracking-widest text-muted-foreground">Illustrative image</p>
          </div>
        </div>
        <nav aria-label="Product categories" className="border-t">
          <ul className="container-site grid grid-cols-2 md:grid-cols-4">
            {CATEGORIES.map((c, i) => {
              const Icon = CAT_ICONS[c.slug];
              return (
                <li key={c.slug} className={cn("border-border", i % 2 === 1 && "border-l", i > 1 && "border-t md:border-t-0", i === 2 && "md:border-l")}>
                  <Link to="/products/$category" params={{ category: c.slug }} className="group flex min-h-20 items-center justify-center gap-3 px-2 py-4 text-navy transition-colors hover:text-gold sm:gap-5">
                    <Icon className="h-8 w-8 shrink-0 stroke-[1.3] transition-transform group-hover:-translate-y-0.5 sm:h-10 sm:w-10" />
                    <span className="text-base sm:text-lg">{c.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>

      <section className="container-site py-20">
        <Reveal><SectionHeading eyebrow="Collections" title="Four materials, one place" intro="Browse each collection to see what's available, then shortlist products for a quotation." /></Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <Link to="/products/$category" params={{ category: c.slug }} className="group block h-full overflow-hidden rounded-md border bg-card shadow-soft transition-shadow hover:shadow-lift">
                <div className="aspect-[4/3] overflow-hidden"><img src={c.image} alt={c.name} width={1200} height={900} loading="lazy" className="img-zoom h-full w-full object-cover group-hover:scale-105" /></div>
                <div className="p-6">
                  <h3 className="text-3xl font-semibold">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.intro}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-gold">Explore Collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="container-site">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Featured" title="From the catalogue" intro="These are demo listings that show how products will appear — real inventory will replace them." />
            <Button asChild variant="quiet"><Link to="/products">View all products</Link></Button>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {PRODUCTS.slice(0, 4).map((p) => <Reveal key={p.slug}><ProductCard p={p} /></Reveal>)}
          </div>
        </div>
      </section>

      <section className="container-site py-20">
        <Reveal><SectionHeading eyebrow="Inspiration" title="Ideas for every space" /></Reveal>
        <ApplicationsGrid limit={3} />
      </section>

      <section className="bg-navy py-20 text-primary-foreground">
        <div className="container-site">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-4xl font-semibold text-primary-foreground sm:text-5xl">A simple enquiry process</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-md bg-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 100} className="bg-navy p-8">
                <span className="font-display text-5xl text-gold">0{i + 1}</span>
                <p className="mt-4 text-xl font-semibold">{s}</p>
              </Reveal>
            ))}
          </ol>
          <Button asChild variant="gold" size="lg" className="mt-10"><Link to="/quote">Start your quote list</Link></Button>
        </div>
      </section>

      <section className="container-site grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal><SectionHeading eyebrow="FAQ" title="Questions, answered" /></Reveal>
        <Faq />
      </section>
    </>
  );
}
