import { ProductDetails } from "../../../components/ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) {
  const { id } = await params;
  return <ProductDetails id={id} />;
}
