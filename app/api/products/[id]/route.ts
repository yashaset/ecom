import { NextResponse } from "next/server";

const FAKESTORE_API = "https://fakestoreapi.com/products";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${FAKESTORE_API}/${params.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    const product = await response.json();
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
