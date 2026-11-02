import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import logo from "@/assets/satish-logo.png.asset.json";
import { CATEGORIES } from "@/content/products";
import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-ivory">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <img src={logo.url} alt="Satish Enterprise and Full House" width={1918} height={820} loading="lazy" className="h-16 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Granites, tiles, quartz and sanitaryware for homes and commercial projects in Amalapuram, Andhra Pradesh.
          </p>
        </div>
        <div>
          <p className="eyebrow">Products</p>
          <ul className="mt-4 space-y-1">
            {CATEGORIES.map((c) => (
              <li key={c.slug}><Link to="/products/$category" params={{ category: c.slug }} className="inline-flex min-h-11 items-center text-sm text-navy hover:text-gold">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={SITE.phoneHref} className="inline-flex min-h-11 items-center gap-2 font-semibold text-navy hover:text-gold"><Phone className="h-4 w-4 text-gold" />{SITE.phoneDisplay}</a></li>
            <li className="flex gap-2 text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-navy">{SITE.address}</a></li>
            {SITE.socials.map((s) => <li key={s.href}><a href={s.href} className="text-navy hover:text-gold">{s.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.displayName}. All rights reserved.</p>
          <Link to="/privacy" className="inline-flex min-h-11 items-center hover:text-navy sm:min-h-0">Privacy policy</Link>
        </div>
      </div>
    </footer>
  );
}
