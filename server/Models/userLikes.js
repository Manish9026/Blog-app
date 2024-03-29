import mongoose from "mongoose";



const likeObject=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{ _id: false })
const userLikesSchema=new mongoose.Schema({
   likes:[likeObject],
   likeCount:{
    type:Number,
    default:0
   }


})

export const userLikesModel= mongoose.model("userLike",userLikesSchema);