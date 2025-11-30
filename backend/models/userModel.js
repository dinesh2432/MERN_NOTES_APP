const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, require: true },
    resetToken: {
        type: String,
        default: null,
    },
    resetTokenExpire: {
        type: String,
        default: null,
    },createdAt:{
        type:Date,
        default:Date.now
    }

    
  
},{timestamps:true});

const userModel = mongoose.model.User || mongoose.model('User',userSchema)
module.exports=userModel
