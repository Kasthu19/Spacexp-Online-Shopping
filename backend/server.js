const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// ============ SIMPLIFIED CORS ============
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5175'],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ============ REMOVE CSP HEADERS (DEVELOPMENT FIX) ============
app.use((req, res, next) => {
  // Don't set ANY CSP header at all
  next();
});

// ============ PROPER STATIC FILES CONFIGURATION ============
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(express.static(path.join(__dirname, 'public')));

// ============ DEBUG ROUTE ============
const User = require('./models/user');

app.post('/debug-signup', async (req, res) => {
    try {
        console.log('Debug signup:', req.body);
        
        const { email, password } = req.body;
        
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            email: email,
            password: hashedPassword,
            name: email.split('@')[0],
            role: 'customer'
        });
        
        await user.save();
        res.json({ success: true, user });
        
    } catch (error) {
        console.error('Debug signup error:', error);
        res.status(400).json({ 
            error: error.name, 
            message: error.message,
            details: error.errors 
        });
    }
});

// ============ TEST IMAGE ROUTE ============
app.get('/test-image', (req, res) => {
  res.json({
    message: 'Image test endpoint',
    testUrls: [
      'http://localhost:5000/images/headphones.jpg',
      'http://localhost:5000/images/shoes.jpg',
      'http://localhost:5000/images/watch.jpg'
    ]
  });
});

// ============ LIST ALL IMAGES ROUTE ============
const fs = require('fs');
app.get('/api/images', (req, res) => {
  const imagesDir = path.join(__dirname, 'public', 'images');
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error('Error reading images directory:', err);
      return res.status(500).json({ error: 'Cannot read images directory' });
    }
    
    const imageFiles = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );
    
    res.json({
      count: imageFiles.length,
      images: imageFiles,
      directory: imagesDir
    });
  });
});

// ============ TASK 8 ROUTES ============
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const contactRouter = require('./routes/contact');
const cartRouter = require('./routes/cart');

// ============ USE ALL ROUTES ============
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/', userRouter);
app.use('/product', productRouter);
app.use('/contact', contactRouter);
app.use('/cart', cartRouter);

const PORT = process.env.PORT || 5000;

// ✅ CORRECTED: Simple mongoose connection (remove the extra require lines)
mongoose.connect('mongodb://localhost:27017/spaceXP')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });