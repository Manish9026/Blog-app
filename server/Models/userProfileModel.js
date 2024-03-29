import mongoose  from "mongoose";

const userProfileSchema = mongoose.Schema({

    
   
    profileImage: {
        type: String,
    },
    gender:{
        type:String,
        // enum:["male","female","other","none"],
        default:"none"
    },
    DOB:{
        type:Date,
       
    }

})

 export const userProfileModel = mongoose.model("userProfiles",userProfileSchema);

