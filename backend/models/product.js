const mongoose = require("mongoose");

// NEW: SizeStockSchema for Task 8
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

// NEW: VariantSchema for Task 8
const VariantSchema = new mongoose.Schema({
  color: String,
  colorCode: String,
  images: [String],
  model3d: String,
  arOverlay: String,
  price: Number,
  originalPrice: Number,
  sizes: [SizeStockSchema]
});

const productSchema = mongoose.Schema({
  // KEEP all your Task 6 fields:
  name: {
    type: String,
    required: true
  },
  specifications: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  shippingTime: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  
  // ADD Task 8 fields:
  slug: { type: String, index: true },
  description: String,
  brand: String,
  category: String,
  tags: [String],
  basePrice: Number,
  variants: [VariantSchema], // NEW: Product variants
  rating: { type: Number, default: 0 },
  totalSold: { type: Number, default: 0 },
  isDeal: Boolean,
  dealEnd: Date
  
}, { timestamps: true });

module.exports = mongoose.model("Products", productSchema);