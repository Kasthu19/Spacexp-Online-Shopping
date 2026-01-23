const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSignUp = async (req, res) => {
    console.log("📝 SIGNUP REQUEST RECEIVED:", req.body)
    
    const {email, password} = req.body
    if(!email || !password) {
        console.log("❌ Missing email or password")
        return res.status(400).json({message:"Email and password is required"})
    }
    
    try {
        console.log("🔍 Checking if user exists:", email)
        let user = await User.findOne({email})
        
        if(user){
            console.log("❌ User already exists:", email)
            return res.status(400).json({error:"Email is already exist"})
        }
        
        console.log("🔐 Hashing password...")
        const hashPwd = await bcrypt.hash(password, 10)
        
        console.log("👤 Creating user...")
        const newUser = await User.create({
            email,
            password: hashPwd,
            name: email.split('@')[0], // Add this line
            role: 'customer' // Add this line
        })
        
        console.log("🎫 Generating token...")
        let token = jwt.sign({email, id: newUser._id, role: newUser.role}, process.env.SECRET_KEY)
        
        console.log("✅ User created successfully:", newUser.email)
        return res.status(200).json({token, user: newUser})
        
  } catch (error) {
    console.error("🔥 SIGNUP ERROR MESSAGE:", error.message);
    console.error("🔥 SIGNUP ERROR NAME:", error.name);
    console.error("🔥 SIGNUP ERROR CODE:", error.code);
    console.error("🔥 SIGNUP FULL ERROR:", error);
    
    // Check if it's a bcrypt error
    if (error.message.includes('bcrypt') || error.message.includes('data and hash arguments required')) {
        console.error("🔥 BCRYPT ERROR DETECTED");
        return res.status(500).json({error: "Password hashing error", details: "Try using bcryptjs instead"});
    }
    
    return res.status(500).json({error: "Server error", details: error.message});
}
}

const userLogin = async (req, res) => {
    console.log("🔐 LOGIN REQUEST:", req.body)
    
    const {email, password} = req.body
    if(!email || !password) {
        console.log("❌ Login: Missing email or password")
        return res.status(400).json({message:"Email and password is required"})
    }
    
    try {
        console.log("🔍 Login: Finding user:", email)
        let user = await User.findOne({email})
        
        if(user && await bcrypt.compare(password, user.password)) {
            console.log("✅ Login successful:", email)
            let token = jwt.sign({email, id: user._id, role: user.role}, process.env.SECRET_KEY)
            return res.status(200).json({token, user})
        } else {
            console.log("❌ Login: Invalid credentials")
            return res.status(400).json({error:"Invalid credentials"})
        }
    } catch (error) {
        console.error("🔥 LOGIN ERROR:", error)
        return res.status(500).json({error: "Server error", details: error.message})
    }
}

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json({email: user.email})
}

module.exports = {userLogin, userSignUp, getUser}