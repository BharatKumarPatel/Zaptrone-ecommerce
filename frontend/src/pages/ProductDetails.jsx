import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FaStar, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        toast.error('Failed to load product');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-yellow-600 mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 border-2 rounded-md overflow-hidden ${selectedImage === index ? 'border-yellow-500' : 'border-gray-200'}`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.brand}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < product.ratings ? 'text-yellow-500' : 'text-gray-300'} 
                />
              ))}
              <span className="ml-2 text-gray-600">({product.reviews.length} reviews)</span>
            </div>
            <span className="text-green-600 font-medium">In Stock: {product.stock}</span>
          </div>

          <div className="text-3xl font-bold text-gray-800 mb-6">₹{product.price.toLocaleString()}</div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Specifications</h3>
            <ul className="space-y-1 text-gray-700">
              <li><span className="font-medium">Category:</span> {product.category}</li>
              <li><span className="font-medium">Material:</span> {product.specifications?.material || 'Not specified'}</li>
              <li><span className="font-medium">Weight:</span> {product.specifications?.weight || 'Not specified'}</li>
              <li><span className="font-medium">Color:</span> {product.specifications?.color || 'Not specified'}</li>
            </ul>
          </div>

          <div className="flex items-center mb-6">
            <label className="mr-4 font-medium">Quantity:</label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product, quantity);
                navigate('/checkout');
              }}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-md"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        {product.reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                  <h4 className="font-medium">{review.user.name}</h4>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
