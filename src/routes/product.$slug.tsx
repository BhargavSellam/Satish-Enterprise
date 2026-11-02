import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, addToQuote } from "@/components/site/ProductCard";
import { getCategory, getProduct, PRODUCTS } from "@/content/products";
import { SITE, whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Satish Enterprises` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [{ title: "Unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const [img, setImg] = useState(0);
  const [variant, setVariant] = useState(p.variants?.[0]);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const specs: [string, string | undefined][] = [
    ["Code", p.code], ["Category", getCategory(p.category)?.name], ["Colour", p.colour], ["Finish", p.finish],
    ["Dimensions", p.size], ["Thickness", p.thickness], ["Mounting", p.mounting], ["Applications", p.applications?.join(", ")],
  ];
  return (
    <div className="container-site py-10 sm:py-16">
      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/products" className="hover:text-navy">Products</Link> / <Link to="/products/$category" params={{ category: p.category }} className="hover:text-navy">{getCategory(p.category)?.name}</Link>
      </nav>
      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="overflow-hidden rounded-md bg-muted"><img src={p.images[img]} alt={p.name} width={1200} height={900} className="aspect-[4/3] w-full object-cover" /></div>
          {p.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {p.images.map((src, i) => (
                <button key={i} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`} className={cn("h-20 w-24 overflow-hidden rounded border-2", i === img ? "border-gold" : "border-transparent")}>
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          {p.demo && <p className="mb-3 inline-block rounded-sm bg-gold-soft px-2 py-1 text-xs font-bold uppercase tracking-widest text-navy">Demo product — sample content</p>}
          <p className="eyebrow">{p.code}</p>
          <h1 className="mt-2 text-5xl font-semibold leading-tight">{p.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{p.description}</p>
          <p className="mt-4 font-semibold text-navy">Price: Request Price</p>
          {p.variants && p.variants.length > 0 && (
            <fieldset className="mt-6"><legend className="text-sm font-semibold text-navy">Variant</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.variants.map((v) => <button key={v} onClick={() => setVariant(v)} className={cn("min-h-11 rounded-md border px-4 text-sm", v === variant ? "border-gold bg-ivory text-navy" : "text-muted-foreground")}>{v}</button>)}
              </div>
            </fieldset>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="navy" size="lg" onClick={() => addToQuote(p, variant)}><Plus /> Add to Quote</Button>
            <Button asChild variant="gold" size="lg">
              {SITE.whatsapp.enabled
                ? <a href={whatsappLink(`Hello ${SITE.displayName}, I'd like to enquire about ${p.name} (${p.code}).`)} target="_blank" rel="noreferrer"><MessageSquare /> Enquire About This Product</a>
                : <a href={SITE.phoneHref}><MessageSquare /> Enquire About This Product</a>}
            </Button>
          </div>
          <dl className="mt-10 divide-y border-y">
            {specs.filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm"><dt className="font-semibold text-navy">{k}</dt><dd className="text-muted-foreground">{v}</dd></div>
            ))}
          </dl>
          {p.care && <p className="mt-6 text-sm text-muted-foreground"><strong className="text-navy">Care:</strong> {p.care}</p>}
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Screen colours may differ from physical samples. Natural stone varies between slabs. Please confirm specifications with us before ordering.</p>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-4xl font-semibold">Related products</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </section>
      )}
    </div>
  );
}
