import { useState } from 'react';
import ComingSoon from '../pages/comingSoon'; 

const products: any[] = []; 
const ITEMS_PER_PAGE = 6;

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (products.length === 0) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        <ComingSoon />
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen flex flex-col py-35">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-cyan-600 to-blue-800 py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <h1 className="text-5xl font-extrabold relative z-10">Welcome to the Tech Hub</h1>
        <p className="mt-4 text-lg relative z-10 text-gray-200">
          Cutting-edge gear, gadgets & tools for developers, creators & IT professionals.
        </p>
      </header>

      {/* Product Grid */}
      <section className="py-12 px-6 md:px-12 bg-gray-950">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {paginatedProducts.map(({ id, title, price, image }) => (
            <div key={id} className="px-3 py-3 rounded-lg bg-gray-800 overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
              <img src={image} alt={title} className="w-full h-64 object-cover bg-gray-600/60 rounded-2xl" />
              <div className="p-5">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-400 mt-2">{price}</p>
                <button className="mt-4 w-full bg-[#171723] hover:bg-[#847FAD] text-white py-2 px-4 rounded-full transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-full ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ShopPage;
