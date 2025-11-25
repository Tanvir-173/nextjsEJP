"use client";

import ProtectedRoute from "@/app/Components/ProtectedRoute";
import { useState } from "react";


export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [price, setPrice] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, shortDesc, fullDesc, price }),
    });

    if (res.ok) {
      setSuccess("Product added successfully!");
      setTitle("");
      setShortDesc("");
      setFullDesc("");
      setPrice("");
    } else {
      const data = await res.json();
      setSuccess(data.error || "Failed to add product");
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Short Description"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Full Description"
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
