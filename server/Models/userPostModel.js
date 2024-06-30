import mongoose from "mongoose";

const postLikeSchema=new mongoose.Schema({
 
            likedUsers:[mongoose.Schema.ObjectId],
            count:{type:Number,default:0}
          
},{timestamps:true})
const postcommentSchema=new mongoose.Schema({
 
    userId:mongoose.Schema.ObjectId,
    message:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

const userPostSchema= new mongoose.Schema({
   
    userId:{
        type:String,
        required:true,
        ref:"user"
    },
    postFiles:{
        type:Array,
        max:10
    },
    postMessage:{
        type:String,

    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        alias: '_id'
    },
    postType:{
        type:String,
        enum:["public","self","friends","customFriends"]
        
    },  
    postLike:{
        likedUsers:[mongoose.Schema.Types.ObjectId],
        count:{
            type:Number,
            default:0
        },createdAt:{
            type:Date,default:Date.now
        }
    },
    postComments:{
        type:[postcommentSchema]
    }
},{timestamps:true})

 export const userPostModel= mongoose.model("userPosts",userPostSchema);