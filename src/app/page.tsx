import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Modern <span className="text-pink-500">Ecommerce</span>
        </h1>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example Product Card */}
          <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400">Product Image</span>
            </div>
            <h3 className="font-bold text-xl">Premium Hoodie</h3>
            <p className="text-gray-600 mb-4">$59.99</p>
            <button className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
