// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// interface Product {
//   _id: string;
//   title: string;
//   shortDesc: string;
//   fullDesc: string;
//   price: string;
// }

// export default function ProductDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!params.id) return;

//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`/api/products/${params.id}`);
//         if (!res.ok) throw new Error("Product not found");
//         const data = await res.json();
//         setProduct(data);
//       } catch (err) {
//         console.error(err);
//         router.push("/products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [params.id, router]);

//   if (loading) return <p className="text-center mt-20 text-black">Loading product...</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-4 text-black">
//       <button
//         onClick={() => router.back()}
//         className="mb-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
//       >
//         Back
//       </button>

//       <h1 className="text-3xl font-bold">{product?.title}</h1>
//       <p className="mt-2">{product?.fullDesc}</p>
//       <p className="mt-4 font-bold text-xl">${product?.price}</p>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Product {
  _id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: string;
  createdAt?: string;
  priority?: string;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        router.push("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading)
    return (
      <p className="text-center mt-20 text-xl font-semibold text-black bg-white">
        Loading product...
      </p>
    );

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-4xl mx-auto mt-10 p-4">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-black"
        >
          ← Back
        </button>

        {/* Banner */}
        <div className="w-full h-64 bg-gray-300 rounded-xl mb-6 flex items-center justify-center">
          <span className="text-black text-xl">Image / Banner Here</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-3">{product?.title}</h1>

        {/* Meta Info */}
        <div className="flex gap-6 mb-6 text-black">
          <p className="font-semibold">
            💰 Price: <span className="font-normal">${product?.price}</span>
          </p>
          <p className="font-semibold">
            📅 Date:{" "}
            <span className="font-normal">
              {product?.createdAt
                ? new Date(product.createdAt).toLocaleDateString()
                : "Not provided"}
            </span>
          </p>
          <p className="font-semibold">
            ⭐ Priority: <span className="font-normal">{product?.priority || "N/A"}</span>
          </p>
        </div>

        {/* Full Description */}
        <div className="leading-relaxed text-lg text-black">
          {product?.fullDesc}
        </div>

      </div>
    </div>
  );
}
