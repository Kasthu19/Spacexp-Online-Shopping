const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers["authorization"] || req.headers["Authorization"]
        
        console.log('🔐 Auth Middleware Debug:');
        console.log('Request headers:', req.headers);
        console.log('Token received:', token ? 'YES' : 'NO');
        console.log('Token length:', token ? token.length : 0);
        console.log('Token starts with Bearer?:', token ? token.startsWith('Bearer ') : false);
        
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." })
        }
        
        // Remove "Bearer " prefix if present
        if (token.toLowerCase().startsWith('bearer ')) {
        token = token.slice(7, token.length)
        console.log('Token after removing bearer:', token.substring(0, 20) + '...');
        }
        
        console.log('Final token to verify:', token.substring(0, 20) + '...');
        console.log('JWT_SECRET exists?:', !!process.env.JWT_SECRET);
        console.log('SECRET_KEY exists?:', !!process.env.SECRET_KEY);
        
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY || process.env.JWT_SECRET)
        console.log('✅ Token decoded successfully:', decoded);
        req.user = decoded
        next()
        
    } catch (error) {
        console.error('❌ Token verification error:', error.message)
        console.error('Full error:', error);
        return res.status(400).json({ message: "Invalid token" })
    }
}

module.exports = verifyToken