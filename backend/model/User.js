const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    userStatus:{
        status:{
            type:String,
            enum:["Pending","Active"],
            default:"Pending"
        },
        confirmationCode:{
            type:String
        }
    },
    roles:{
        User:{
            type:Number,
            default:2001
        },
        Editor:Number,
        Admin:Number
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:String
})
module.exports = mongoose.model('User',userSchema)