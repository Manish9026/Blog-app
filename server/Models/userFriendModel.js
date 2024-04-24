
import mongoose from "mongoose"


const userfriendSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"user"

    },
    friends:{
        type:[mongoose.Schema.Types.ObjectId],
        default:[],
        ref:"user"
    },
   
})

export const userFriendModel= mongoose.model("userfriend",userfriendSchema);

