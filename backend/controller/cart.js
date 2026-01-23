const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        products: [{ productId }]
      });
    } else {
      cart.products.push({ productId });
      await cart.save();
    }

    res.json({ message: "Added to cart" });
  } catch (err) {
    res.status(400).json({ error: "Add to cart failed" });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("products.productId"); // ⭐ THIS IS THE KEY

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error getting cart" });
  }
};

module.exports = { addToCart, getCart };
