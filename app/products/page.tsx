"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  shortDesc: string;
  price: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-20 text-black">Loading products...</p>;
  if (products.length === 0) return <p className="text-center mt-20 text-black">No products found.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 text-black">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-gray-800 mt-1">{p.shortDesc}</p>
              <p className="font-bold mt-2">${p.price}</p>
            </div>
            <Link
              href={`/products/${p._id}`}
              className="mt-4 bg-blue-600 text-white text-center px-3 py-2 rounded hover:bg-blue-500"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
