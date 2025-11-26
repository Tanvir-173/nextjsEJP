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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons'
import { faAlarmClock } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface Product {
  _id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: string;
  createdAt?: string;
  priority?: string;
  image?: string; // added image field
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

        {/* Product Image / Banner */}
        {/* Product Image / Banner */}
        <div className="w-full h-64 rounded-xl mb-6 overflow-hidden">
          {product?.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-black text-xl">No Image Available</span>
            </div>
          )}
        </div>


        {/* Title */}
        <h1 className="text-4xl font-bold mb-3">{product?.title}</h1>

        {/* Meta Info */}
        <div className="flex gap-6 mb-6 text-black">
          <p className="font-semibold">
             <FontAwesomeIcon icon={faMoneyBill1Wave} /> <span className="font-normal">{product?.price} Taka</span>
          </p>
          <p className="font-semibold">
            <FontAwesomeIcon icon={faAlarmClock} />{" "}
            <span className="font-normal">
              {product?.createdAt
                ? new Date(product.createdAt).toLocaleDateString()
                : "Not provided"}
            </span>
          </p>
          <p className="font-semibold">
            <FontAwesomeIcon icon={faStar} /> <span className="font-normal">{product?.priority || "N/A"}</span>
          </p>
        </div>

        {/* Full Description */}
        <div className="leading-relaxed text-lg text-black">{product?.fullDesc}</div>
      </div>
    </div>
  );
}
