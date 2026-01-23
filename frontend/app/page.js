'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from './components/ProductCards.jsx';



export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const mainCategories = [
    {
      id: 'men',
      label: 'Men',
      bgImage: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Men ethnic/casual
    },
    {
      id: 'women',
      label: 'Women',
      bgImage: 'https://cdn.pixabay.com/photo/2018/06/25/17/01/fashion-3497408_1280.jpg', // Women saree/kurti
    },
    {
      id: 'kids',
      label: 'Kids',
      bgImage: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Kids clothing
    },
    {
      id: 'combo',
      label: 'Combo',
      bgImage: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Family/combo outfits
    },
  ];

  const subCategories = {
    men: [
      { label: 'Fabrics', slug: 'fabrics' },
      { label: 'Casual Wear', slug: 'casual-wear' },
      { label: 'Designer Wear', slug: 'designer-wear' },
      { label: 'Ethnic Wear', slug: 'ethnic-wear' },
      { label: 'Office Wear', slug: 'office-wear' },
      { label: 'Uniform Designs', slug: 'uniform-designs' },
    ],
    women: [
      { label: 'Fabrics', slug: 'fabrics' },
      { label: 'Casual Dresses', slug: 'casual-dresses' },
      { label: 'Designer Wear', slug: 'designer-wear' },
      { label: 'Ethnic Wear', slug: 'ethnic-wear' },
      { label: 'Office Wear', slug: 'office-wear' },
      { label: 'Uniform Designs', slug: 'uniform-designs' },
    ],
    kids: [
      { label: 'Fabrics', slug: 'fabrics' },
      { label: 'Playwear', slug: 'playwear' },
      { label: 'Occasion Wear', slug: 'occasion-wear' },
      { label: 'School Uniforms', slug: 'school-uniforms' },
      { label: 'Infant Wear', slug: 'infant-wear' },
      { label: 'Theme Costumes', slug: 'theme-costumes' },
    ],
    combo: [
      { label: 'Co-ord Sets', slug: 'co-ord-sets' },
      { label: 'Suit Sets', slug: 'suit-sets' },
      { label: 'Tracksuits', slug: 'tracksuits' },
      { label: 'Lounge Sets', slug: 'lounge-sets' },
      { label: 'Accessory Bundles', slug: 'accessory-bundles' },
      { label: 'Innerwear Packs', slug: 'innerwear-packs' },
    ],
  };

  const currentSubs = selectedCategory ? subCategories[selectedCategory] || [] : [];

  // Mock newly arrived products (visible always at bottom)
  const newProducts = [
    { id: 1, name: 'Floral Kurti Set', price: '₹999', img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, name: 'Men Ethnic Kurta', price: '₹1299', img: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, name: 'Kids Party Dress', price: '₹799', img: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 4, name: 'Combo Lounge Set', price: '₹1499', img: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];
const filteredProducts = newProducts.filter((product) =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase())
);

  const handleSubCategoryClick = (mainCat, subSlug) => {
    router.push(`/products/${mainCat}/${subSlug}`);
  };

  return (
    <div className="min-h-screen bg-[#F2E9E4] flex flex-col">
      {/* Header */}
      <header className="bg-[#7B2CBF] text-white p-4 flex flex-col md:flex-row items-center justify-between shadow-lg">
        <div className="mb-3 md:mb-0">
          <img
            src="https://via.placeholder.com/200x60/4B0082/FFFFFF?text=DressForMe+Logo"
            alt="DressForMe Logo"
            className="h-12 md:h-14 object-contain"
          />
        </div>

        <div className="w-full max-w-2xl mx-auto mb-3 md:mb-0">
          <div className="relative">
            <input
  type="text"
  placeholder="Search dresses, kurtis, sarees..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full py-3 px-5 pr-20 rounded-full bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD166] shadow-md"
/>

            <button
              onClick={() => alert('Voice search coming soon!')}
              title="Voice Search"
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 116 0v6a3 3 01-3 3z" />
              </svg>
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-lg">
          <a href="/login" className="hover:underline">Login</a>
          <a href="/signup" className="hover:underline">Signup</a>
          <a href="/profile" title="Profile" className="hover:text-[#FFD166] transition">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </a>
        </div>
      </header>

      {/* Main Category Cards with Background Images */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mainCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`
                relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300
                border-4 border-transparent group
                ${selectedCategory === cat.id ? 'border-[#FFD166] scale-105' : 'hover:border-[#FFD166]/70'}
              `}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.bgImage})` }}
              >
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-all duration-300"></div>
              </div>
              <div className="relative h-full flex items-center justify-center z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl tracking-wide">
                  {cat.label}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Dynamic Sub-Categories (only after click) */}
      {selectedCategory && currentSubs.length > 0 && (
        <section className="py-10 px-6 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#7B2CBF]">
            {mainCategories.find(c => c.id === selectedCategory)?.label} Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {currentSubs.map((sub, i) => (
              <div
                key={i}
                onClick={() => router.push(`/products/${selectedCategory}/${sub.slug}`)}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <img
                  src={`https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&fit=crop&h=300`}
                  alt={sub.label}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 text-center font-semibold text-gray-800">
                  {sub.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Newly Arrived Products - always visible */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#7B2CBF]">
          Newly Arrived
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
  <ProductCard key={product.id} product={product} />
))}

        </div>
      </section>

      {/* Small Footer with icons */}
      <footer className="bg-[#7B2CBF] text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center md:text-left text-sm">
          <div>
            <h4 className="font-bold mb-2">About DressForMe</h4>
            <p className="text-gray-200">Personalized fashion for every occasion.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Quick Links</h4>
            <ul className="text-gray-200 space-y-1">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline">Refund Policy</a></li>
              <li><a href="#" className="hover:underline">Help & Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Contact Us</h4>
            <p className="text-gray-200">
              support@dressforme.com<br />
              +91 98765 43210
            </p>
          </div>
          <div>
  <h4 className="font-bold mb-2">Follow Us</h4>
  <div className="flex justify-center md:justify-start space-x-6">
    {/* Instagram Icon */}
    <a 
      href="#" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-3xl hover:text-[#FFD166] transition"
      title="Instagram"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 2.578.225 0 2.803 0 7.278c-.014 1.28-.014 1.689-.014 4.948s0 3.668.014 4.948C0 21.197 2.578 23.775 7.052 23.928 8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.474-.153 7.052-2.731 7.052-7.206 0-3.28.014-3.689.014-4.948s0-3.668-.014-4.948C24 2.803 21.422.225 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm7.846-11.846a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
      </svg>
    </a>

    {/* Facebook Icon */}
    <a 
      href="#" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-3xl hover:text-[#FFD166] transition"
      title="Facebook"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
      </svg>
    </a>

    {/* YouTube Icon */}
    <a 
      href="#" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-3xl hover:text-[#FFD166] transition"
      title="YouTube"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.006 3.006 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.006 3.006 0 00.501 6.186C0 8.07 0 12 0 12s0 3.93.501 5.814a3.006 3.006 0 002.122 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.006 3.006 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    </a>
  </div>
</div>
        </div>
        <div className="text-center text-xs text-gray-300 mt-6 pt-4 border-t border-purple-600">
          © {new Date().getFullYear()} DressForMe. All rights reserved.
        </div>
      </footer>
    </div>
  );
}



