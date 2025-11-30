const jwt = require('jsonwebtoken')
require('dotenv').config()
const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        return res.status(401).json({message:"Invalid token"})
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decode
        next()
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

const authUserDetails = async(req,res,next)=>{
    const token= req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        return res.status(401).json({message:"Access Denied"})
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.userId = decode.id
        next()
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
module.exports={authMiddleware,authUserDetails}