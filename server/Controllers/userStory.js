import formidable from 'formidable';
import { userStoryModel } from '../Models/userStoryModel.js';
import { imageUploader } from '../utils/imageUploader.js';
import { userModel } from '../Models/userModel.js';
import { userFriendModel } from '../Models/userFriendModel.js';
import { populate } from 'dotenv';
import mongoose, { model } from 'mongoose';


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
        const todayDate= new Date;

        todayDate.setHours(23,59,59,999);
        const startDate= new Date();
        startDate.setHours(0,0,0,0);
console.log(userId);
        // Promise.all([
        //     await userFriendModel.findOne({userId}).populate({
        //         path:"friends",
        //         select:"stories profile userName",
        //         match: { stories: { $exists: true, $ne: null }}
        //         ,
        //         populate:[{
        //             path:"stories",
        //         match: { $and:[{createdAt:{$lte:todayDate}},{createdAt:{$gte:startDate}}] },
               
        //         },{path:"profile",select:"profileImage"}]
                
        //     }),
        //     await userStoryModel.find({userId})
        // ]).then(([friendStory,selfStory])=>{

        //     console.log(friendStory,selfStory);
        //     res.send({
        //         friendStory,
        //         selfStory
        //     })
        // })



        await userFriendModel.findOne({userId}).populate({
            path:"friends",
            select:"stories profile userName",
            match: { stories: { $exists: true, $ne: null }}
            ,
            populate:[{
                path:"stories",
            match: {$and:[{createdAt:{$lte:todayDate}},{createdAt:{$gte:startDate}}]},
            },{path:"profile",select:"profileImage"}]
            
        }).populate({
            path:"userId",select:" userName profile",
            match: { stories: { $exists: true, $ne: null }}
            ,
            populate:[{
                path:"stories",
            match: {$and:[{createdAt:{$lte:todayDate}},{createdAt:{$gte:startDate}}]} ,
          

           
            
        
           
            },{path:"profile",select:"profileImage"}]
        }).then(result=>{

            // console.log(result);
            // res.send(result)

            const data=result.friends.filter((item)=>{
                // console.log(item.stories);
                // return (item.stories!=null && item.stories.length!=0 )
                if((item.stories!=null && item.stories.length!=0 )){
                   return  item.stories.map(story=>{
                       if(story.likes.filter(user=>user==userId)) {
                        

                        return {...story,...{"likeStatus":true}}
                        //  console.log(true,story);
                        
                       }
                       else{
                        return story.likeStatus=false;
                        console.log("false")

                       }
                    })
                }
         


            })
            // console.log(data);
            if(data){
                res.status(201).json({
                    data:data,
                //   result,
                    selfStory:result.userId,
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
static addComment=async(req,res)=>{
    try {
        const {storyId,cmtMessage}=req.body;
        const {userId}=req
        console.log(cmtMessage);
        if(userId && storyId  && cmtMessage){

        await userStoryModel.findOne({_id:storyId}).then(async(result)=>{

            result.comments.push({commentUserId:userId,message:cmtMessage})
            await result.save()
            
            res.status(201).json({
                status:true,
            })
        })
}
else{
    res.status(201).json({
        status:false,
        message:"message box is empty"
    })
}
 

    } catch (error) {
        console.log(error);
        res.status(201).json({
            status:false,
            message:"try after some time"
        })
    }
}
static getAllComments=async(req,res)=>{
try {
    const {storyId}=req.query;
    console.log(storyId);
    if(storyId){
        await userStoryModel.findOne({_id:storyId},{userId:1,comments:1,createdAt:1}).populate([{
            path:"userId",
            select:"userName profile",
            populate:{
                path:"profile",
                select:"profileImage"
            }
        },{path:"comments.commentUserId",
        model: 'user',
        select:"userName profile",
            populate:{
                path:"profile",
                select:"profileImage"
            }
        }]).then(result=>{
            console.log(result);
            const data={userName:result.userId.userName,userImage:result.userId.profile.profileImage,cmtMessages:result.comments,createdAt:result.createdAt}
            
         

            console.log(data);
            res.json({
                status:true,
                data
            })
       
        })
    }

} catch (error) {
    console.log(error);
    res.status(202).json({
        status:false,
        message:"try after some time"
    })
}
}

static liked=async(req,res)=>{
    try {
        const {userId}=req;
        const {storyId}=req.query;
    
        await userStoryModel.findOne({_id:storyId},{likes:1}).then(result=>{
            // console.log(result);
            result.likes.push(userId)
            result.save();
            console.log(result);
        }
        )


        
    } catch (error) {
        
    }
}

static test=async(req,res)=>{
    try {
        const {userId}=req;
        console.log(userId);
        await userStoryModel.aggregate([
            {
                $addFields:{
                    likeStatus:{
                        $cond:{
                            if:{"likes":new mongoose.Types.ObjectId(userId)},then:true,else:false
                        }
                    }
                }
            },

           {$match:{userId:new mongoose.Types.ObjectId(userId)}}
        
        ]
        ).then(result=>{
            console.log(result);
        })
    } catch (error) {
        console.log(error);
    }
}
}

export {userStory}