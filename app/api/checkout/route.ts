import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function POST(request: Request) {
  try {
    const { cart }: { cart: { id: number; quantity: number }[] } =
      await request.json();
    const productsResponse = await fetch("https://fakestoreapi.com/products");
    const products = await productsResponse.json();

    // Match cart items with products to calculate the total
    const lineItems = cart.map((item) => {
      const product = products.find((p: { id: number }) => p.id === item.id);
      if (!product) throw new Error(`Product with ID ${item.id} not found`);

      return {
        price_data: {
          currency: "usd",
          product_data: { name: product.title },
          unit_amount: Math.round(product.price * 100), // Stripe expects the amount in cents
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
