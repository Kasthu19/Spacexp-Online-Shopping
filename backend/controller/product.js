const Products=require("../models/product")
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getProducts=async(req,res)=>{
    const products=await Products.find()
    return res.json(products)
}

const getProduct=async(req,res)=>{
    const product=await Products.findById(req.params.id)
    res.json(product)
}

const addProduct=async (req,res)=>{
    console.log(req.user)
    const {name,specifications,price,shippingTime}=req.body

    if(!name || !specifications || !price)
    {
        res.json({message:"Required fields can't be empty"})
    }

    const newProduct=await Products.create({
        name,specifications,price,shippingTime,coverImage:req.file.filename,
        createdBy:req.user.id
    })
    return res.json(newProduct)
}

const editProduct=async(req,res)=>{
    const {name,specifications,price,shippingTime}=req.body
    let product=await Products.findById(req.params.id)
    try{
        if(product){
            let coverImage=req.file?.filename ? req.file?.filename : product.coverImage
            await Products.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
            res.json({name,specifications,price,shippingTime})
        }
    }
    catch(err){
        return res.status(404).json({message:"error"})
    }
    
}

const deleteProduct=async(req,res)=>{
    try{
        await Products.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(400).json({message:"error"})
    }

}


module.exports={getProducts,getProduct,addProduct,editProduct,deleteProduct,upload}