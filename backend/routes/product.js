const express=require("express")
const { getProducts,getProduct,addProduct,editProduct,deleteProduct,upload } = require("../controller/product")
const verifyToken = require("../middleware/auth")
const router=express.Router()

router.get("/", getProducts) //Get all products
router.get("/:id",getProduct) //Get product by id
router.post("/",upload.single('file'),verifyToken ,addProduct) //add product
router.put("/:id",upload.single('file'),editProduct)// edit product
router.delete("/:id",deleteProduct) //Delete product

module.exports=router