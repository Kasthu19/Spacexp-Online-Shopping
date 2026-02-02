const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/product');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  
  // Clear existing data
  await Product.deleteMany({});
  console.log('Cleared existing data');
  
  // SAMPLE VIDEO URLs (free to use)
  const sampleVideos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  ];

  // Function to get random video
  const getRandomVideo = () => sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
  
  // Function to get random delivery date (next 7-14 days)
  const getRandomDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 7) + 7);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };
  
  // Function to get random delivery time
  const getRandomDeliveryTime = () => {
    const times = ["1-2 days", "2-3 days", "3-5 days", "5-7 days"];
    return times[Math.floor(Math.random() * times.length)];
  };
  
  // Function to get random delivery charge
  const getRandomDeliveryCharge = () => Math.floor(Math.random() * 20) + 5;
  
  // Function to get random pre-delivery charge
  const getRandomPreDeliveryCharge = () => Math.floor(Math.random() * 10) + 2;

  // ALL PRODUCTS - UPDATED FOR TASK 9 (WITH ALL YOUR PRODUCTS)
  const products = [
    {
      name: "Premium Wireless Headphones",
      slug: "premium-wireless-headphones",
      description: "Noise-cancelling wireless headphones with 3D audio",
      brand: "AudioTech",
      category: "Electronics",
      price: 299.99,
      coverImage: "headphones.jpg",
      specifications: ["Wireless: Yes", "Battery: 30 hours", "Noise Cancelling: Yes", "Bluetooth: 5.2"],
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["headphones-1.jpg", "headphones-2.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 299.99,
          originalPrice: 349.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.5,
      isDeal: true,
      dealEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      shippingTime: "2-3 days",
      similarProducts: []
    },
    {
      name: "Running Shoes Pro",
      slug: "running-shoes-pro",
      description: "Lightweight running shoes with cushion technology",
      brand: "RunFast",
      category: "Footwear",
      price: 89.99,
      coverImage: "shoes.jpg",
      specifications: ["Material: Mesh", "Weight: 250g", "Water Resistant: Yes", "Sole: Rubber"],
      variants: [
        {
          color: "Blue",
          colorCode: "#2563EB",
          images: ["shoes-1.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb",
          price: 89.99,
          originalPrice: 119.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.7,
      shippingTime: "3-5 days",
      similarProducts: []
    },
    {
      name: "Smart Watch Series X",
      slug: "smart-watch-series-x",
      description: "Advanced smartwatch with health monitoring",
      brand: "TechWear",
      category: "Electronics",
      price: 199.99,
      coverImage: "watch.jpg",
      specifications: ["Battery: 7 days", "Display: AMOLED", "Waterproof: Yes", "GPS: Yes"],
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["watch-1.jpg", "watch-2.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 199.99,
          originalPrice: 249.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.6,
      isDeal: true,
      shippingTime: "1-2 days",
      similarProducts: []
    },
    {
      name: "Digital Alarm Clock",
      slug: "digital-alarm-clock",
      description: "Modern digital alarm clock with LED display",
      brand: "TimeMaster",
      category: "Home",
      price: 24.99,
      coverImage: "clock.jpg",
      specifications: ["Display: LED", "Power: Battery/AC", "Alarms: 2", "Dimming: Yes"],
      variants: [
        {
          color: "White",
          colorCode: "#FFFFFF",
          images: ["clock-1.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 24.99,
          originalPrice: 29.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.3,
      shippingTime: "2-3 days",
      similarProducts: []
    },
    {
      name: "Insulated Water Bottle",
      slug: "insulated-water-bottle",
      description: "Stainless steel insulated water bottle, keeps drinks cold for 24 hours",
      brand: "HydroFlow",
      category: "Sports",
      price: 34.99,
      coverImage: "Water Bottle.jpg",
      specifications: ["Capacity: 1L", "Material: Stainless Steel", "Insulation: 24h cold", "Lid Type: Screw"],
      variants: [
        {
          color: "Silver",
          colorCode: "#C0C0C0",
          images: ["Water Bottle.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 34.99,
          originalPrice: 39.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.8,
      isDeal: true,
      shippingTime: "1-2 days",
      similarProducts: []
    },
    {
      name: "Leather Hand Bag",
      slug: "leather-hand-bag",
      description: "Genuine leather handbag with multiple compartments",
      brand: "FashionStyle",
      category: "Fashion",
      price: 79.99,
      coverImage: "Hand Bag.jpg",
      specifications: ["Material: Genuine Leather", "Compartments: 3", "Closure: Zipper", "Strap: Adjustable"],
      variants: [
        {
          color: "Brown",
          colorCode: "#8B4513",
          images: ["Hand Bag.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 79.99,
          originalPrice: 99.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.4,
      shippingTime: "3-5 days",
      similarProducts: []
    },
    {
      name: "Baby Winter Cap",
      slug: "baby-winter-cap",
      description: "Warm and cozy winter cap for babies",
      brand: "BabyComfort",
      category: "Kids",
      price: 14.99,
      coverImage: "Baby Winter Cap.jpg",
      specifications: ["Material: Wool Blend", "Size: 0-12 months", "Washable: Yes", "Design: Pom Pom"],
      variants: [
        {
          color: "Blue",
          colorCode: "#3B82F6",
          images: ["Baby Winter Cap.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 14.99,
          originalPrice: 19.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.7,
      shippingTime: "1-2 days",
      similarProducts: []
    },
    {
      name: "Kids Slippers",
      slug: "kids-slippers",
      description: "Soft and comfortable slippers for kids",
      brand: "ComfyFeet",
      category: "Kids",
      price: 12.99,
      coverImage: "Kids Slippers.jpg",
      specifications: ["Material: Fleece", "Sizes: 3-6 years", "Anti-slip: Yes", "Design: Animal Print"],
      variants: [
        {
          color: "Pink",
          colorCode: "#EC4899",
          images: ["Kids Slippers.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 12.99,
          originalPrice: 16.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.5,
      shippingTime: "2-3 days",
      similarProducts: []
    },
    {
      name: "Stylish Footwear",
      slug: "stylish-footwear",
      description: "Trendy casual shoes for everyday wear",
      brand: "UrbanSteps",
      category: "Footwear",
      price: 59.99,
      coverImage: "Stylish Footwear.jpg",
      specifications: ["Material: Synthetic Leather", "Sole: Rubber", "Closure: Lace-up", "Style: Casual"],
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["Stylish Footwear.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 59.99,
          originalPrice: 79.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.6,
      shippingTime: "3-5 days",
      similarProducts: []
    },
    {
      name: "Premium Sunglasses",
      slug: "premium-sunglasses",
      description: "UV protection sunglasses with polarized lenses",
      brand: "SunShield",
      category: "Fashion",
      price: 39.99,
      coverImage: "Sun Glasses.jpg",
      specifications: ["Lens: Polarized", "UV Protection: 100%", "Frame: Plastic", "Style: Aviator"],
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["Sun Glasses.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 39.99,
          originalPrice: 49.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.4,
      shippingTime: "1-2 days",
      similarProducts: []
    },
    {
      name: "Phone Case",
      slug: "phone-case",
      description: "Protective phone case with shock absorption",
      brand: "PhoneGuard",
      category: "Electronics",
      price: 19.99,
      coverImage: "Phone case.jpg",
      specifications: ["Material: TPU", "Compatibility: iPhone 14", "Drop Protection: Yes", "Design: Clear"],
      variants: [
        {
          color: "Clear",
          colorCode: "#F0F8FF",
          images: ["Phone case.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 19.99,
          originalPrice: 24.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.2,
      shippingTime: "1-2 days",
      similarProducts: []
    },
    {
      name: "Wooden Cupboard",
      slug: "wooden-cupboard",
      description: "Solid wooden cupboard for storage",
      brand: "HomeStyle",
      category: "Furniture",
      price: 199.99,
      coverImage: "Cupboard.jpg",
      specifications: ["Material: Solid Wood", "Dimensions: 180x60x40 cm", "Doors: 2", "Finish: Polished"],
      variants: [
        {
          color: "Brown",
          colorCode: "#8B4513",
          images: ["Cupboard.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 199.99,
          originalPrice: 249.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.5,
      shippingTime: "5-7 days",
      similarProducts: []
    },
    {
      name: "Bedside Nightstands",
      slug: "bedside-nightstands",
      description: "Pair of wooden nightstands with drawers",
      brand: "HomeStyle",
      category: "Furniture",
      price: 89.99,
      coverImage: "Nightstands.jpg",
      specifications: ["Material: MDF", "Dimensions: 50x40x60 cm", "Drawers: 2", "Assembly: Required"],
      variants: [
        {
          color: "White",
          colorCode: "#FFFFFF",
          images: ["Nightstands.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 89.99,
          originalPrice: 119.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.6,
      shippingTime: "4-6 days",
      similarProducts: []
    },
    {
      name: "Pencil Container",
      slug: "pencil-container",
      description: "Creative pencil holder for desk organization",
      brand: "OfficePro",
      category: "Stationery",
      price: 9.99,
      coverImage: "Pencil Container.jpg",
      specifications: ["Material: Ceramic", "Capacity: 20 pens", "Design: Creative", "Non-slip base"],
      variants: [
        {
          color: "Multi",
          colorCode: "#FF6B6B",
          images: ["Pencil Container.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 9.99,
          originalPrice: 14.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.3,
      shippingTime: "1-2 days",
      similarProducts: []
    },
    {
      name: "Cat Keychain",
      slug: "cat-keychain",
      description: "Cute cat-shaped keychain",
      brand: "FunAccessories",
      category: "Accessories",
      price: 7.99,
      coverImage: "Cat keychain.jpg",
      specifications: ["Material: Metal", "Length: 8 cm", "Design: Cat Shape", "Ring: Split Ring"],
      variants: [
        {
          color: "Yellow",
          colorCode: "#FBBF24",
          images: ["Cat keychain.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 7.99,
          originalPrice: 9.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.7,
      shippingTime: "1-2 days",
      similarProducts: []
    },
    {
      name: "Coffee Mug",
      slug: "coffee-mug",
      description: "Ceramic coffee mug with handle",
      brand: "HomeStyle",
      category: "Kitchen",
      price: 12.99,
      coverImage: "Coffee Mug.jpg",
      specifications: ["Material: Ceramic", "Capacity: 350ml", "Microwave Safe: Yes", "Dishwasher Safe: Yes"],
      variants: [
        {
          color: "White",
          colorCode: "#FFFFFF",
          images: ["Coffee Mug.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 12.99,
          originalPrice: 16.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.4,
      shippingTime: "1-2 days",
      similarProducts: []
    },
    {
      name: "Cat Shaped Bed",
      slug: "cat-shaped-bed",
      description: "Cozy cat-shaped bed for pets",
      brand: "PetComfort",
      category: "Pets",
      price: 29.99,
      coverImage: "Cat shaped bed.jpg",
      specifications: ["Material: Plush", "Size: 60x50 cm", "Washable: Yes", "Filling: Polyester"],
      variants: [
        {
          color: "Gray",
          colorCode: "#6B7280",
          images: ["Cat shaped bed.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 29.99,
          originalPrice: 39.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.8,
      shippingTime: "2-3 days",
      similarProducts: []
    },
    {
      name: "Kitty Rocking Chair",
      slug: "kitty-rocking-chair",
      description: "Small rocking chair with cat design",
      brand: "KidsFun",
      category: "Furniture",
      price: 49.99,
      coverImage: "Kitty Rocking Chair.jpg",
      specifications: ["Material: Wood", "Weight Capacity: 30 kg", "Age: 3+ years", "Assembly: Required"],
      variants: [
        {
          color: "Pink",
          colorCode: "#F472B6",
          images: ["Kitty Rocking Chair.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 49.99,
          originalPrice: 69.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.6,
      shippingTime: "3-5 days",
      similarProducts: []
    },
    {
      name: "Teddy Bear",
      slug: "teddy-bear",
      description: "Soft and cuddly teddy bear",
      brand: "ToyWorld",
      category: "Toys",
      price: 19.99,
      coverImage: "tedy.jpg",
      specifications: ["Material: Plush", "Height: 40 cm", "Washable: Yes", "Age: 0+ years"],
      variants: [
        {
          color: "Brown",
          colorCode: "#92400E",
          images: ["tedy.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 19.99,
          originalPrice: 24.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.9,
      shippingTime: "1-2 days",
      similarProducts: []
    },
    {
      name: "Gaming Laptop",
      slug: "gaming-laptop",
      description: "High-performance gaming laptop",
      brand: "TechPro",
      category: "Electronics",
      price: 1299.99,
      coverImage: "laptop.jpg",
      specifications: ["Processor: i7", "RAM: 16GB", "Graphics: RTX 4060", "Storage: 1TB SSD"],
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["laptop.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 1299.99,
          originalPrice: 1499.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.7,
      isDeal: true,
      shippingTime: "3-5 days",
      similarProducts: []
    },
    {
      name: "Travel Backpack",
      slug: "travel-backpack",
      description: "Durable backpack for travel",
      brand: "TravelGear",
      category: "Travel",
      price: 49.99,
      coverImage: "bag.jpg",
      specifications: ["Capacity: 30L", "Material: Nylon", "Water Resistant: Yes", "Pockets: Multiple"],
      variants: [
        {
          color: "Blue",
          colorCode: "#1D4ED8",
          images: ["bag.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 49.99,
          originalPrice: 64.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.5,
      shippingTime: "2-3 days",
      similarProducts: []
    },
    {
      name: "Baseball Cap",
      slug: "baseball-cap",
      description: "Adjustable baseball cap",
      brand: "SportStyle",
      category: "Fashion",
      price: 17.99,
      coverImage: "cap.jpg",
      specifications: ["Material: Cotton", "Adjustable: Yes", "Closure: Strap-back", "Design: Plain"],
      variants: [
        {
          color: "Black",
          colorCode: "#000000",
          images: ["cap.jpg"],
          video: getRandomVideo(),
          model3d: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          price: 17.99,
          originalPrice: 22.99,
          deliveryDate: getRandomDeliveryDate(),
          deliveryTime: getRandomDeliveryTime(),
          deliveryCharge: getRandomDeliveryCharge(),
          preDeliveryCharge: getRandomPreDeliveryCharge()
        }
      ],
      rating: 4.3,
      shippingTime: "1-2 days",
      similarProducts: []
    }
  ];

  // Insert all products
  const insertedProducts = await Product.insertMany(products);
  console.log(`✅ ${insertedProducts.length} products inserted successfully!`);
  
  // Now create similar products relationships
  console.log('🔗 Creating similar products links...');
  const productIds = insertedProducts.map(p => p._id);
  
  for (let i = 0; i < productIds.length; i++) {
    const currentProduct = insertedProducts[i];
    const similarIds = [];
    
    // Link to products in same category
    for (let j = 0; j < productIds.length; j++) {
      if (i !== j && insertedProducts[i].category === insertedProducts[j].category) {
        if (similarIds.length < 3) { // Max 3 similar products
          similarIds.push(productIds[j]);
        }
      }
    }
    
    // If no products in same category, link to random products
    if (similarIds.length === 0) {
      for (let j = 1; j <= 3 && (i + j) < productIds.length; j++) {
        similarIds.push(productIds[(i + j) % productIds.length]);
      }
    }
    
    currentProduct.similarProducts = similarIds;
    await currentProduct.save();
  }
  
  console.log('✅ Task 9 Seed data created successfully!');
  console.log(`📹 Videos added to ${insertedProducts.length} products`);
  console.log(`🚚 Delivery info added to all products`);
  console.log(`🔄 Similar products linked within categories`);
  
  mongoose.disconnect();
}

seed().catch(console.error);