import formidable from 'formidable';
import { userStoryModel } from '../Models/userStoryModel.js';
import { imageUploader } from '../utils/imageUploader.js';
import { userModel } from '../Models/userModel.js';
import { userFriendModel } from '../Models/userFriendModel.js';


class userStory {

static createStory=async(req,res)=>{
    try {

        const form=formidable();
        form.parse(req,async(err,fields,files)=>{

            if(err){

                console.log(err);
                return  res.status(201).json({
                    message:"please try after sometime",
                    status:false
                })
            }
            console.log(files,req.userId,fields);
            if(files && fields){
                let {songUrl,storyType}=fields;      
                songUrl=songUrl[0];
                storyType=storyType[0]
                console.log(files.storyImage[0].filepath);
                const storyImage= await imageUploader(files.storyImage[0].filepath);
 
                console.log(storyImage);
                console.log(storyType,songUrl);
                const saveStory= new userStoryModel({
                    image:storyImage,
                    userId:req.userId,
                    songUrl,
                    storyType
                })
                await userModel.findOne({userId:req.userId}).then(res=>{
                    res.stories.push(saveStory._id)

                    res.save();
                })

               if( await saveStory.save()){

                res.status(201).json({
                    message:"story uploaded",
                    status:true
                })
               }else{
                res.status(201).json({
                    message:"please try after sometime",
                    status:false
                })
               }
            }
        })

        
    } catch (error) {
        res.status(201).json({
            message:"please try after sometime",
            status:false
        })
    }

}
static getStory=async(req,res)=>{
    try {
        const {userId}=req;
        console.log(userId);
        const todayDate= new Date;

        todayDate.setHours(23,59,59,999);
        const startDate= new Date();
        startDate.setHours(0,0,0,0);
        console.log(startDate.toString());

        await userFriendModel.findOne({userId}).populate({
            path:"friends",
            select:"stories profile userName",
            match: { stories: { $exists: true, $ne: null }}
            ,
            populate:[{
                path:"stories",
            match: { $and:[{createdAt:{$lte:todayDate}},{createdAt:{$gte:startDate}}] },
           
            },{path:"profile",select:"profileImage"}]
            
        }).then(result=>{

            const data=result.friends.filter((item)=>{
                // console.log(item.stories);
                return (item.stories!=null && item.stories.length!=0 )

            })
            console.log(data);
            if(data){
                res.status(201).json({
                    data:data,
                    status:true
                })

            }
            else{
                res.status(201).json({
                    data:[],
                    status:false
                })
            }
           
        }).catch(err=>{
            res.status(201).json({
                data:[],
                status:false
            })
            console.log(err);
        })
      

    } catch (error) {
        res.status(201).json({
            data:[],
            status:false
        })
    }
}
}

export {userStory}