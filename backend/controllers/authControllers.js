const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const crypto = require('crypto')
const transporter = require('../config/nodeMailer')
// import { sendMail } from "../config/sendMail.js";

const sendMail = require('../config/nodeMailer')
const register = async(req,res)=>{
    const {name,email,password} = req.body
    if(!email || !name || !password){
        return res.status(400).json({message:"Data missing!!"})
    }
    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"user already exists"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        const user = new userModel({
            name:name,email:email,password:hashPassword
        })

        await user.save()
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"None",
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json({message:"user register success"})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}


const login = async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({message:"Data missing!!"})
    }
    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"no user found"})
        }
        const decode = await bcrypt.compare(password,user.password)
        if(!decode){
            return res.status(401).json({message:"incorrect password"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"None",
            maxAge:7*24*60*60*1000
            
        })
        return res.status(200).json({message:"login success"})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
}


const logout = async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:process.env.NODE_ENV ==='production' ? 'none' : 'strict',
        })
        return res.status(200).json({message:"logout success"})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
    
}


// const emailLink = async(req,res) =>{
//     const {email}=req.body
//     if(!email){
//         return res.status(401).json({message:"Data missing"})
//     }
//     try{
//         const user = await userModel.findOne({email})
//         if(!user){
//             return res.status(401).json({message:"user not found"})
//         }
//         const resetToken = crypto.randomBytes(32).toString("hex")
//         user.resetToken = resetToken
//         user.resetTokenExpire=Date.now()+15*60*1000
//         await user.save()
//         const resetLink =`http://localhost:3000/api/auth/reset-password/${resetToken}`
//         const mailOptions ={
//             from:process.env.SENDER_MAIL,
//             to:user.email,
//             subject:"Reset Password link",
//             text:`Hi buddy please click this link to change the password ${resetLink}`
//         }
//         await transporter.sendMail(mailOptions)
//         console.log("mail sent succes")
//         return res.status(200).json({message:"mail sent successfully"})
        
//     }catch(err){
//         return res.status(500).json({message:err.message})
//     }
// }

// const emailLink = async (req, res) => {
//   const { email } = req.body
//   if (!email) {
//     return res.status(401).json({ message: "Data missing" })
//   }
//   try {
//     const user = await userModel.findOne({ email })
//     if (!user) {
//       return res.status(401).json({ message: "user not found" })
//     }
//     const resetToken = crypto.randomBytes(32).toString("hex")
//     user.resetToken = resetToken
//     user.resetTokenExpire = Date.now() + 15 * 60 * 1000
//     console.log("trying to save user")
//     await user.save()
//     console.log("user saved")
//     const resetLink = `https://mern-notes-app-wine.vercel.app/reset-password/${resetToken}`
//     const mailOptions = {
//       from: process.env.SENDER_MAIL,
//       to: user.email,
//       subject: "Reset Password link",
//       text: `Hi buddy please click this link to change the password ${resetLink}`
//     }
//     console.log("mail sending start")
//     await transporter.sendMail(mailOptions)
//     console.log("mail sent succes")
//     return res.status(200).json({ message: "mail sent successfully" })

//   } catch (err) {
//     return res.status(500).json({ message: err.message })
//   }
// }

const emailLink = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `https://mern-notes-app-wine.vercel.app/reset-password/${resetToken}`;

    await sendMail(
      user.email,
      "Reset Password Link",
      `Click here to reset password: <a href="${resetLink}">${resetLink}</a>`
    );

    return res.status(200).json({ message: "Mail sent successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const resetPass = async(req,res)=>{
    const {token,password}=req.body
    // console.log(token)
    if(!token || !password){
        return res.status(401).json({message:"Data  missing"})
    }
    try{
        const user = await userModel.findOne({
            resetToken : token,
            resetTokenExpire:{$gt:Date.now()}
        })
        if(!user){
            return res.status(500).json({message:"Invalid token"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        user.password = hashPassword
        user.resetToken=null
        user.resetTokenExpire=null
        await user.save()
        return res.status(200).json({message:"password changed sucess"})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports={register,login,logout,emailLink,resetPass}