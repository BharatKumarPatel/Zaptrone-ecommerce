import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 10000],
    brand: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = '/api/products';
        const queryParams = [];
        
        if (filters.category) queryParams.push(`category=${filters.category}`);
        if (filters.brand) queryParams.push(`brand=${filters.brand}`);
        queryParams.push(`minPrice=${filters.priceRange[0]}`);
        queryParams.push(`maxPrice=${filters.priceRange[1]}`);
        
        if (queryParams.length > 0) {
          url += `?${queryParams.join('&')}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Cricket Equipment</h1>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
