"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  shortDesc: string;
  price: string;
  image?: string; // optional image
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-800 text-xl font-semibold">
        Loading products...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900"> {/* Page background */}
      <div className="max-w-6xl mx-auto mt-10 p-6">
        {/* Page Title + Description */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Our Products</h1>
          <p className="text-gray-700">
            Browse our available products. Use the search to find items quickly.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-700">No products found.</p>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p._id}
                className="border rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between bg-white p-4"
              >
                {/* Image / Placeholder */}
                <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>

                {/* Title & Short Description */}
                <h2 className="text-xl font-semibold text-gray-900">{p.title}</h2>
                <p className="text-gray-700 mt-1 line-clamp-2">{p.shortDesc}</p>

                {/* Price / Meta */}
                <p className="mt-2 font-bold text-gray-900">Taka:{p.price}</p>

                {/* Details Button */}
                <Link
                  href={`/products/${p._id}`}
                  className="mt-4 bg-blue-600 text-white text-center px-3 py-2 rounded hover:bg-blue-500"
                >
                  Details
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
