import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import  AddSpacexpProduct  from './pages/AddSpacexpProduct'
import EditProduct from './pages/EditProduct'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Success from './pages/Success'
import Cancel from './pages/Cancel'




const getAllProducts = async () => {
  try {
    console.log('Fetching products from:', 'http://localhost:5000/product');
    const response = await axios.get('http://localhost:5000/product');
    console.log('Products received:', response.data);
    console.log('Number of products:', response.data.length);
    
    // Check first product structure
    if (response.data.length > 0) {
      console.log('First product details:', {
        name: response.data[0].name,
        coverImage: response.data[0].coverImage,
        variants: response.data[0].variants,
        hasModel3d: response.data[0].variants?.[0]?.model3d
      });
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    console.error('Error details:', error.response?.data || error.message);
    return []; // Return empty array on error
  }
}

const getMyProducts=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allProducts=await getAllProducts()
  return allProducts.filter(item=>item.createdBy===user._id)
}

const getFavProducts=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const router=createBrowserRouter([
  {path:"/",element:<MainNavigation/>,children:[
    {path:"/",element:<Home/>,loader:getAllProducts},
    {path:"/myProduct",element:<Home/>,loader:getMyProducts},
    {path:"/favProduct",element:<Home/>,loader:getFavProducts},
    {path:"/addProduct",element:<AddSpacexpProduct/>},
    {path:"/about",element:<About />},
    {path:"/contact",element:<Contact/>},
    {path:"/editProduct/:id",element:<EditProduct/>},
    { path: "/cart", element: <Cart /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/admin", element: <AdminDashboard /> },
    { path: "/pay/success", element: <Success /> },
    { path: "/pay/cancel", element: <Cancel /> },
  ]}
  
])

export default function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}
