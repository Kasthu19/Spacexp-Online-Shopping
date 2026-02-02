const mongoose = require("mongoose");

// SizeStockSchema (same as before)
const SizeStockSchema = new mongoose.Schema({
  sizeLabel: String,
  countrySizes: {
    US: String,
    UK: String,
    EU: String,
    AU: String,
    JP: String
  },
  stock: { type: Number, default: 0 },
  sku: String
});

// ✅ UPDATED: VariantSchema for Task 9
const VariantSchema = new mongoose.Schema({
  color: String,
  colorCode: String,
  images: [String],
  video: String,                     // NEW: product video URL
  model3d: String,
  arOverlay: String,
  price: Number,
  originalPrice: Number,
  sizes: [SizeStockSchema],
  deliveryDate: String,              // NEW: delivery date
  deliveryTime: String,              // NEW: delivery time
  deliveryCharge: Number,            // NEW: delivery charge
  preDeliveryCharge: Number          // NEW: pre-delivery charge
});

const productSchema = mongoose.Schema({
  // KEEP all your Task 6 fields:
  name: { type: String, required: true },
  specifications: { type: Array, required: true },
  price: { type: Number, required: true },
  shippingTime: String,
  coverImage: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // ADD Task 8 fields:
  slug: { type: String, index: true },
  description: String,
  brand: String,
  category: String,
  tags: [String],
  basePrice: Number,
  variants: [VariantSchema],
  rating: { type: Number, default: 0 },
  totalSold: { type: Number, default: 0 },
  isDeal: Boolean,
  dealEnd: Date,

  // ✅ NEW for Task 9:
  similarProducts: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Products'  // Should match your model name
}]

}, { timestamps: true });

module.exports = mongoose.model("Products", productSchema);
// "Products" with capital P, plural