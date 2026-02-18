import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaShippingFast, FaCalendarAlt, FaTag, FaShareAlt, FaHeart } from 'react-icons/fa';
import { BsStopwatchFill } from "react-icons/bs";
import QuickView from '../components/QuickView';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showQuickView, setShowQuickView] = useState(false);
    const [show3D, setShow3D] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/product/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load product');
            setLoading(false);
            console.error('Error fetching product:', err);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        
        const variant = product.variants?.[selectedVariant] || {};
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        const cartItem = {
            _id: product._id,
            name: product.name,
            price: variant.price || product.price,
            qty: quantity,
            variantColor: variant.color,
            size: variant.sizes?.[selectedSize]?.sizeLabel || 'One Size',
            deliveryDate: variant.deliveryDate,
            deliveryTime: variant.deliveryTime,
            deliveryCharge: variant.deliveryCharge
        };
        
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('✅ Product added to cart!');
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading product...</div>
        </div>
    );

    if (error) return (
        <div className="text-center py-10 text-red-500">
            {error}
        </div>
    );

    if (!product) return (
        <div className="text-center py-10">
            Product not found
        </div>
    );

    const variant = product.variants?.[selectedVariant] || {};
    const sizeOptions = variant.sizes || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/" className="hover:text-blue-600">Products</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-800 font-medium">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Left Column - Images & Video */}
                <div>
                    {/* Main Image/Video */}
                    <div className="mb-4 bg-gray-100 rounded-xl overflow-hidden">
                        {variant.video ? (
                            variant.video.includes('youtube.com/embed') ? (
                                // YouTube Embed
                                <div className="relative w-full h-96">
                                    <iframe
                                        src={variant.video}
                                        className="w-full h-full"
                                        title="Product video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                // Regular MP4 Video
                                <video 
                                    controls 
                                    className="w-full h-96 object-contain"
                                    poster={variant.images?.[0] || `http://localhost:5000/images/${product.coverImage}`}
                                >
                                    <source src={variant.video} type="video/mp4" />
                                </video>
                            )
                        ) : (
                            <img
                                src={variant.images?.[0] || `http://localhost:5000/images/${product.coverImage}`}
                                alt={product.name}
                                className="w-full h-96 object-contain"
                            />
                        )}
                    </div>

                    {/* Thumbnails */}
                    {variant.images && variant.images.length > 0 && (
                        <div className="flex gap-3 overflow-x-auto py-2">
                            {variant.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${product.name} view ${idx + 1}`}
                                    className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500"
                                />
                            ))}
                            {variant.video && (
                                <div className="relative w-20 h-20">
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-sm">Video</span>
                                    </div>
                                    <img
                                        src={variant.images?.[0]}
                                        alt="Video thumbnail"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Column - Details */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    
                    {/* Rating & Sold */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < Math.floor(product.rating) ? "fill-current" : "fill-gray-300"} />
                                ))}
                            </div>
                            <span className="ml-2 text-gray-600">({product.rating || 'No ratings'})</span>
                        </div>
                        <div className="text-gray-500">•</div>
                        <div className="text-gray-600">
                            <span className="font-medium">{product.totalSold || 0}</span> sold
                        </div>
                        <div className="text-gray-500">•</div>
                        <div className="text-green-600 font-medium">
                            {product.isDeal ? '🔥 Hot Deal' : 'In Stock'}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl font-bold text-green-600">
                                ${variant.price || product.price}
                            </span>
                            {variant.originalPrice && variant.originalPrice > variant.price && (
                                <>
                                    <span className="text-2xl text-gray-500 line-through">
                                        ${variant.originalPrice}
                                    </span>
                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        Save ${(variant.originalPrice - variant.price).toFixed(2)}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Variants */}
                    {product.variants && product.variants.length > 1 && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-3">Color</h3>
                            <div className="flex gap-3">
                                {product.variants.map((v, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedVariant(idx)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${selectedVariant === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                                    >
                                        <div 
                                            className="w-6 h-6 rounded-full border"
                                            style={{ backgroundColor: v.colorCode || '#ccc' }}
                                        />
                                        <span>{v.color}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sizes */}
                    {sizeOptions.length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-3">Size</h3>
                            <div className="flex flex-wrap gap-2">
                                {sizeOptions.map((size, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedSize(idx)}
                                        className={`px-4 py-2 border rounded-lg ${selectedSize === idx ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}
                                    >
                                        {size.sizeLabel}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-3">Quantity</h3>
                        <div className="flex items-center gap-4 w-32">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 border rounded-lg text-xl hover:bg-gray-100"
                            >
                                −
                            </button>
                            <span className="flex-1 text-center text-xl font-semibold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 border rounded-lg text-xl hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Delivery Info Box */}
                    <div className="mb-8 p-5 bg-blue-50 rounded-xl border border-blue-200">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <FaShippingFast className="text-blue-600" />
                            Delivery Information
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-gray-500" />
                                    <span className="text-gray-700">Delivery Date</span>
                                </div>
                                <span className="font-semibold">{variant.deliveryDate || 'Not specified'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <BsStopwatchFill className="text-gray-500" />
                                    <span className="text-gray-700">Delivery Time</span>
                                </div>
                                <span className="font-semibold">{variant.deliveryTime || 'Standard'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FaTag className="text-gray-500" />
                                    <span className="text-gray-700">Delivery Charge</span>
                                </div>
                                <span className="font-semibold">
                                    {variant.deliveryCharge > 0 ? `$${variant.deliveryCharge}` : 'FREE'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-colors"
                        >
                            🛒 Add to Cart
                        </button>
                        <button
                            onClick={() => window.location.href = '/checkout'}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg transition-all"
                        >
                            🚀 Buy Now
                        </button>
                    </div>

                    {/* Secondary Actions */}
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                            <FaHeart className="text-gray-600" />
                            <span>Wishlist</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                            <FaShareAlt className="text-gray-600" />
                            <span>Share</span>
                        </button>
                        {variant.model3d && (
                            <button
                                onClick={() => setShow3D(!show3D)}
                                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                <span className="text-purple-600">3D</span>
                                <span>View in 3D</span>
                            </button>
                        )}
                        <button
                            onClick={() => setShowQuickView(true)}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            <span>Quick Preview</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Description & Specifications */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Product Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Description</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {product.description || 'No description available.'}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                        <ul className="space-y-2">
                            {product.specifications?.map((spec, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">{spec}</span>
                                </li>
                            )) || <li className="text-gray-500">No specifications listed.</li>}
                        </ul>
                    </div>
                </div>
            </div>

            {/* 3D Viewer */}
            {show3D && variant.model3d && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">3D Interactive View</h2>
                    <div className="h-96 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                            <div className="text-4xl mb-2">🎮</div>
                            <p className="text-gray-600">3D Model Viewer</p>
                            <p className="text-sm text-gray-500 mt-1">Model URL: {variant.model3d}</p>
                            <button
                                onClick={() => window.open(variant.model3d, '_blank')}
                                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                Open 3D Model
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ STEP 3.4 — SIMILAR PRODUCTS SECTION */}
            {product.similarProducts && product.similarProducts.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                    <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {product.similarProducts.map((simProduct) => (
                            <div key={simProduct._id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                                <Link to={`/product/${simProduct._id}`}>
                                    <div className="h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                                        <img
                                            src={simProduct.coverImage ? `http://localhost:5000/images/${simProduct.coverImage}` : simProduct.variants?.[0]?.images?.[0]}
                                            alt={simProduct.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 line-clamp-1 mb-1">
                                        {simProduct.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-green-600">
                                            ${simProduct.variants?.[0]?.price || simProduct.price}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {simProduct.rating || 'New'}
                                        </span>
                                    </div>
                                    {simProduct.variants?.[0]?.deliveryTime && (
                                        <div className="text-xs text-gray-600 mt-1">
                                            ⏱️ {simProduct.variants[0].deliveryTime}
                                        </div>
                                    )}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick View Modal */}
            {showQuickView && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                        <QuickView 
                            product={product} 
                            onClose={() => setShowQuickView(false)} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;