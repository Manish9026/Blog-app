import mongoose  from "mongoose";


const userPersonal=new mongoose.Schema({

 gender:{
        type:String,
        enum:["male","female","other"],
        default:"null"
    },
    DOB:{
        type:Date,
        default:null
       
    },
    phoneNumber:{
        type:Number,
        max:12,
        default:null

    }

},{_id:false})

const userEducation=new mongoose.Schema({
    schools:[{
        name:String,
        about:String
    }],
    college:[
        {
            type:{
                type:String,
                enum:["bachelor","master","other"],
            },
            name:String,
            about:String
        }
    ]
    ,
    work:[{
        cmp_name:String,
        position:String,
        area:String,
        about:String,
        isWork:{
            type:Boolean
        }
    }]
},{_id:false})

const userProfileSchema = new mongoose.Schema({

    
   
    profileImage: {
        type: String,
    },
    coverImagePath:{
        type:String
    },
    personal:[userPersonal],
    education:[userEducation]
    

})

 export const userProfileModel = mongoose.model("userProfiles",userProfileSchema);

