"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}
