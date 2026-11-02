import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Reveal";
import { QuoteForm, QuoteList } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Your Quote List — Satish Enterprises" },
      { name: "description", content: "Review your shortlisted products and send one combined quotation request." },
      { property: "og:title", content: "Request a Quote — Satish Enterprises" },
      { property: "og:description", content: "Shortlist products and request a quotation." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Quotation" title="Your quote list" intro="No payment is collected. A quotation request does not confirm a purchase, price or stock reservation." />
      <section className="container-site grid gap-12 py-12 lg:grid-cols-2">
        <div><h2 className="mb-5 text-3xl font-semibold">Selected products</h2><QuoteList /></div>
        <div className="rounded-md border p-6 shadow-soft sm:p-8"><h2 className="mb-6 text-3xl font-semibold">Your details</h2><QuoteForm /></div>
      </section>
    </>
  ),
});
