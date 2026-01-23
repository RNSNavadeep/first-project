'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockProducts } from '../../lib/mockProducts';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const product = mockProducts.find(
    (p) => String(p.id) === String(id)
  );

  const [selectedSize, setSelectedSize] = useState(null);

  // ✅ ADD TO CART (NO REDIRECT)
  const addToCart = (product, selectedSize) => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('userCart')) || [];

    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: selectedSize,
        quantity: 1,
      });
    }

    localStorage.setItem('userCart', JSON.stringify(cart));
    alert('Product added to cart');
  };

  // ✅ BUY NOW → PAYMENT PAGE ONLY
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }

    localStorage.setItem(
      'buyNowOrder',
      JSON.stringify({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        size: selectedSize,
        quantity: 1,
      })
    );

    router.push('/payment');
  };

  if (!product) {
    return <h1 className="text-center mt-20">Product not found</h1>;
  }

  // 🔹 RELATED PRODUCTS
  const relatedProducts = mockProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.subcategory === product.subcategory ||
          p.bodyType === product.bodyType)
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F2E9E4] py-10 px-6">
      {/* MAIN PRODUCT */}
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded-xl"
        />

        <div>
          <h1 className="text-3xl font-bold text-[#7B2CBF] mb-3">
            {product.name}
          </h1>

          <p className="text-gray-700 mb-2">
            <strong>Fabric:</strong> {product.fabric}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Suitable Skin Tones:</strong> {product.skinTones.join(', ')}
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Body Type:</strong> {product.bodyType}
          </p>

          <p className="text-2xl font-bold text-[#7B2CBF] mb-6">
            ₹{product.price.toLocaleString()}
          </p>

          {/* SIZE */}
          <div className="mb-6">
            <p className="font-semibold mb-3 text-gray-800">Select Size</p>

            <div className="flex gap-3 flex-wrap">
              {product.bodySizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2 rounded-full font-semibold transition-all
                    ${
                      selectedSize === size
                        ? 'bg-[#7B2CBF] text-white shadow-lg scale-105'
                        : 'bg-white text-[#7B2CBF] border-2 border-[#7B2CBF] hover:bg-purple-100'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product, selectedSize)}
              className="flex-1 bg-[#7B2CBF] text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 border-2 border-[#7B2CBF] text-[#7B2CBF] py-3 rounded-lg font-semibold hover:bg-purple-100 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* YOU MAY ALSO LIKE */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center text-[#7B2CBF] mb-10">
            You May Also Like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">
                    {item.name}
                  </h3>

                  <p className="text-[#7B2CBF] font-bold mb-4">
                    ₹{item.price}
                  </p>

                  <Link
                    href={`/product/${item.id}`}
                    className="block text-center bg-[#7B2CBF] text-white py-2 rounded-lg font-semibold hover:bg-purple-800 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




