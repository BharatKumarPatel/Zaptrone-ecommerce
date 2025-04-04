import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const CouponForm = ({ coupon, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 10,
    minPurchaseAmount: 0,
    expiryDate: '',
    maxUses: null,
    isActive: true
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minPurchaseAmount: coupon.minPurchaseAmount || 0,
        expiryDate: coupon.expiryDate.split('T')[0],
        maxUses: coupon.maxUses || null,
        isActive: coupon.isActive
      });
    } else {
      // Set default expiry date to 30 days from now
      const defaultExpiry = new Date();
      defaultExpiry.setDate(defaultExpiry.getDate() + 30);
      setFormData(prev => ({
        ...prev,
        expiryDate: defaultExpiry.toISOString().split('T')[0]
      }));
    }
  }, [coupon]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {coupon ? 'Edit Coupon' : 'Create New Coupon'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
            <div className="flex">
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="flex-1 p-2 border border-gray-300 rounded-l-md"
                required
              />
              <button
                type="button"
                onClick={generateRandomCode}
                className="bg-gray-200 hover:bg-gray-300 px-3 rounded-r-md"
              >
                Generate
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formData.discountType === 'percentage' ? 'Discount Percentage' : 'Discount Amount (₹)'}
            </label>
            <input
              type="number"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleInputChange}
              min="1"
              max={formData.discountType === 'percentage' ? '100' : ''}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Purchase Amount (₹)</label>
            <input
              type="number"
              name="minPurchaseAmount"
              value={formData.minPurchaseAmount}
              onChange={handleInputChange}
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Uses (Leave empty for unlimited)</label>
            <input
              type="number"
              name="maxUses"
              value={formData.maxUses || ''}
              onChange={handleInputChange}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
            Active
          </label>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md"
          >
            {coupon ? 'Update Coupon' : 'Create Coupon'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CouponForm;
