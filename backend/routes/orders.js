const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const Order = require('../models/Order');

// MD5 verification function
function verifyPayHereMd5(body, merchantSecret) {
  const { merchant_id='', order_id='', payhere_amount='', payhere_currency='', status_code='', md5sig='' } = body;
  const innerHash = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const concat = merchant_id + order_id + payhere_amount + payhere_currency + status_code + innerHash;
  const localMd5 = crypto.createHash('md5').update(concat).digest('hex').toUpperCase();
  return localMd5 === (md5sig || '').toUpperCase();
}

// ====== UPDATED CREATE ORDER FUNCTION ======
router.post('/create', async (req, res) => {
  try {
    console.log('📦 ORDER CREATE REQUEST BODY:', req.body);
    
    const { items, subtotal, discount = 0, shipping = 0 } = req.body;
    const total = subtotal - discount + shipping;
    
    // Make sure items have required fields
    const formattedItems = items.map(item => ({
      productId: item._id || item.productId || 'unknown_id',
      name: item.name || 'Unknown Product',
      price: item.price || 0,
      qty: item.qty || 1
    }));
    
    console.log('📝 Formatted items:', formattedItems);
    
    const order = new Order({
      userId: "temp_user_id_for_testing",  // Fixed string ID
      items: formattedItems,
      subtotal,
      discount,
      shipping,
      total,
      paymentStatus: 'pending'
    });
    
    await order.save();
    console.log('✅ Order saved with ID:', order._id);
    
    res.json({ 
      success: true,
      orderId: order._id.toString(), 
      total: total 
    });
    
  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message
    });
  }
});

// PayHere notification endpoint
router.post('/payhere-notify', async (req, res) => {
  try {
    const body = req.body;
    
    // Verify MD5 signature
    if (!verifyPayHereMd5(body, process.env.PAYHERE_MERCHANT_SECRET)) {
      return res.status(400).send('Invalid signature');
    }
    
    const order = await Order.findById(body.order_id);
    if (!order) return res.status(404).send('Order not found');
    
    const status = parseInt(body.status_code, 10);
    order.paymentStatus = status === 2 ? 'paid' : (status === 0 ? 'pending' : 'failed');
    order.payherePaymentId = body.payment_id;
    
    await order.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('PayHere notify error:', error);
    res.status(500).send('error');
  }
});

module.exports = router;