import mongoose from "mongoose";


const friendRequestSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"user"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"user"
    },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },

   friendShipId:{
    type:mongoose.Schema.Types.ObjectId,
    default:null
  }
    
})


export const friendRequestModel=mongoose.model("userfriendRequest",friendRequestSchema);
