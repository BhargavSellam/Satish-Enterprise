import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Phone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/content/products";
import { SITE } from "@/content/site";
import { quote, useQuote } from "@/lib/quote-store";
import { quoteSchema, submitQuote } from "@/lib/quote.functions";

const field = "mt-1.5 block w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const label = "text-sm font-semibold text-navy";

export function QuoteList() {
  const items = useQuote();
  if (items.length === 0)
    return (
      <div className="rounded-md border border-dashed bg-ivory p-8 text-center">
        <p className="font-display text-2xl text-navy">Your quote list is empty</p>
        <p className="mt-2 text-sm text-muted-foreground">Browse the collections and tap “Add to Quote” on products you like.</p>
        <Button asChild variant="navy" className="mt-5"><Link to="/products">Explore Products</Link></Button>
      </div>
    );
  return (
    <ul className="divide-y rounded-md border">
      {items.map((it, i) => (
        <li key={`${it.slug}-${i}`} className="animate-rise grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="min-w-0">
            <p className="eyebrow !text-[0.65rem]">{it.code}</p>
            <Link to="/product/$slug" params={{ slug: it.slug }} className="font-display text-xl text-navy hover:text-gold">{it.name}</Link>
            {it.variant && <p className="text-sm text-muted-foreground">Variant: {it.variant}</p>}
          </div>
          <div className="flex items-end gap-2">
            <label className="text-xs font-semibold text-navy">
              Approx. quantity
              <input aria-label={`Quantity for ${it.name}`} inputMode="decimal" className={field + " w-28"} value={it.quantity ?? ""} onChange={(e) => quote.update(i, { quantity: e.target.value.slice(0, 20) })} placeholder="e.g. 500" />
            </label>
            <label className="text-xs font-semibold text-navy">
              Unit
              <select className={field + " w-24"} value={it.unit ?? ""} onChange={(e) => quote.update(i, { unit: e.target.value })}>
                {["sq ft", "slab", "box", "piece"].map((u) => <option key={u}>{u}</option>)}
              </select>
            </label>
            <Button variant="ghost" size="icon" aria-label={`Remove ${it.name}`} onClick={() => quote.remove(i)}><Trash2 /></Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function QuoteForm() {
  const items = useQuote();
  const send = useServerFn(submitQuote);
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: String(fd.get("fullName") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      projectLocation: String(fd.get("projectLocation") || ""),
      categories: fd.getAll("categories").map(String),
      items: items.map(({ code, name, variant, quantity, unit }) => ({ code, name, variant, quantity, unit })),
      budget: String(fd.get("budget") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
      startedAt: startedAt.current,
    };
    const parsed = quoteSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setStatus("sending");
    setError(null);
    try {
      await send({ data: parsed.data });
      setStatus("done");
      quote.clear();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done")
    return (
      <div role="status" className="animate-rise rounded-md border border-gold bg-ivory p-8">
        <CheckCircle2 className="h-10 w-10 text-gold" />
        <h3 className="mt-4 text-3xl font-semibold">Thank you — your request has been received.</h3>
        <p className="mt-2 text-muted-foreground">We'll be in touch using the phone number you provided. A quotation request does not confirm a purchase, price or stock reservation.</p>
      </div>
    );

  const err = (k: string) => fieldErrors[k] && <p className="mt-1 text-sm text-destructive">{fieldErrors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className={label}>Full name *<input name="fullName" autoComplete="name" required className={field} aria-invalid={!!fieldErrors.fullName} />{err("fullName")}</label>
      <label className={label}>Phone number *<input name="phone" type="tel" autoComplete="tel" required className={field} aria-invalid={!!fieldErrors.phone} />{err("phone")}</label>
      <label className={label}>Email <span className="font-normal text-muted-foreground">(optional)</span><input name="email" type="email" autoComplete="email" className={field} />{err("email")}</label>
      <label className={label}>Project location<input name="projectLocation" className={field} placeholder="Town / area" /></label>
      <fieldset className="sm:col-span-2">
        <legend className={label}>Product categories required</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <label key={c.slug} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border px-4 text-sm text-navy has-[:checked]:border-gold has-[:checked]:bg-ivory">
              <input type="checkbox" name="categories" value={c.name} defaultChecked={items.some((i) => i.category === c.slug)} className="accent-[var(--gold)]" /> {c.name}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <p className={label}>Selected products &amp; approximate quantities</p>
        <p className="mb-2 text-sm text-muted-foreground">{items.length ? `${items.length} item(s) from your quote list will be included.` : "No products selected — that's fine, describe your needs below."}</p>
      </div>
      <label className={label}>Budget <span className="font-normal text-muted-foreground">(optional)</span><input name="budget" className={field} /></label>
      <div className="hidden sm:block" />
      <label className={label + " sm:col-span-2"}>Message<textarea name="message" rows={5} className={field} placeholder="Tell us about your project, rooms and timelines" /></label>
      {status === "error" && (
        <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm sm:col-span-2">
          <p className="font-semibold text-destructive">{error}</p>
          <p className="mt-1 text-muted-foreground">Please try again, or call us on <a className="font-semibold text-navy underline" href={SITE.phoneHref}>{SITE.phoneDisplay}</a>.</p>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" variant="navy" size="lg" disabled={status === "sending"}>
          {status === "sending" && <Loader2 className="animate-spin" />} Send Quote Request
        </Button>
        <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy hover:text-gold"><Phone className="h-4 w-4 text-gold" /> Or call {SITE.phoneDisplay}</a>
      </div>
    </form>
  );
}
