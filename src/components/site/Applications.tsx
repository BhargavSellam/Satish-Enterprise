import { Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import quartz from "@/assets/cat-quartz.jpg";
import sanitary from "@/assets/cat-sanitary.jpg";
import wall from "@/assets/app-wall.jpg";
import commercial from "@/assets/app-commercial.jpg";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export const APPLICATIONS = [
  { key: "Flooring", title: "Living-room flooring", image: hero },
  { key: "Kitchen surfaces", title: "Kitchen surfaces", image: quartz },
  { key: "Bathroom finishes", title: "Bathroom finishes", image: sanitary },
  { key: "Wall features", title: "Wall features", image: wall },
  { key: "Commercial spaces", title: "Commercial spaces", image: commercial },
];

export function ApplicationsGrid({ limit }: { limit?: number }) {
  const list = limit ? APPLICATIONS.slice(0, limit) : APPLICATIONS;
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((a, i) => (
        <Reveal key={a.key} delay={i * 80} className={cn(!limit && i === 0 && "sm:col-span-2 lg:col-span-2")}>
          <Link to="/products" search={{ application: a.key }} className="group relative block overflow-hidden rounded-md">
            <img src={a.image} alt={a.title} width={1200} height={900} loading="lazy" className={cn("img-zoom w-full object-cover group-hover:scale-105", !limit && i === 0 ? "aspect-[16/9]" : "aspect-[4/3]")} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/10 to-transparent" />
            <span className="absolute right-3 top-3 rounded-sm bg-background/90 px-2 py-1 text-[0.6rem] uppercase tracking-widest text-muted-foreground">Inspiration</span>
            <div className="absolute bottom-0 p-6">
              <h3 className="text-3xl font-semibold text-primary-foreground">{a.title}</h3>
              <span className="mt-1 block text-sm text-gold-soft">See suitable products →</span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
