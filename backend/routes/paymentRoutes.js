const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  const { amount, currency, receipt } = req.body;
  
  const options = {
    amount: amount * 100, // amount in paise
    currency,
    receipt
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify payment
router.post('/verify-payment', async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(order_id + "|" + payment_id);
  const generated_signature = hmac.digest('hex');
  
  if (generated_signature === signature) {
    // Update order status in database
    try {
      await Order.findByIdAndUpdate(order_id, {
        paymentStatus: 'completed',
        razorpayPaymentId: payment_id,
        razorpaySignature: signature
      });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
});

module.exports = router;
