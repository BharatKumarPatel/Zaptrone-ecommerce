const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true, select: '-password' }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add address
router.post('/address', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $push: { addresses: req.body } },
      { new: true, select: '-password' }
    );
    res.json(user.addresses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete address
router.delete('/address/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { addresses: { _id: req.params.id } } },
      { new: true, select: '-password' }
    );
    res.json(user.addresses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user status (admin only)
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, select: '-password' }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
