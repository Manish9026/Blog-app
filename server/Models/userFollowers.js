import mongoose from "mongoose";

const userFollowerSchema=mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    totalFollowers:{
        type:Number,
        default:0,
    },
    followers:{
        type:[mongoose.Types.ObjectId],
        ref:"user",
        unique:true
    }
})

export const  userFollowerModel=mongoose.model("userFollowers",userFollowerSchema);