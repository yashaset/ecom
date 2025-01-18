"use client";

import React from "react";
import { useCart } from "@/app/context/CartContext";
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
const ProductDetails: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      <StarRating count={product.rating.count} rate={product.rating.rate} />
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>${product.price}</p>
      <button onClick={handleAddToCart} className={styles.button}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
