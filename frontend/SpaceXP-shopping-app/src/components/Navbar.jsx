import React from 'react'
import { useState, useEffect } from 'react'  // ADD THIS LINE
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const [isOpen,setIsOpen]=useState(false)
    let token=localStorage.getItem("token")
    const [isLogin,setIsLogin]=useState(token ? false : true)
    let user=JSON.parse(localStorage.getItem("user"))

    useEffect(()=>{
       setIsLogin(token ? false : true)
    },[token])

    const checkLogin=()=>{
        if(token){
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setIsLogin(true)
        }
        else{
            setIsOpen(true)
        }  
    }
  return (
    <>
        <header>
            <h2>SpaceXP Shopping</h2>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/">Products</NavLink></li>
                <li onClick={()=>isLogin && setIsOpen(true)}>
                  <NavLink to={ !isLogin ? "/favProduct" : "/"}>Favourites</NavLink>
                </li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li onClick={checkLogin}>
                  <p className='login'>
                    { (isLogin)? "Login" :"Logout" }{user?.email ? `(${user?.email})` : ""}
                  </p>
                </li>
                <li onClick={() => isLogin && setIsOpen(true)}>
                  <NavLink to={!isLogin ? "/cart" : "/"}> Cart</NavLink>
                </li>
            </ul>
        </header>
        { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    </>
  )
}