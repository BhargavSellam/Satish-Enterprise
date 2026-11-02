import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const quoteSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{7,18}$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(255).optional().or(z.literal("")),
  projectLocation: z.string().trim().max(200).optional().or(z.literal("")),
  categories: z.array(z.string().max(40)).max(10),
  items: z
    .array(
      z.object({
        code: z.string().max(60),
        name: z.string().max(160),
        variant: z.string().max(80).optional(),
        quantity: z.string().max(40).optional(),
        unit: z.string().max(20).optional(),
      }),
    )
    .max(50),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // spam protection
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number(),
});

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => quoteSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // honeypot: silently drop bots
    if (Date.now() - data.startedAt < 3000) throw new Error("Please take a moment to review your details and try again.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("quote_requests").insert({
      full_name: data.fullName,
      phone: data.phone,
      email: data.email || null,
      project_location: data.projectLocation || null,
      categories: data.categories,
      items: data.items,
      budget: data.budget || null,
      message: data.message || null,
    });
    if (error) {
      console.error("quote insert failed", error);
      throw new Error("We couldn't send your request right now.");
    }
    return { ok: true };
  });
