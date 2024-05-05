import mongoose from "mongoose";

const seenUserSlice=mongoose.Schema(
    
        {
            frndId:{
                type:mongoose.Schema.Types.ObjectId,
                default:null
            }
            ,
            seenTime:{
                type:Date,
            default: Date.now
        },
        like:{
            type:Number,
            default:0
        },
        comment:{
            type:String,
            default:"none"
        }
        }
    ,{"_id":false}
)
const commentSlice=mongoose.Schema(
    {
     message:{
      type:String
     },
     commentUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
     },
     createdAt:{
        type:Date,
        default:Date.now
     }  
     ,
     updatedAt:{
        type:Date,
        default:Date.now
     } 
    },{_id:false}
)

const storySlice= new mongoose.Schema({

    storyType:{
        type:String,
        enum:["public","private"],
        default:"public"
    },
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    image:{
        type:String,
        required:true
    },
    songUrl:{
        type:String,
    }
    ,
    seenUser:{
        type:[seenUserSlice]   
    }
    ,
    comments:{
        type:[commentSlice]
    }
    ,createdAt:{
        type:Date,
        default: Date.now
    }
    
})

export const userStoryModel=new mongoose.model("userStories",storySlice); 