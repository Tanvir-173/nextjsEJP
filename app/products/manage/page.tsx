"use client";

import ProtectedRoute from "@/app/Components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: string;
}

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${_id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((p) => p._id !== _id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto mt-10 p-4 text-black">
        <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded shadow text-black">
              <thead className="bg-gray-100 text-black">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Short Description</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50 text-black">
                    <td className="px-4 py-2">{p.title}</td>
                    <td className="px-4 py-2">{p.shortDesc}</td>
                    <td className="px-4 py-2 font-bold">Tk:{p.price}</td>
                    <td className="px-4 py-2 text-center flex justify-center gap-2">
                      <button
                        onClick={() => handleView(p._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
