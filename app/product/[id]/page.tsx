"use client";

import React, { useState } from "react";
import styles from "./ProductDetail.module.css";
import StarRating from "@/app/Components/Rating";

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

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
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
  console.log(cart);
  const addToCart = () => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
        },
      ]);
    }
    alert(`${product.title} added to the cart!`);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>${product.price}</p>
      <StarRating rate={product.rating.rate} count={product.rating.count} />
      <button onClick={addToCart} className={styles.button}>
        Add to Cart
      </button>
      <div className={styles.cart}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
