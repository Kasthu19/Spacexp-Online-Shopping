const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },  // CHANGED to String
  name: String,
  price: Number,
  qty: Number
});

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // CHANGED to String
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