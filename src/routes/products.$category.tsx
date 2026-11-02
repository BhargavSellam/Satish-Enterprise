import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Reveal";
import { Catalogue } from "@/components/site/Catalogue";
import { getCategory } from "@/content/products";

export const Route = createFileRoute("/products/$category")({
  loader: ({ params }) => {
    const c = getCategory(params.category);
    if (!c) throw notFound();
    return { category: c };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.name} — Satish Enterprises` },
          { name: "description", content: loaderData.category.intro },
          { property: "og:title", content: `${loaderData.category.name} — Satish Enterprises` },
          { property: "og:description", content: loaderData.category.intro },
        ]
      : [{ title: "Unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: () => {
    const { category } = Route.useLoaderData();
    return (
      <>
        <PageHero eyebrow="Collection" title={category.name} intro={category.intro} />
        <Catalogue category={category.slug} key={category.slug} />
      </>
    );
  },
});
