import ProductDetails from "@/app/Components/ProductDetail";
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products/${params.id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }
  const product: Product = await res.json();

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
