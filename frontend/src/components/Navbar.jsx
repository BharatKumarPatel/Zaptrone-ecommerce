import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-yellow-600">Zaptrone</span>
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for cricket equipment..."
                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600 focus:outline-none">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `text-gray-700 hover:text-yellow-600 ${isActive ? 'font-medium text-yellow-600' : ''}`
              }
            >
              Shop
            </NavLink>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Link to="/cart" className="text-gray-700 hover:text-yellow-600 relative">
                    <FaShoppingCart className="text-xl" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
                
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-yellow-600">
                    <FaUser className="text-lg" />
                    <span>{user?.name.split(' ')[0]}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-yellow-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="text-gray-700 hover:text-yellow-600 relative mr-4">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="outline-none mobile-menu-button">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="hidden mobile-menu md:hidden">
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <NavLink
            to="/products"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50"
          >
            Shop
          </NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50"
              >
                My Profile
              </NavLink>
              <NavLink
                to="/my-orders"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50"
              >
                My Orders
              </NavLink>
              <button
                onClick={logout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-yellow-600 hover:bg-yellow-50"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
