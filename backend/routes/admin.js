const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function authorize(roles=[]){  
    return (req,res,next)=>{  
      let token = req.headers['authorization'] || req.headers['Authorization'];
      
      if(!token) return res.status(401).json({msg:'Unauthorized'});  
      
      // Remove "Bearer " prefix if present
      if (token.startsWith('Bearer ')) {
        token = token.slice(7);
      }
      
      try{  
        const decoded = jwt.verify(token, process.env.JWT_SECRET || process.env.SECRET_KEY);
        
        console.log('🔐 Decoded token:', decoded); // Debug log
        
        if(!roles.includes(decoded.role)) {
          console.log('❌ Role not allowed:', decoded.role, 'Required:', roles);
          return res.status(403).json({msg:'Forbidden'});  
        }
        
        req.user = decoded;  
        next();  
      } catch(e){ 
        console.log('❌ Token verification error:', e.message);
        res.status(401).json({msg:'Invalid token'}) 
      }  
  }  
}

router.get('/', authorize(['admin']), async (req,res)=>{  
    console.log('📋 GET /api/admin - Request by:', req.user.email);
    const users = await User.find().select('-password');  
    res.json(users);  
});

router.post('/create', authorize(['admin']), async (req,res)=>{  
    console.log('➕ POST /api/admin/create - Request by:', req.user.email);
    console.log('User data:', req.body);
    
    const { name,email,password,role } = req.body;  
    
    if(await User.findOne({email})) {
      console.log('❌ Email already exists:', email);
      return res.status(400).json({msg:'Email exists'});
    }  
    
    const hash = await bcrypt.hash(password,10);  
    const user = new User({ name,email,password:hash,role });  
    await user.save();
    
    console.log('✅ User created:', email);
    res.json({ success:true });  
});

router.put('/:id', authorize(['admin']), async (req,res)=>{  
    const { name,email,role } = req.body;  
    const user = await User.findById(req.params.id);  
    
    if(!user) return res.status(404).json({msg:'User not found'});  
    
    user.name = name || user.name;  
    user.email = email || user.email;  
    user.role = role || user.role;  
    
    await user.save();  
    res.json({ success:true });  
});

router.delete('/:id', authorize(['admin']), async (req,res)=>{  
    await User.findByIdAndDelete(req.params.id);  
    res.json({ success:true });  
});

module.exports = router;