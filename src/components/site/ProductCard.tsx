import { Link } from "@tanstack/react-router";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getCategory, type Product } from "@/content/products";
import { quote, useQuote } from "@/lib/quote-store";

export function addToQuote(p: Product, variant?: string) {
  const added = quote.add({ slug: p.slug, code: p.code, name: p.name, category: p.category, variant, unit: p.unit });
  if (added) toast.success(`${p.name} added to your quote list`);
  else toast(`${p.name} is already in your quote list`);
}

export function ProductCard({ p }: { p: Product }) {
  const items = useQuote();
  const inList = items.some((i) => i.slug === p.slug);
  const specs = [p.size, p.finish, p.mounting].filter(Boolean).join(" · ");
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <Link to="/product/$slug" params={{ slug: p.slug }} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        <img src={p.images[0]} alt={p.name} width={1200} height={900} loading="lazy" className="img-zoom h-full w-full object-cover group-hover:scale-105" />
        {p.demo && <span className="absolute left-3 top-3 rounded-sm bg-background/95 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-gold">Demo product</span>}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow !text-[0.65rem]">{getCategory(p.category)?.name} · {p.code}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight">{p.name}</h3>
        {specs && <p className="mt-1 text-sm text-muted-foreground">{specs}</p>}
        <p className="mt-3 text-sm font-medium text-navy">Request Price</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Button asChild variant="gold" size="sm" className="flex-1"><Link to="/product/$slug" params={{ slug: p.slug }}>View Details</Link></Button>
          <Button variant="navy" size="sm" className="flex-1" onClick={() => addToQuote(p, p.variants?.[0])}>
            {inList ? <Check /> : <Plus />} {inList ? "In Quote" : "Add to Quote"}
          </Button>
        </div>
      </div>
    </article>
  );
}
