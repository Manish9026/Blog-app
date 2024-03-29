import mongoose from "mongoose";

const userBlogSchema= new mongoose.Schema({
   
    userId:{
        type:String,
        required:true
    },
    blogTitle:{
        type:String,
        default:"your title"
    },
    blogImges:{
        type:Array,
        max:10
    },
    blogContent:{
        type:String,

    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        alias: '_id'
    },
    blogAssects:{
        type:Object,
        default:{
            like:0,
            comment:0
        },
        properties:{
            like:{
                type:Number,
                default:0
            } ,
            disLike:{
                type:Number,
                default:0
            }
            , comment:{
                type:Number,
                default:0
            }
        }
    }
})

 export const userBlogModel= mongoose.model("userBlog",userBlogSchema);