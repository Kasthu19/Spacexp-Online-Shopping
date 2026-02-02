import React, { useState, useEffect } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModelViewer3D from '../components/ModelViewer3D';
import QuickView from './QuickView'; // Already correct

export default function ProductItems() {
    const products = useLoaderData()
    const [allProducts, setAllProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [showQuickView, setShowQuickView] = useState(null)
    let path = window.location.pathname === "/myProduct" ? true : false
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavProduct, setIsFavproduct] = useState(false)
    const [show3DForProduct, setShow3DForProduct] = useState(null)
    const navigate = useNavigate();

    // Get unique categories
    const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

    useEffect(() => {
        if (products && products.length > 0) {
            setAllProducts(products);
            setFilteredProducts(products);
            console.log('✅ Products loaded:', products.length);
        } else {
            console.log('❌ No products found');
        }
    }, [products])

    // Filter by category
    const filterCategory = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredProducts(allProducts);
        } else {
            setFilteredProducts(allProducts.filter(p => p.category === category));
        }
    }

    const addToCart = async (product) => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const productId = typeof product === 'object' ? product._id : product;
            const productName = typeof product === 'object' ? product.name : 'Product';
            const productPrice = typeof product === 'object' ? product.price : 0;
            
            console.log('Adding product to cart:', {
                id: productId,
                name: productName,
                price: productPrice
            });
            
            const existingItem = cart.find(item => item._id === productId);
            
            if (existingItem) {
                existingItem.qty += 1;
                console.log('Increased quantity for:', productName);
            } else {
                cart.push({
                    _id: productId,
                    name: productName,
                    price: productPrice,
                    qty: 1
                });
                console.log('Added new product:', productName);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('✅ Product added to cart!');
            
        } catch (error) {
            console.error('❌ Add to cart error:', error);
            alert('Failed to add to cart');
        }
    };

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/product/${id}`)
            .then((res) => console.log(res))
        setAllProducts(products => products.filter(product => product._id !== id))
        let filterItem = favItems.filter(product => product._id !== id)
        localStorage.setItem("fav", JSON.stringify(filterItem))
    }

    const favProduct = (item) => {
        let filterItem = favItems.filter(product => product._id !== item._id)
        favItems = favItems.filter(product => product._id === item._id).length === 0 ? [...favItems, item] : filterItem
        localStorage.setItem("fav", JSON.stringify(favItems))
        setIsFavproduct(pre => !pre)
    }

    return (
        <>
            {/* 3.5 Categories Filter */}
            <div className="flex gap-3 mb-4 flex-wrap">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => filterCategory(cat)} 
                        className={`px-3 py-1 border rounded ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 3.1 Display Products in 5 Items per Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => {
                        const firstVariant = item.variants && item.variants[0];
                        
                        return (
                            <div key={index} className='card border border-gray-300 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow'>
                                {/* IMAGE & VIDEO SECTION WITH LINK TO PRODUCT DETAIL */}
                                <Link to={`/product/${item._id}`}>
                                    <div className="relative h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-3 cursor-pointer">
                                        {item.coverImage ? (
                                            <img 
                                                src={`http://localhost:5000/images/${item.coverImage}`}
                                                alt={item.name}
                                                className="w-full h-full object-contain p-2 hover:opacity-90 transition-opacity"
                                            />
                                        ) : firstVariant?.images?.[0] ? (
                                            <img 
                                                src={firstVariant.images[0]}
                                                alt={item.name}
                                                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                                            />
                                        ) : (
                                            <div className="text-gray-400 text-center">
                                                No Image
                                            </div>
                                        )}
                                        
                                        {/* 3.2 Product Video */}
                                        {firstVariant?.video && (
                                            <div className="mt-2">
                                                <video controls className="w-full h-32 object-cover rounded" onClick={(e) => e.stopPropagation()}>
                                                    <source src={firstVariant.video} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                
                                {/* PRODUCT INFO */}
                                <div>
                                    {/* Product Name with Link */}
                                    <Link to={`/product/${item._id}`}>
                                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 hover:text-blue-600 cursor-pointer transition-colors">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="text-xl font-bold text-green-600">
                                            ${firstVariant?.price || item.price || 'N/A'}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <BsStopwatchFill className="mr-1" />
                                            {firstVariant?.deliveryTime || item.shippingTime || '2-3 days'}
                                        </div>
                                    </div>
                                    
                                    {/* 3.2 Delivery Info */}
                                    {firstVariant?.deliveryDate && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            <div className="flex justify-between">
                                                <span>Delivery:</span>
                                                <span className="font-medium">
                                                    {firstVariant.deliveryDate}, {firstVariant.deliveryTime}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Charge:</span>
                                                <span className="font-medium">
                                                    ${firstVariant.deliveryCharge || 'Free'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* ACTION BUTTONS */}
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                        {!path ? (
                                            <FaHeart 
                                                onClick={() => favProduct(item)}
                                                className={`cursor-pointer ${favItems.some(res => res._id === item._id) ? "text-red-500" : "text-gray-400"} hover:scale-110 transition-transform`}
                                                size={20}
                                            />
                                        ) : (
                                            <div className="flex gap-3">
                                                <Link to={`/editProduct/${item._id}`} className="text-blue-500 hover:text-blue-700 transition-colors">
                                                    <FaEdit />
                                                </Link>
                                                <MdDelete 
                                                    onClick={() => onDelete(item._id)} 
                                                    className="text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                                                />
                                            </div>
                                        )}
                                        
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => addToCart(item)} 
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                                            >
                                                Add to Cart
                                            </button>
                                            
                                            {/* Quick View Button */}
                                            <button
                                                onClick={() => setShowQuickView(item)}
                                                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                                            >
                                                Quick View
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* 3D View Button */}
                                    {firstVariant?.model3d && (
                                        <button
                                            onClick={() => setShow3DForProduct(show3DForProduct === item._id ? null : item._id)}
                                            className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded font-medium transition-all"
                                        >
                                            {show3DForProduct === item._id ? 'Hide 3D View' : 'View in 3D'}
                                        </button>
                                    )}
                                </div>
                                
                                {/* 3D VIEWER */}
                                {show3DForProduct === item._id && firstVariant?.model3d && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <ModelViewer3D modelUrl={firstVariant.model3d} />
                                    </div>
                                )}
                            </div>
                        )
                    })
                ) : (
                    <div className="col-span-5 text-center py-10 text-gray-500">
                        No products found in this category.
                    </div>
                )}
            </div>

            {/* 3.3 Quick View Modal */}
            {showQuickView && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <QuickView 
                            product={showQuickView} 
                            onClose={() => setShowQuickView(null)} 
                        />
                    </div>
                </div>
            )}
        </>
    )
}