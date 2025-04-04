const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['bat', 'ball', 'gloves', 'pads', 'helmets', 'clothing', 'shoes', 'accessories']
  },
  brand: { type: String, required: true },
  images: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  ratings: { type: Number, default: 0 },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true },
    comment: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
