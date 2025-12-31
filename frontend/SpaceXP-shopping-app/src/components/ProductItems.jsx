import React from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import productImg from '../assets/laptop.jpg'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';



export default function ProductItems() {

    const products=useLoaderData()
    const [allProducts,setAllProducts]=useState()
    let path = window.location.pathname === "/myProduct" ? true : false
    let favItems=JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavProduct,setIsFavproduct]=useState(false)
    console.log(allProducts)
    const navigate = useNavigate();


    useEffect(()=>{
        setAllProducts(products)
    },[products])





   

const addToCart = async (id) => {
  await axios.post(
    "http://localhost:5000/cart",
    { productId: id },
    {
      headers: {
        authorization: "bearer " + localStorage.getItem("token")
      }
    }
  );
  navigate("/cart"); // ✅ redirect
};






  useEffect(() => {
    setAllProducts(products);
  }, [products]);








    const onDelete=async(id)=>{
        await axios.delete(`http://localhost:5000/product/${id}`)
                .then((res)=>console.log(res))
        setAllProducts(products=>products.filter(product => product._id !== id))
        let filterItem = favItems.filter(product => product._id !== id)
        localStorage.setItem("fav",JSON.stringify(filterItem))
    }

    const favProduct=(item)=>{
        let filterItem=favItems.filter(product=>product._id !== item._id)
        favItems=favItems.filter(product=>product._id === item._id).length=== 0 ?[...favItems,item] : filterItem
        localStorage.setItem("fav",JSON.stringify(favItems))
        setIsFavproduct(pre=>!pre)
    }

  return (
    <>
        <div className='card-container'>
            {
                allProducts?.map((item,index)=>{
                    return(
                        <div key={index} className='card'>
                            <img src={`http://localhost:5000/images/${item.coverImage}`} width="120px" height="100px"></img>
                            <div className='card-body'>
                                <div className='title'>{item.name}</div>
                                <div className='icons'>
                                     <div className='timer'><BsStopwatchFill />{item.shippingTime}</div>
                                     {(!path) ? <FaHeart onClick={()=>favProduct(item)}
                                        style={{color: (favItems.some(res => res._id === item._id)) ? "red" : ""}}/> :
                                     <div className='action'>
                                        <Link to={`/editProduct/${item._id}`} className="editIcon"><FaEdit /></Link>
                                        <MdDelete onClick={()=>onDelete(item._id)} className='deleteIcon'/>
                                     </div>
                                     }



                                     <button
                                        onClick={() => addToCart(item._id)}
                                        style={{ marginTop: "5px" }}>Add to Cart</button>

                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}
