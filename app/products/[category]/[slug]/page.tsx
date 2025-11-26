import { cacheLife } from "next/cache";

async function getProduct(slug: string) {
  "use cache";

  cacheLife("days");

  // Simulate a slow API call to the database...
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { slug };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[category]/[slug]">) {
  const { category, slug } = await params;
  const product = await getProduct(slug);

  return (
    <div>
      Product Page {category} {product.slug}
    </div>
  );
}

export function generateStaticParams() {
  return [
    { category: "jackets", slug: "classic-bomber" },
    { category: "jackets", slug: "essential-windbreaker" },
    { category: "accessories", slug: "thermal-fleece-gloves" },
  ];
}
