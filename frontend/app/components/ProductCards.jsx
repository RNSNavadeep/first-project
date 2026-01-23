'use client';

import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">

      {/* Image */}
      <div className="relative">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
          <button
            onClick={() => router.push(`/product/${product.id}`)}
            className="bg-white text-[#7B2CBF] px-4 py-2 rounded-lg font-semibold hover:bg-purple-100"
          >
            View Details
          </button>

          <button
            onClick={() => alert('Added to cart')}
            className="bg-[#7B2CBF] text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-800"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 text-center">
        <h3 className="font-bold text-lg text-gray-900">
          {product.name}
        </h3>
        <p className="text-[#7B2CBF] font-bold mt-1">
          {product.price}
        </p>
      </div>
    </div>
  );
}
