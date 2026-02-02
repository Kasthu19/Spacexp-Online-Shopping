import React, { useState } from 'react';
import { FaTimes, FaShoppingCart, FaHeart, FaShareAlt } from 'react-icons/fa';

const QuickView = ({ product, onClose }) => {
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const variant = product.variants?.[selectedVariant] || {};
    const sizeOptions = variant.sizes || [];

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        const cartItem = {
            _id: product._id,
            name: product.name,
            price: variant.price || product.price,
            qty: quantity,
            variantColor: variant.color,
            size: sizeOptions[selectedSize]?.sizeLabel || 'One Size',
            deliveryDate: variant.deliveryDate,
            deliveryTime: variant.deliveryTime,
            deliveryCharge: variant.deliveryCharge
        };
        
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('✅ Product added to cart!');
        onClose();
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: `Check out ${product.name} on SpaceXP!`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800 text-2xl"
                >
                    <FaTimes />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Images & Video */}
                <div>
                    {/* Main Image/Video */}
                    <div className="mb-4">
                        {variant.video ? (
                            <video 
                                controls 
                                className="w-full h-64 md:h-80 object-cover rounded-lg"
                                poster={variant.images?.[0]}
                            >
                                <source src={variant.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                src={variant.images?.[0] || `http://localhost:5000/images/${product.coverImage}`}
                                alt={product.name}
                                className="w-full h-64 md:h-80 object-cover rounded-lg"
                            />
                        )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {variant.images && variant.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {variant.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${product.name} view ${idx + 1}`}
                                    className="w-20 h-20 object-cover rounded cursor-pointer border-2 hover:border-blue-500"
                                    onClick={() => {/* You can add image switching logic here */}}
                                />
                            ))}
                        </div>
                    )}

                    {/* Video thumbnail if exists */}
                    {variant.video && variant.images?.[0] && (
                        <div className="mt-2">
                            <img
                                src={variant.images[0]}
                                alt="Product thumbnail"
                                className="w-full h-32 object-cover rounded"
                            />
                        </div>
                    )}
                </div>

                {/* Right Column - Details */}
                <div>
                    {/* Price */}
                    <div className="mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-green-600">
                                ${variant.price || product.price}
                            </span>
                            {variant.originalPrice && variant.originalPrice > variant.price && (
                                <span className="text-lg text-gray-500 line-through">
                                    ${variant.originalPrice}
                                </span>
                            )}
                            {product.isDeal && (
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    DEAL
                                </span>
                            )}
                        </div>
                        {product.rating > 0 && (
                            <div className="flex items-center mt-1">
                                <div className="flex text-yellow-400">
                                    {'★'.repeat(Math.floor(product.rating))}
                                    {'☆'.repeat(5 - Math.floor(product.rating))}
                                </div>
                                <span className="ml-2 text-gray-600">
                                    ({product.rating})
                                </span>
                                <span className="ml-2 text-gray-500 text-sm">
                                    • {product.totalSold || 0} sold
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-2">Description</h3>
                        <p className="text-gray-600">{product.description || product.specifications?.join(', ')}</p>
                    </div>

                    {/* Color Variants */}
                    {product.variants && product.variants.length > 1 && (
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Color</h3>
                            <div className="flex gap-2">
                                {product.variants.map((v, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedVariant(idx)}
                                        className={`w-10 h-10 rounded-full border-2 ${selectedVariant === idx ? 'border-blue-500' : 'border-gray-300'}`}
                                        style={{ backgroundColor: v.colorCode || '#ccc' }}
                                        title={v.color}
                                    />
                                ))}
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                                Selected: {variant.color}
                            </div>
                        </div>
                    )}

                    {/* Sizes */}
                    {sizeOptions.length > 0 && (
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Size</h3>
                            <div className="flex flex-wrap gap-2">
                                {sizeOptions.map((size, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedSize(idx)}
                                        className={`px-4 py-2 border rounded ${selectedSize === idx ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}
                                    >
                                        {size.sizeLabel}
                                        {size.stock > 0 ? (
                                            <span className="text-xs block text-gray-500">
                                                Stock: {size.stock}
                                            </span>
                                        ) : (
                                            <span className="text-xs block text-red-500">
                                                Out of stock
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Quantity</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-2 text-lg hover:bg-gray-100"
                                >
                                    −
                                </button>
                                <span className="px-4 py-2 border-x">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-2 text-lg hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                            <div className="text-sm text-gray-600">
                                {sizeOptions[selectedSize]?.stock || 'Multiple'} available
                            </div>
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center">
                            📦 Delivery Information
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery Date:</span>
                                <span className="font-semibold">{variant.deliveryDate || 'Not specified'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery Time:</span>
                                <span className="font-semibold">{variant.deliveryTime || 'Standard'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery Charge:</span>
                                <span className="font-semibold">
                                    ${variant.deliveryCharge > 0 ? variant.deliveryCharge : 'Free'}
                                </span>
                            </div>
                            {variant.preDeliveryCharge > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Pre-delivery Charge:</span>
                                    <span className="font-semibold">${variant.preDeliveryCharge}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                        >
                            <FaShoppingCart />
                            Add to Cart
                        </button>
                        <button
                            onClick={handleShare}
                            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                            title="Share"
                        >
                            <FaShareAlt />
                        </button>
                        <button
                            onClick={() => {/* Add to wishlist logic */}}
                            className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                            title="Add to Wishlist"
                        >
                            <FaHeart />
                        </button>
                    </div>

                    {/* Buy Now Button */}
                    <button
                        onClick={() => {
                            handleAddToCart();
                            // Navigate to checkout
                            window.location.href = '/checkout';
                        }}
                        className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg font-bold"
                    >
                        🚀 Buy Now
                    </button>
                </div>
            </div>

            {/* Product Specifications */}
            {product.specifications && product.specifications.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                    <h3 className="font-bold text-lg mb-3">Specifications</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {product.specifications.map((spec, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span className="text-gray-700">{spec}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 3D/AR Viewer if available */}
            {variant.model3d && (
                <div className="mt-8 pt-6 border-t">
                    <h3 className="font-bold text-lg mb-3">3D Preview</h3>
                    <div className="h-64 border rounded-lg flex items-center justify-center bg-gray-100">
                        <p className="text-gray-500">
                            3D Viewer would appear here with model: {variant.model3d}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickView;