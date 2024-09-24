
import formidable from 'formidable';
import { userMessageModel } from '../Models/userMessageModel.js';
import { badRes, goodRes } from './index.js';
// import { populate } from 'dotenv';


export class userMessage{

   static sendMessage=(req,res)=>{
    try {
        
        const receiverId=req.userId;
        const {senderId}=req.query;
        console.log(senderId,receiverId);
        
        const form=formidable();
        form.parse(req,async(err,files,fields)=>{
            if(err){
                return res.status(404).json({
                    message:"something went wrong",
                    status:false,
                })
            }
            if(files){
                
            }
            if(fields){
                let {msgType,content}=fields; 
                console.log(content,msgType,fields,files);
                
                              
                const todayMsg=await userMessageModel.findOne({$and:[{senderId},{receiverId},{createdAt:{$gte: Date.now }}]})
                if(!todayMsg){
                   const firstMsg= await userMessageModel.create({
                        senderId,
                        receiverId,
                        messages:{
                            msgType,
                            content
                        }
                    }
                    )
                    if(await firstMsg.save()){
                        res.status(201).json({
                            status:true,
                            message:"successfully send"
                        })
                    }
                    else{
                        res.status(404).json({
                            status:false,
                            message:"try after"
                        })
                    }
                }
            }
        })

    } catch (error) {
        console.log(error);
        
    }

   }

   static getMessages=async(req,res)=>{
    try {
        const {userId}=req;
        const {receiverId}=req.query;
        console.log(userId,receiverId);
        
        if(userId && receiverId){

            const messages=await userMessageModel.find({$or:[{senderId:userId,receiverId},{senderId:receiverId,receiverId:userId}]}).sort({createdAt: 1}).populate([{path:"senderId",select:["userName","profile","userEmail"],populate:{path:"profile",select:"profileImage"}},{path:"receiverId",select:["userName","profile","userEmail"],populate:{path:"profile",select:"profileImage"}}]);
            if(messages)
            goodRes({res,data:messages})
            else
            goodRes({res,message:"not found"})
            

        }
        
    } catch (error) {
        console.log(error);
        badRes({res,message:"internal error"})
        
    }
   }
}