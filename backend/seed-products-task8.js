// backend/seed-products-task8.js
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/product');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Clear existing data
  await Product.deleteMany({});
  console.log('Cleared existing data');
  
  // ALL PRODUCTS
  const products = [
    // Existing 3 products
    {
      name: "Premium Wireless Headphones",
      slug: "premium-wireless-headphones",
      description: "Noise-cancelling wireless headphones with 3D audio",
      brand: "AudioTech",
      category: "Electronics",
      price: 299.99,
      coverImage: "headphones.jpg",
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["headphones-1.jpg", "headphones-2.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 299.99,
          originalPrice: 349.99
        }
      ],
      rating: 4.5,
      isDeal: true,
      dealEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      shippingTime: "2-3 days"
    },
    {
      name: "Running Shoes Pro",
      slug: "running-shoes-pro",
      description: "Lightweight running shoes with cushion technology",
      brand: "RunFast",
      category: "Footwear",
      price: 89.99,
      coverImage: "shoes.jpg",
      variants: [
        {
          color: "Blue",
          colorCode: "#2563EB",
          images: ["shoes-1.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb",
          price: 89.99,
          originalPrice: 119.99
        }
      ],
      rating: 4.7,
      shippingTime: "3-5 days"
    },
    {
      name: "Smart Watch Series X",
      slug: "smart-watch-series-x",
      description: "Advanced smartwatch with health monitoring",
      brand: "TechWear",
      category: "Electronics",
      price: 199.99,
      coverImage: "watch.jpg",
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["watch-1.jpg", "watch-2.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 199.99,
          originalPrice: 249.99
        }
      ],
      rating: 4.6,
      isDeal: true,
      shippingTime: "1-2 days"
    },
    
    // NEW PRODUCTS - Based on your images
    {
      name: "Digital Alarm Clock",
      slug: "digital-alarm-clock",
      description: "Modern digital alarm clock with LED display",
      brand: "TimeMaster",
      category: "Home",
      price: 24.99,
      coverImage: "clock.jpg",
      variants: [
        {
          color: "White",
          colorCode: "#FFFFFF",
          images: ["clock-1.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 24.99,
          originalPrice: 29.99
        }
      ],
      rating: 4.3,
      shippingTime: "2-3 days"
    },
    {
      name: "Insulated Water Bottle",
      slug: "insulated-water-bottle",
      description: "Stainless steel insulated water bottle, keeps drinks cold for 24 hours",
      brand: "HydroFlow",
      category: "Sports",
      price: 34.99,
      coverImage: "Water Bottle.jpg",
      variants: [
        {
          color: "Silver",
          colorCode: "#C0C0C0",
          images: ["Water Bottle.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 34.99,
          originalPrice: 39.99
        }
      ],
      rating: 4.8,
      isDeal: true,
      shippingTime: "1-2 days"
    },
    {
      name: "Leather Hand Bag",
      slug: "leather-hand-bag",
      description: "Genuine leather handbag with multiple compartments",
      brand: "FashionStyle",
      category: "Fashion",
      price: 79.99,
      coverImage: "Hand Bag.jpg",
      variants: [
        {
          color: "Brown",
          colorCode: "#8B4513",
          images: ["Hand Bag.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 79.99,
          originalPrice: 99.99
        }
      ],
      rating: 4.4,
      shippingTime: "3-5 days"
    },
    {
      name: "Baby Winter Cap",
      slug: "baby-winter-cap",
      description: "Warm and cozy winter cap for babies",
      brand: "BabyComfort",
      category: "Kids",
      price: 14.99,
      coverImage: "Baby Winter Cap.jpg",
      variants: [
        {
          color: "Blue",
          colorCode: "#3B82F6",
          images: ["Baby Winter Cap.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 14.99,
          originalPrice: 19.99
        }
      ],
      rating: 4.7,
      shippingTime: "1-2 days"
    },
    {
      name: "Kids Slippers",
      slug: "kids-slippers",
      description: "Soft and comfortable slippers for kids",
      brand: "ComfyFeet",
      category: "Kids",
      price: 12.99,
      coverImage: "Kids Slippers.jpg",
      variants: [
        {
          color: "Pink",
          colorCode: "#EC4899",
          images: ["Kids Slippers.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 12.99,
          originalPrice: 16.99
        }
      ],
      rating: 4.5,
      shippingTime: "2-3 days"
    },
    {
      name: "Stylish Footwear",
      slug: "stylish-footwear",
      description: "Trendy casual shoes for everyday wear",
      brand: "UrbanSteps",
      category: "Footwear",
      price: 59.99,
      coverImage: "Stylish Footwear.jpg",
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["Stylish Footwear.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 59.99,
          originalPrice: 79.99
        }
      ],
      rating: 4.6,
      shippingTime: "3-5 days"
    },
    {
      name: "Premium Sunglasses",
      slug: "premium-sunglasses",
      description: "UV protection sunglasses with polarized lenses",
      brand: "SunShield",
      category: "Fashion",
      price: 39.99,
      coverImage: "Sun Glasses.jpg",
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["Sun Glasses.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 39.99,
          originalPrice: 49.99
        }
      ],
      rating: 4.4,
      shippingTime: "1-2 days"
    },
    {
      name: "Phone Case",
      slug: "phone-case",
      description: "Protective phone case with shock absorption",
      brand: "PhoneGuard",
      category: "Electronics",
      price: 19.99,
      coverImage: "Phone case.jpg",
      variants: [
        {
          color: "Clear",
          colorCode: "#F0F8FF",
          images: ["Phone case.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 19.99,
          originalPrice: 24.99
        }
      ],
      rating: 4.2,
      shippingTime: "1-2 days"
    },
    {
      name: "Wooden Cupboard",
      slug: "wooden-cupboard",
      description: "Solid wooden cupboard for storage",
      brand: "HomeStyle",
      category: "Furniture",
      price: 199.99,
      coverImage: "Cupboard.jpg",
      variants: [
        {
          color: "Brown",
          colorCode: "#8B4513",
          images: ["Cupboard.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 199.99,
          originalPrice: 249.99
        }
      ],
      rating: 4.5,
      shippingTime: "5-7 days"
    },
    {
      name: "Bedside Nightstands",
      slug: "bedside-nightstands",
      description: "Pair of wooden nightstands with drawers",
      brand: "HomeStyle",
      category: "Furniture",
      price: 89.99,
      coverImage: "Nightstands.jpg",
      variants: [
        {
          color: "White",
          colorCode: "#FFFFFF",
          images: ["Nightstands.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 89.99,
          originalPrice: 119.99
        }
      ],
      rating: 4.6,
      shippingTime: "4-6 days"
    },
    {
      name: "Pencil Container",
      slug: "pencil-container",
      description: "Creative pencil holder for desk organization",
      brand: "OfficePro",
      category: "Stationery",
      price: 9.99,
      coverImage: "Pencil Container.jpg",
      variants: [
        {
          color: "Multi",
          colorCode: "#FF6B6B",
          images: ["Pencil Container.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 9.99,
          originalPrice: 14.99
        }
      ],
      rating: 4.3,
      shippingTime: "1-2 days"
    },
    {
      name: "Cat Keychain",
      slug: "cat-keychain",
      description: "Cute cat-shaped keychain",
      brand: "FunAccessories",
      category: "Accessories",
      price: 7.99,
      coverImage: "Cat keychain.jpg",
      variants: [
        {
          color: "Yellow",
          colorCode: "#FBBF24",
          images: ["Cat keychain.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 7.99,
          originalPrice: 9.99
        }
      ],
      rating: 4.7,
      shippingTime: "1-2 days"
    },
    {
      name: "Coffee Mug",
      slug: "coffee-mug",
      description: "Ceramic coffee mug with handle",
      brand: "HomeStyle",
      category: "Kitchen",
      price: 12.99,
      coverImage: "Coffee Mug.jpg",
      variants: [
        {
          color: "White",
          colorCode: "#FFFFFF",
          images: ["Coffee Mug.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 12.99,
          originalPrice: 16.99
        }
      ],
      rating: 4.4,
      shippingTime: "1-2 days"
    },
    {
      name: "Cat Shaped Bed",
      slug: "cat-shaped-bed",
      description: "Cozy cat-shaped bed for pets",
      brand: "PetComfort",
      category: "Pets",
      price: 29.99,
      coverImage: "Cat shaped bed.jpg",
      variants: [
        {
          color: "Gray",
          colorCode: "#6B7280",
          images: ["Cat shaped bed.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 29.99,
          originalPrice: 39.99
        }
      ],
      rating: 4.8,
      shippingTime: "2-3 days"
    },
    {
      name: "Kitty Rocking Chair",
      slug: "kitty-rocking-chair",
      description: "Small rocking chair with cat design",
      brand: "KidsFun",
      category: "Furniture",
      price: 49.99,
      coverImage: "Kitty Rocking Chair.jpg",
      variants: [
        {
          color: "Pink",
          colorCode: "#F472B6",
          images: ["Kitty Rocking Chair.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 49.99,
          originalPrice: 69.99
        }
      ],
      rating: 4.6,
      shippingTime: "3-5 days"
    },
    {
      name: "Teddy Bear",
      slug: "teddy-bear",
      description: "Soft and cuddly teddy bear",
      brand: "ToyWorld",
      category: "Toys",
      price: 19.99,
      coverImage: "tedy.jpg",
      variants: [
        {
          color: "Brown",
          colorCode: "#92400E",
          images: ["tedy.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 19.99,
          originalPrice: 24.99
        }
      ],
      rating: 4.9,
      shippingTime: "1-2 days"
    },
    {
      name: "Gaming Laptop",
      slug: "gaming-laptop",
      description: "High-performance gaming laptop",
      brand: "TechPro",
      category: "Electronics",
      price: 1299.99,
      coverImage: "laptop.jpg",
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["laptop.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 1299.99,
          originalPrice: 1499.99
        }
      ],
      rating: 4.7,
      isDeal: true,
      shippingTime: "3-5 days"
    },
    {
      name: "Travel Backpack",
      slug: "travel-backpack",
      description: "Durable backpack for travel",
      brand: "TravelGear",
      category: "Travel",
      price: 49.99,
      coverImage: "bag.jpg",
      variants: [
        {
          color: "Blue",
          colorCode: "#1D4ED8",
          images: ["bag.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 49.99,
          originalPrice: 64.99
        }
      ],
      rating: 4.5,
      shippingTime: "2-3 days"
    },
    {
      name: "Baseball Cap",
      slug: "baseball-cap",
      description: "Adjustable baseball cap",
      brand: "SportStyle",
      category: "Fashion",
      price: 17.99,
      coverImage: "cap.jpg",
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["cap.jpg"],
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 17.99,
          originalPrice: 22.99
        }
      ],
      rating: 4.3,
      shippingTime: "1-2 days"
    }
  ];

  // Insert all products
  await Product.insertMany(products);
  
  console.log(`✅ Seed data created successfully!`);
  console.log(`🎯 Total products inserted: ${products.length}`);
  
  mongoose.disconnect();
}

seed().catch(console.error);