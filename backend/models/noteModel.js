const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            require:true
        },
        title:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
)
const noteModel = mongoose.model('Note',noteSchema)
module.exports=noteModel