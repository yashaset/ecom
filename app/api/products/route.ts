import { NextResponse } from "next/server";

const FAKESTORE_API = "https://fakestoreapi.com/products";

export async function GET() {
  try {
    const response = await fetch(FAKESTORE_API);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
