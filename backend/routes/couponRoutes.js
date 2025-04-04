const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Create coupon (admin only)
router.post('/', adminMiddleware, async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all coupons (admin only)
router.get('/', adminMiddleware, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get coupon by code
router.get('/:code', async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ 
      code: req.params.code.toUpperCase(),
      expiryDate: { $gt: new Date() },
      isActive: true,
      $or: [
        { maxUses: null },
        { $expr: { $lt: ['$usedCount', '$maxUses'] } }
      ]
    });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found or expired' });
    }

    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update coupon (admin only)
router.put('/:id', adminMiddleware, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(coupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete coupon (admin only)
router.delete('/:id', adminMiddleware, async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Apply coupon to order
router.post('/:code/apply', async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const coupon = await Coupon.findOne({ 
      code: req.params.code.toUpperCase(),
      expiryDate: { $gt: new Date() },
      isActive: true,
      $or: [
        { maxUses: null },
        { $expr: { $lt: ['$usedCount', '$maxUses'] } }
      ]
    });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not valid' });
    }

    // Check minimum purchase amount
    if (totalAmount < coupon.minPurchaseAmount) {
      return res.status(400).json({ 
        message: `Minimum purchase amount of ₹${coupon.minPurchaseAmount} required`
      });
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = totalAmount * (coupon.discountValue / 100);
    } else {
      discountAmount = Math.min(coupon.discountValue, totalAmount);
    }

    res.json({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount,
      finalAmount: totalAmount - discountAmount
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
