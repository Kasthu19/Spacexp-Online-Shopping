const express = require("express");
const { addToCart, getCart } = require("../controller/cart");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getCart);

module.exports = router;
