import React from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        
        <div className="bg-gray-100 p-4 rounded mb-6 text-left">
          <h2 className="font-semibold mb-2">Order Details:</h2>
          <p>Order ID: <span className="font-mono">{new URLSearchParams(window.location.search).get('orderId') || 'N/A'}</span></p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link 
            to="/products" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
          >
            Continue Shopping
          </Link>
          <Link 
            to="/" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded font-semibold"
          >
            Go Home
          </Link>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
}