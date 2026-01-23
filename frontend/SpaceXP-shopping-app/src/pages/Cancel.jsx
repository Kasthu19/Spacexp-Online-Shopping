import React from 'react';
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="text-red-500 text-6xl mb-4">❌</div>
        <h1 className="text-3xl font-bold text-red-700 mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            to="/checkout" 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
          >
            Try Again
          </Link>
          <Link 
            to="/" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded font-semibold"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}