import React from 'react';
import { Slider } from '@mui/material';

const FilterSidebar = ({ filters, setFilters }) => {
  const categories = ['bat', 'ball', 'gloves', 'pads', 'helmets', 'clothing', 'shoes', 'accessories'];
  const brands = ['MRF', 'SS', 'Kookaburra', 'Gray Nicolls', 'New Balance', 'Adidas', 'Nike'];

  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, priceRange: newValue });
  };

  return (
    <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Categories</h4>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() => setFilters({ ...filters, category })}
                  className="mr-2"
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            </li>
          ))}
          <li>
            <button 
              onClick={() => setFilters({ ...filters, category: '' })}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear
            </button>
          </li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Price Range</h4>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          step={100}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Brands</h4>
        <ul className="space-y-2">
          {brands.map(brand => (
            <li key={brand}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brand === brand}
                  onChange={() => setFilters({ ...filters, brand })}
                  className="mr-2"
                />
                {brand}
              </label>
            </li>
          ))}
          <li>
            <button 
              onClick={() => setFilters({ ...filters, brand: '' })}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
