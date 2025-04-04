import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const addToCart = () => {
    // Implement cart functionality
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product._id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={product.images[0] || '/images/default-product.jpg'} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-yellow-600">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
        
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={i < product.ratings ? 'text-yellow-500' : 'text-gray-300'} 
            />
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
          <button 
            onClick={addToCart}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
