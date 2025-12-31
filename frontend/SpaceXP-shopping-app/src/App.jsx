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




const getAllProducts=async()=>{
  let allProducts=[]
  await axios.get('http://localhost:5000/product').then(res=>{
    allProducts=res.data
  })
  return allProducts
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
  ]}
  
])

export default function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}
