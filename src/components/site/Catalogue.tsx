import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, PRODUCTS, type CategorySlug } from "@/content/products";
import { ProductCard } from "./ProductCard";

const sel = "min-h-11 rounded-md border border-input bg-background px-3 text-sm text-navy focus:border-gold focus:outline-none";

export function Catalogue({ category, initialApplication }: { category?: CategorySlug; initialApplication?: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>(category ?? "");
  const [colour, setColour] = useState("");
  const [finish, setFinish] = useState("");
  const [app, setApp] = useState(initialApplication ?? "");
  const [sort, setSort] = useState("name");

  const base = PRODUCTS.filter((p) => !cat || p.category === cat);
  const uniq = (k: "colour" | "finish") => [...new Set(base.map((p) => p[k]).filter(Boolean))] as string[];
  const apps = [...new Set(base.flatMap((p) => p.applications ?? []))];

  const list = useMemo(() => {
    const s = q.toLowerCase();
    return base
      .filter((p) => !s || `${p.name} ${p.code}`.toLowerCase().includes(s))
      .filter((p) => !colour || p.colour === colour)
      .filter((p) => !finish || p.finish === finish)
      .filter((p) => !app || p.applications?.includes(app))
      .sort((a, b) => (sort === "code" ? a.code.localeCompare(b.code) : a.name.localeCompare(b.name)));
  }, [base, q, colour, finish, app, sort]);

  return (
    <section className="container-site py-12">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(5,minmax(0,1fr))]">
        <label className="relative sm:col-span-2 lg:col-span-1">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or code" className={sel + " w-full pl-9"} />
        </label>
        {!category && (
          <select aria-label="Category" className={sel} value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">All categories</option>
            {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        )}
        {uniq("colour").length > 1 && (
          <select aria-label="Colour" className={sel} value={colour} onChange={(e) => setColour(e.target.value)}>
            <option value="">Any colour</option>{uniq("colour").map((v) => <option key={v}>{v}</option>)}
          </select>
        )}
        {uniq("finish").length > 1 && (
          <select aria-label="Finish" className={sel} value={finish} onChange={(e) => setFinish(e.target.value)}>
            <option value="">Any finish</option>{uniq("finish").map((v) => <option key={v}>{v}</option>)}
          </select>
        )}
        {apps.length > 1 && (
          <select aria-label="Application" className={sel} value={app} onChange={(e) => setApp(e.target.value)}>
            <option value="">Any application</option>{apps.map((v) => <option key={v}>{v}</option>)}
          </select>
        )}
        <select aria-label="Sort" className={sel} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">Sort: Name</option><option value="code">Sort: Code</option>
        </select>
      </div>
      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{list.length} product{list.length === 1 ? "" : "s"}</p>
      <div className="mt-4 grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {list.map((p) => <div key={p.slug} className="animate-rise"><ProductCard p={p} /></div>)}
      </div>
      {list.length === 0 && <p className="py-16 text-center text-muted-foreground">No products match these filters.</p>}
    </section>
  );
}
