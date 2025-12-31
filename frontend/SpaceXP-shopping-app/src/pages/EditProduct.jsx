import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditProduct() {
    const [productData,setProductdata]=useState({})
    const navigate=useNavigate()
    const{id}=useParams()

    useEffect(()=>{
        const getData=async()=>{
            await axios.get(`http://localhost:5000/product/${id}`)
            .then(response=>{
                let res=response.data
                setProductdata({
                    name:res.name,
                    specifications:res.specifications.join(","),
                    price:res.price,
                    shippingTime:res.shippingTime
                })  
            })
        }
        getData()

    },[])

    const onHandleChange=(e)=>{
        
        let val=(e.target.name=== "specifications") ? e.target.value.split(","):(e.target.name==="file") ? e.target.files[0] : e.target.value
        setProductdata(pre=> ({...pre, [e.target.name]: val}))
    }
    const onHandleSubmit= async (e) => {
        e.preventDefault()
        console.log(productData)
        await axios.put(`http://localhost:5000/product/${id}`, productData,{
          headers:{
            'Content-Type':'multipart/form-data',
            'authorization':'bearer '+localStorage.getItem("token")
          }
        })
        .then(() => navigate("/myProduct"))
    }
  return (
  <>
      <div className='container'>
          <form className='form' onSubmit={onHandleSubmit}>
              <div className='form-control'>
                   <label>Name</label>
                   <input type="text" className='input' name="name" onChange={onHandleChange} value={productData.name}></input>
              </div>
              <div className='form-control'>
                   <label>Specifications</label>
                   <textarea type="text" className='input-textarea' name="specifications" rows="5" onChange={onHandleChange} value={productData.specifications}></textarea>
              </div>
              <div className='form-control'>
                   <label>Price</label>
                   <textarea type="number" className='input-textarea' name="price" rows="5" onChange={onHandleChange} value={productData.price}></textarea>
              </div>
              <div className='form-control'>
                   <label>ShippingTime</label>
                   <input type="text" className='input' name="time" onChange={onHandleChange} value={productData.shippingTime}></input>
              </div>
              <div className='form-control'>
                    <label>Product Image</label>
                    <input type="file" className='input' name="file" onChange={onHandleChange} ></input>
                </div>
                    <button type="submit">Edit Product</button>
          </form>
      </div>
 </>
  )
}