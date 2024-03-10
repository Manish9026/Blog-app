import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    userEmail:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String
    },
    active:{
        type:Boolean,
        default:0
    },
    tc:{
        type:Boolean,
        default:1
    },
    
  
})

 export const userModel = mongoose.model("user",userSchema);
