const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { 
    type: String, 
    required: true,
    unique: true,
    uppercase: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 1
  },
  minPurchaseAmount: {
    type: Number,
    default: 0
  },
  expiryDate: {
    type: Date,
    required: true
  },
  maxUses: {
    type: Number,
    default: null
  },
  usedCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Validate discount value based on type
couponSchema.pre('save', function(next) {
  if (this.discountType === 'percentage' && this.discountValue > 100) {
    throw new Error('Percentage discount cannot exceed 100%');
  }
  next();
});

// Index for code and expiry date
couponSchema.index({ code: 1, expiryDate: 1 });

module.exports = mongoose.model('Coupon', couponSchema);
