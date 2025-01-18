import Link from "next/link";
import styles from "./page.module.css";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, {
    cache: "no-store", // Ensure fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to My E-Commerce Store</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <Link href={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
              />
              <h2 className={styles.productTitle}>{product.title}</h2>
              <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
