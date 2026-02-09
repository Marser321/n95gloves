import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";
import { getProductBySlug, products } from "@/lib/products";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
