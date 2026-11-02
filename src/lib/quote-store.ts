import { useSyncExternalStore } from "react";

export type QuoteItem = {
  slug: string;
  code: string;
  name: string;
  category: string;
  variant?: string;
  quantity?: string;
  unit?: string;
};

const KEY = "satish-quote-v1";
const listeners = new Set<() => void>();
let cache: QuoteItem[] | null = null;
const EMPTY: QuoteItem[] = [];

function read(): QuoteItem[] {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    cache = [];
  }
  return cache!;
}

function write(items: QuoteItem[]) {
  cache = items;
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

export const quote = {
  add(item: QuoteItem) {
    const items = read();
    const idx = items.findIndex((i) => i.slug === item.slug && i.variant === item.variant);
    if (idx >= 0) return false;
    write([...items, item]);
    return true;
  },
  update(index: number, patch: Partial<QuoteItem>) {
    write(read().map((it, i) => (i === index ? { ...it, ...patch } : it)));
  },
  remove(index: number) {
    write(read().filter((_, i) => i !== index));
  },
  clear() {
    write([]);
  },
};

export function useQuote() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === KEY) { cache = null; cb(); }
      };
      window.addEventListener("storage", onStorage);
      return () => { listeners.delete(cb); window.removeEventListener("storage", onStorage); };
    },
    read,
    () => EMPTY,
  );
}
