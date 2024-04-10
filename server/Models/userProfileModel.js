import mongoose  from "mongoose";


const userPersonal=new mongoose.Schema({

 gender:{
        type:String,
        enum:["male","female","other","none"],
        default:"none"
    },
    DOB:{
        type:Date,
        default:null
       
    },
    phoneNumber:{
        type:Number,
        min:12,
        default:null

    }
,
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }

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
    ,
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
},{_id:false})

const userProfileSchema = new mongoose.Schema({

    
   
    profileImage: {
        type: String,
    },
    coverImagePath:{
        type:String
    },
    personal:{type:userPersonal,
    default:{}},
    education:{
        type:userEducation,
        default:{}
    },
    userBio:{
        type:String,
        default:null
    }
    ,
    
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
    

})



// middlewares of mongoose

userPersonal.pre('save', function(next) {
    this.updateDate = new Date();
    next();
});

userEducation.pre('save', function(next) {
    this.updateDate = new Date();
    next();
});
userProfileSchema.pre('save', function(next) {
    // console.log(this,"gfdfdf");
    this.updateDate = new Date();
    next();
});



 export const userProfileModel = mongoose.model("userProfiles",userProfileSchema);

