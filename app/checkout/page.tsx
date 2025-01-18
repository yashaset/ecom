"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const response = await fetch("/api/checkout", { method: "POST" });
    const { url } = await response.json();
    window.location.href = url;
    setLoading(false);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
