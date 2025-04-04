import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaHome } from 'react-icons/fa';

const OrderSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
          You will receive a confirmation email shortly with your order details.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-2">What's Next?</h2>
          <ul className="text-left space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="inline-block bg-yellow-100 text-yellow-800 rounded-full p-1 mr-2">
                1
              </span>
              <span>We'll prepare your items for shipping</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-yellow-100 text-yellow-800 rounded-full p-1 mr-2">
                2
              </span>
              <span>You'll receive a notification when your order ships</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block bg-yellow-100 text-yellow-800 rounded-full p-1 mr-2">
                3
              </span>
              <span>Track your order using the link in your email</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/my-orders"
            className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md"
          >
            <FaShoppingBag className="mr-2" /> View My Orders
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-md"
          >
            <FaHome className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
