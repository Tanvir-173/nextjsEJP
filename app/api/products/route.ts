import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("EJP");
    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("EJP");
    const data = await req.json();
    const result = await db.collection("products").insertOne(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/products error:", error); // <-- This will log the real error
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
