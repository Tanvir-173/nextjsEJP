// import clientPromise from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import { ObjectId } from "mongodb";

// export async function DELETE(
//   req: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     // Await the params
//     const params = await context.params;

//     console.log("Params object:", params);
//     console.log("Deleting product with _id:", params.id);

//     if (!params?.id) {
//       return NextResponse.json({ error: "Missing id" }, { status: 400 });
//     }

//     const client = await clientPromise;
//     const db = client.db("EJP");

//     const result = await db.collection("products").deleteOne({
//       _id: new ObjectId(params.id),
//     });

//     if (result.deletedCount === 0) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Product deleted" });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
//   }
// }
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET single product
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;  // ✅ FIXED

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("EJP");

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIXED

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("EJP");

    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
