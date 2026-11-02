import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/Reveal";
import { QuoteForm } from "@/components/site/QuoteForm";
import { SITE, whatsappLink } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Satish Enterprises, Amalapuram" },
      { name: "description", content: "Call or send a quotation request to Satish Enterprises in Amalapuram, Andhra Pradesh." },
      { property: "og:title", content: "Contact Satish Enterprises" },
      { property: "og:description", content: "Phone, address and quotation form." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your project" />
      <section className="container-site grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-6">
          <a href={SITE.phoneHref} className="flex min-h-11 items-center gap-3 font-display text-3xl text-navy hover:text-gold"><Phone className="h-6 w-6 text-gold" />{SITE.phoneDisplay}</a>
          {SITE.whatsapp.enabled && <a href={whatsappLink()} target="_blank" rel="noreferrer" className="block text-navy underline">Message on WhatsApp</a>}
          <div className="flex gap-3 text-muted-foreground"><MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" /><div><p>{SITE.address}</p><p className="mt-1 text-sm">Plus Code: {SITE.plusCode}</p><a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center font-semibold text-navy underline decoration-gold underline-offset-4">Open in Google Maps</a></div></div>
        </aside>
        <div className="rounded-md border p-6 shadow-soft sm:p-10"><h2 className="mb-6 text-3xl font-semibold">Send a quote request</h2><QuoteForm /></div>
      </section>
    </>
  ),
});
