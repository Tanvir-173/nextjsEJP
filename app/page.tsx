"use client";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to MyApp</h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover and manage your products easily with our Next.js + Firebase + MongoDB app.
        </p>
        <a
          href="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-500 transition"
        >
          Browse Products
        </a>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">Add Products</h3>
            <p className="text-gray-600">Easily add new products and manage them securely.</p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">Manage Products</h3>
            <p className="text-gray-600">Edit or remove products with a clean and simple interface.</p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">View Products</h3>
            <p className="text-gray-600">Browse all products with detailed information and search options.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-center">What Users Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 px-4">
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-700 mb-4">
              "This app made product management so easy. Highly recommend!"
            </p>
            <p className="font-semibold">— Tanvir Islam</p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <p className="text-gray-700 mb-4">
              "Clean UI and smooth experience. Everything I needed in one place."
            </p>
            <p className="font-semibold">— Jane Doe</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-gray-700 mb-6">Login or register to manage your products now.</p>
        <div className="flex justify-center gap-4">
          <a
            href="/auth/login"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-500 transition"
          >
            Login
          </a>
          <a
            href="/auth/register"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300 transition"
          >
            Register
          </a>
        </div>
      </section>
    </div>
  );
}

