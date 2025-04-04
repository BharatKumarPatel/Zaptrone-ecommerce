import React, { useState, useEffect } from 'react';
import axios from '../../backend/utils/api';
import { toast } from 'react-toastify';
import CouponForm from '../components/CouponForm';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('/api/coupons');
      setCoupons(response.data);
    } catch (err) {
      toast.error('Failed to fetch coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (couponId) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await axios.delete(`/api/coupons/${couponId}`);
        toast.success('Coupon deleted successfully');
        fetchCoupons();
      } catch (err) {
        toast.error('Failed to delete coupon');
      }
    }
  };

  const handleFormSubmit = async (couponData) => {
    try {
      if (editingCoupon) {
        await axios.put(`/api/coupons/${editingCoupon._id}`, couponData);
        toast.success('Coupon updated successfully');
      } else {
        await axios.post('/api/coupons', couponData);
        toast.success('Coupon created successfully');
      }
      setShowForm(false);
      setEditingCoupon(null);
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const getStatusBadge = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today ? 'Expired' : 'Active';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coupons Management</h1>
        <button
          onClick={() => {
            setEditingCoupon(null);
            setShowForm(true);
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Create Coupon
        </button>
      </div>

      {showForm && (
        <CouponForm
          coupon={editingCoupon}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingCoupon(null);
          }}
        />
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Purchase</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.map(coupon => (
              <tr key={coupon._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{coupon.code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {coupon.discountType === 'percentage' 
                    ? `${coupon.discountValue}%` 
                    : `₹${coupon.discountValue}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{coupon.minPurchaseAmount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    getStatusBadge(coupon.expiryDate) === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {getStatusBadge(coupon.expiryDate)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingCoupon(coupon);
                      setShowForm(true);
                    }}
                    className="text-yellow-600 hover:text-yellow-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {coupons.length === 0 && !showForm && (
        <div className="bg-white p-8 rounded-lg shadow-md text-center mt-6">
          <p className="text-gray-600">No coupons found. Create your first coupon!</p>
        </div>
      )}
    </div>
  );
};

export default Coupons;
