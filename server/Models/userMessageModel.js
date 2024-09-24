// import { content } from "googleapis/build/src/apis/content";
import mongoose from "mongoose";

const userMessageSchema = mongoose.Schema({
    receiverId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    messages: {
        type: [{
            senderId:String,
            message:String,
            filePath:[String],
            createdAt: {
                type: Date,
                default: Date.now()
            },
            updatedAt: {
                type: Date,
                default: Date.now()
            },
        }]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }  
    
});
export const userMessageModel=mongoose.model("userMessage",userMessageSchema);