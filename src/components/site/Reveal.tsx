import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} data-visible={visible} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, intro, center }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-semibold leading-[1.05] sm:text-5xl">{title}</h2>
      <span className={cn("gold-rule mt-5", center && "mx-auto")} />
      {intro && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="border-b bg-ivory">
      <div className="container-site py-14 sm:py-20">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="animate-rise mt-3 max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-6xl">{title}</h1>
        {intro && <p className="animate-rise mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}
