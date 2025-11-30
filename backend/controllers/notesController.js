require('dotenv').config()
const noteModel = require('../models/noteModel')
const userModel = require('../models/userModel')

const getAllNotes = async(req,res)=>{
    try{
        const notes = await noteModel.find({userId:req.user.id})
        const user = await userModel.findById(req.userId).select('username name email')
        if(!notes || notes.length ===0){
            return res.status(200).json({message:"no notes found"})
        }
        return res.status(200).json({
            notes:notes||[], user
    })
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

const postNotes = async(req,res)=>{
    const {title,description} = req.body
    if(!title || !description){
        return res.status(401).json({message:"Missing datas"})
    }
    const notes = new noteModel({
        userId:req.user.id,
        title:title,
        description:description
    })
    try{
        const savedNote = await notes.save()
        return res.status(200).json({message:"Note added successfully",note:savedNote})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

const editNotes = async(req,res)=>{
    const {id} = req.params
    const {title,description} = req.body
    if(!title || !description){
        return res.status(401).json({message:"Missing datas"})
    }
    try{
        const edit = await noteModel.findOne({_id:id, userId:req.user.id})
        if(!edit){
            return res.status(401).json({message:"no user found"})
        }
        edit.title = title
        edit.description = description
        const editNote = await edit.save()
        return res.status(200).json({message:editNote})

    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

const deleteNote = async(req,res)=>{
    const {id}=req.params
    try{
        const deleteNote = await noteModel.findOneAndDelete({_id:id, userId:req.user.id})
        if (!deleteNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json({ message: "Note deleted successfully" });

    }catch(err){
        return res.status(400).json({message:err.message})
    }
}
module.exports={getAllNotes,postNotes,editNotes,deleteNote}
