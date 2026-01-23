const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    email: { 
        type: String, 
        required: true,
        unique: true 
    },
    password: {  // Keep as 'password' for compatibility
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin','marketing','content','sales','customer'], 
        default: 'customer' 
    },
    permissions: { 
        type: [String], 
        default: [] 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// TEMPORARILY COMMENTED OUT - CAUSING ERROR
// UserSchema.pre('save', async function(next) {
//     try {
//         if(this.isModified('role')) {
//             switch(this.role) {
//                 case 'admin': 
//                     this.permissions = ['user:*','product:*','order:*','promo:*']; 
//                     break;
//                 case 'marketing': 
//                     this.permissions = ['promo:create','promo:view','report:view']; 
//                     break;
//                 case 'content': 
//                     this.permissions = ['product:update','seo:update','media:upload']; 
//                     break;
//                 case 'sales': 
//                     this.permissions = ['order:view','order:update','report:view']; 
//                     break;
//                 default: 
//                     this.permissions = []; 
//                     break;
//             }
//         }
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// Alternative: Add method to set permissions manually
UserSchema.methods.setPermissions = function() {
    switch(this.role) {
        case 'admin': 
            this.permissions = ['user:*','product:*','order:*','promo:*']; 
            break;
        case 'marketing': 
            this.permissions = ['promo:create','promo:view','report:view']; 
            break;
        case 'content': 
            this.permissions = ['product:update','seo:update','media:upload']; 
            break;
        case 'sales': 
            this.permissions = ['order:view','order:update','report:view']; 
            break;
        default: 
            this.permissions = []; 
            break;
    }
};

module.exports = mongoose.model('User', UserSchema);