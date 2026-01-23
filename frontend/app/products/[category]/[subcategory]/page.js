'use client';

import { useParams } from 'next/navigation';
import { mockProducts } from '../../../lib/mockProducts';

import Link from 'next/link';


export default function SubCategoryProductsPage() {
  const params = useParams();

  const category = decodeURIComponent(params.category);
  const subcategory = decodeURIComponent(params.subcategory);

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.category === category &&
      product.subcategory === subcategory
  );

  return (
    <div className="min-h-screen bg-[#F2E9E4] py-12 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#7B2CBF]">
        {subcategory.replace(/-/g, ' ').toUpperCase()} IN {category.toUpperCase()}
      </h1>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-xl text-gray-700">
          <p>No products found in this category yet.</p>
          <p className="mt-4">Check back soon or explore other categories!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover"
              />

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>

                <p className="text-gray-600 mb-1">
                  <strong>Fabric:</strong> {product.fabric}
                </p>

                <p className="text-[#7B2CBF] font-bold text-lg mb-4">
                  ₹{product.price}
                </p>

                <div className="mt-auto flex gap-3">
                  <button className="flex-1 bg-[#7B2CBF] text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition">
                    Add to Cart
                  </button>
                  <Link
  href={`/product/${product.id}`}
  className="flex-1 border-2 border-[#7B2CBF] text-[#7B2CBF] py-3 rounded-lg font-semibold hover:bg-purple-100 transition text-center"
>
  View Details
</Link>


                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
