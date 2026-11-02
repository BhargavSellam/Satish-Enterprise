import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { PageHero } from "@/components/site/Reveal";
import { APPLICATIONS } from "@/components/site/Applications";
import { CATEGORIES } from "@/content/products";

const IMAGES = [...CATEGORIES.map((c) => ({ src: c.image, title: c.name })), ...APPLICATIONS.map((a) => ({ src: a.image, title: a.title }))];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Satish Enterprises" },
      { name: "description", content: "Inspiration gallery of granite, tile, quartz and sanitaryware finishes." },
      { property: "og:title", content: "Gallery — Satish Enterprises" },
      { property: "og:description", content: "Material inspiration." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <PageHero eyebrow="Gallery" title="Material inspiration" intro="Illustrative images for inspiration. They are not actual inventory or completed customer projects." />
      <section className="container-site columns-1 gap-6 py-12 sm:columns-2 lg:columns-3">
        {IMAGES.map((im, i) => (
          <button key={i} onClick={() => setOpen(i)} className="group mb-6 block w-full overflow-hidden rounded-md" aria-label={`Open ${im.title}`}>
            <img src={im.src} alt={im.title} loading="lazy" className="img-zoom w-full group-hover:scale-105" />
          </button>
        ))}
      </section>
      {open !== null && (
        <div role="dialog" aria-modal="true" className="animate-rise fixed inset-0 z-50 grid place-items-center bg-navy-deep/90 p-4" onClick={() => setOpen(null)}>
          <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-background text-navy" aria-label="Close" autoFocus><X /></button>
          <img src={IMAGES[open].src} alt={IMAGES[open].title} className="max-h-[85vh] rounded-md object-contain" />
        </div>
      )}
    </>
  );
}
