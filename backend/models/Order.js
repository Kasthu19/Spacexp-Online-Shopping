const mongoose = require('mongoose');

// ✅ UPDATED OrderItemSchema with delivery info
const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: String,
  price: Number,
  qty: Number,
  // NEW fields for Task 9:
  deliveryDate: String,    // NEW
  deliveryTime: String,    // NEW
  deliveryCharge: Number   // NEW
});

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [OrderItemSchema],
  subtotal: Number,
  discount: Number,
  shipping: Number,
  total: Number,
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'], 
    default: 'pending' 
  },
  orderStatus: { 
    type: String, 
    enum: ['created', 'processing', 'delivered', 'cancelled'], 
    default: 'created' 
  },
  payherePaymentId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);