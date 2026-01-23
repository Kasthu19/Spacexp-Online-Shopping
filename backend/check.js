// check.js
const mongoose = require('mongoose');
require('dotenv').config();

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const Product = require('./models/product');
  const products = await Product.find();
  
  console.log('=== DATABASE CHECK ===');
  console.log('Total products:', products.length);
  
  products.forEach((p, i) => {
    console.log('\nProduct ' + (i+1) + ': ' + p.name);
    console.log('CoverImage:', p.coverImage);
    console.log('Model3D:', p.variants && p.variants[0] && p.variants[0].model3d ? 'YES' : 'NO');
  });
  
  mongoose.disconnect();
}

check().catch(console.error);