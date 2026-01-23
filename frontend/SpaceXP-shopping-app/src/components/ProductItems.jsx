import React, { useState, useEffect } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModelViewer3D from '../components/ModelViewer3D';

export default function ProductItems() {
    const products = useLoaderData()
    const [allProducts, setAllProducts] = useState([])
    let path = window.location.pathname === "/myProduct" ? true : false
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavProduct, setIsFavproduct] = useState(false)
    const [show3DForProduct, setShow3DForProduct] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (products && products.length > 0) {
            setAllProducts(products);
            console.log('✅ Products loaded:', products.length);
        } else {
            console.log('❌ No products found');
        }
    }, [products])

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
            <div className='card-container'>
                {allProducts.length > 0 ? (
                    allProducts.map((item, index) => {
                        console.log("🛒 PRODUCT:", {
                            name: item.name,
                            coverImage: item.coverImage,
                            price: item.price || item.basePrice
                        });

                        // ===== ADDED DEBUG CODE HERE =====
                        console.log("🎯 3D CHECK for", item.name, ":", {
                            hasVariants: !!item.variants,
                            variantCount: item.variants?.length,
                            model3d: item.variants?.[0]?.model3d,
                            shouldShowButton: item.variants && item.variants[0]?.model3d
                        });
                        // ===== END DEBUG CODE =====
                        
                        return (
                            <div key={index} className='card' style={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                padding: '15px',
                                margin: '10px',
                                backgroundColor: 'white',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                width: '250px'
                            }}>
                                {/* IMAGE SECTION - FIXED */}
                                <div style={{ 
                                    height: '180px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '5px',
                                    marginBottom: '15px',
                                    overflow: 'hidden'
                                }}>
                                    {item.coverImage ? (
                                        <img 
                                            src={`http://localhost:5000/images/${item.coverImage}`}
                                            alt={item.name}
                                            style={{ 
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                padding: '10px'
                                            }}
                                            onLoad={() => console.log('✅ Image loaded:', item.coverImage)}
                                            onError={(e) => {
                                                console.error('❌ Image failed:', item.coverImage);
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `
                                                    <div style="text-align: center; padding: 20px; color: #666;">
                                                        <div style="font-size: 14px; margin-bottom: 5px;">📷 No Image</div>
                                                        <div style="font-size: 11px; color: #999;">${item.coverImage}</div>
                                                        <button onclick="window.open('http://localhost:5000/images/${item.coverImage}', '_blank')"
                                                                style="margin-top: 10px; padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 3px; font-size: 11px;">
                                                            Test Image URL
                                                        </button>
                                                    </div>
                                                `;
                                            }}
                                        />
                                    ) : (
                                        <div style={{ color: '#999', textAlign: 'center' }}>
                                            No Image Available
                                        </div>
                                    )}
                                </div>
                                
                                {/* PRODUCT INFO */}
                                <div className='card-body' style={{ padding: '0' }}>
                                    <div className='title' style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        marginBottom: '8px',
                                        color: '#333'
                                    }}>
                                        {item.name}
                                    </div>
                                    
                                    <div style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#2ecc71',
                                        marginBottom: '10px'
                                    }}>
                                        ${item.price || item.basePrice || 'N/A'}
                                    </div>
                                    
                                    <div className='icons' style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '10px'
                                    }}>
                                        <div className='timer' style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '12px',
                                            color: '#666'
                                        }}>
                                            <BsStopwatchFill style={{ marginRight: '5px' }} />
                                            {item.shippingTime || '2-3 days'}
                                        </div>
                                        
                                        {(!path) ? (
                                            <FaHeart 
                                                onClick={() => favProduct(item)}
                                                style={{ 
                                                    color: (favItems.some(res => res._id === item._id)) ? "red" : "#ccc",
                                                    fontSize: '18px',
                                                    cursor: 'pointer'
                                                }} 
                                            />
                                        ) : (
                                            <div className='action' style={{ display: 'flex', gap: '10px' }}>
                                                <Link to={`/editProduct/${item._id}`} className="editIcon" style={{ color: '#3498db' }}>
                                                    <FaEdit />
                                                </Link>
                                                <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' style={{ color: '#e74c3c', cursor: 'pointer' }} />
                                            </div>
                                        )}
                                    </div>

                                    {/* ACTION BUTTONS */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <button 
                                            onClick={() => addToCart(item)} 
                                            style={{ 
                                                marginTop: "5px",
                                                backgroundColor: "#3498db",
                                                color: "white",
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                border: "none",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                width: "100%"
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                        
                                        {item.variants && item.variants[0]?.model3d && (
                                            <button
                                                onClick={() => setShow3DForProduct(show3DForProduct === item._id ? null : item._id)}
                                                style={{ 
                                                    backgroundColor: "#8B5CF6",
                                                    color: "white",
                                                    padding: "8px 12px",
                                                    borderRadius: "4px",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                    width: "100%"
                                                }}
                                            >
                                                {show3DForProduct === item._id ? 'Hide 3D View' : 'View in 3D'}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* 3D VIEWER */}
                                {show3DForProduct === item._id && item.variants && item.variants[0]?.model3d && (
                                    <div style={{ marginTop: "15px", padding: "10px", borderTop: "1px solid #ddd" }}>
                                        <ModelViewer3D modelUrl={item.variants[0].model3d} />
                                    </div>
                                )}
                            </div>
                        )
                    })
                ) : (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        No products found.
                    </div>
                )}
            </div>
            
            <style jsx>{`
                .card-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                    padding: 20px;
                }
            `}</style>
        </>
    )
}