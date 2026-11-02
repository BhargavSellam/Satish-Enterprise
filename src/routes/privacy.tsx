import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Reveal";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Satish Enterprises" },
      { name: "description", content: "How Satish Enterprises handles information submitted through quotation requests." },
      { property: "og:title", content: "Privacy Policy — Satish Enterprises" },
      { property: "og:description", content: "How enquiry information is handled." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <section className="container-site max-w-3xl space-y-4 py-12 text-muted-foreground">
        <p>When you send a quotation request, we store the details you provide (name, phone, optional email, project location, selected products, budget and message) so we can respond to your enquiry.</p>
        <p>We do not sell your information. Your quote list is saved only in your own browser until you send it.</p>
        <p>To ask about or remove your information, call {SITE.phoneDisplay}.</p>
      </section>
    </>
  ),
});
