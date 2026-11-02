import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X, ClipboardList } from "lucide-react";
import logo from "@/assets/satish-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/content/products";
import { SITE } from "@/content/site";
import { useQuote } from "@/lib/quote-store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/applications", label: "Applications" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

const linkCls = "relative inline-flex min-h-11 items-center px-1 text-sm font-medium text-navy transition-colors hover:text-gold";

export function Header() {
  const [open, setOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const items = useQuote();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container-site grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 xl:flex xl:justify-between">
        <Link to="/" className="flex min-w-0 items-center" aria-label={`${SITE.displayName} home`}>
          <img src={logo.url} alt="Satish Enterprise and Full House" width={1794} height={652} className="h-12 w-auto sm:h-14" />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
          <Link to="/" className={linkCls} activeOptions={{ exact: true }} activeProps={{ className: "text-gold" }}>Home</Link>
          <div className="relative" onMouseEnter={() => setProdOpen(true)} onMouseLeave={() => setProdOpen(false)}>
            <button
              type="button"
              className={cn(linkCls, "gap-1")}
              aria-expanded={prodOpen}
              aria-haspopup="true"
              onClick={() => setProdOpen((v) => !v)}
            >
              Products <ChevronDown className={cn("h-4 w-4 transition-transform", prodOpen && "rotate-180")} />
            </button>
            <div className={cn("absolute left-1/2 top-full w-60 -translate-x-1/2 pt-2 transition-all", prodOpen ? "visible opacity-100" : "invisible -translate-y-1 opacity-0")}>
              <ul className="rounded-md border bg-background p-2 shadow-lift">
                <li><Link to="/products" onClick={() => setProdOpen(false)} className="flex min-h-11 items-center rounded px-3 text-sm font-semibold text-navy hover:bg-ivory">All products</Link></li>
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link to="/products/$category" params={{ category: c.slug }} onClick={() => setProdOpen(false)} className="flex min-h-11 items-center rounded px-3 text-sm text-navy hover:bg-ivory hover:text-gold">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={linkCls} activeProps={{ className: "text-gold" }}>{n.label}</Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link to="/quote" className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-navy hover:bg-ivory" aria-label={`Quote list, ${items.length} items`}>
            <ClipboardList className="h-5 w-5" />
            {items.length > 0 && <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-primary-foreground">{items.length}</span>}
          </Link>
          <Button asChild variant="navy" className="hidden sm:inline-flex"><Link to="/quote">Request a Quote</Link></Button>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy hover:bg-ivory xl:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-50 overflow-hidden xl:hidden", open ? "visible" : "invisible")} aria-hidden={!open}>
        <div className={cn("absolute inset-0 bg-navy-deep/40 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")} onClick={() => setOpen(false)} />
        <aside role="dialog" aria-modal="true" aria-label="Menu" className={cn("absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col overflow-y-auto bg-background shadow-lift transition-transform duration-300", open ? "translate-x-0" : "translate-x-full")}>
          <div className="flex h-20 items-center justify-between border-b px-5">
            <span className="eyebrow">Menu</span>
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy hover:bg-ivory" aria-label="Close menu" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
            {[{ to: "/", label: "Home" }, { to: "/products", label: "Products" }].map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="flex min-h-12 items-center border-b font-display text-2xl text-navy">{n.label}</Link>
            ))}
            <div className="grid grid-cols-2 gap-1 border-b py-2">
              {CATEGORIES.map((c) => (
                <Link key={c.slug} to="/products/$category" params={{ category: c.slug }} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="flex min-h-11 items-center text-sm text-muted-foreground hover:text-gold">{c.name}</Link>
              ))}
            </div>
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="flex min-h-12 items-center border-b font-display text-2xl text-navy">{n.label}</Link>
            ))}
          </nav>
          <div className="mt-auto space-y-3 p-5">
            <Button asChild variant="navy" size="lg" className="w-full"><Link to="/quote" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>Request a Quote</Link></Button>
            <Button asChild variant="gold" size="lg" className="w-full"><a href={SITE.phoneHref} tabIndex={open ? 0 : -1}><Phone /> {SITE.phoneDisplay}</a></Button>
          </div>
        </aside>
      </div>
    </header>
  );
}
