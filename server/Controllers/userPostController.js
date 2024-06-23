
import fs from 'fs'
import { log } from "console";
import formidable from "formidable";
import { imageUploader } from "../utils/imageUploader.js";
import { userPostModel } from '../Models/userPostModel.js';

class userPost{

    
   static uploadPost=async(req,res)=>{

   
        console.log("hkjkhejr");
        const {userId}= req;
       const  form=formidable();
       form.parse(req,async(err,fields,files)=>{

        try {
            
            if(err){
                res.status(404).json({
                    message:"try after some time",
                    status:0
                })
                return
            }
            if(files || fields){
                const postImagesPath=[]
                const postMessage=fields.postMessage?fields.postMessage[0]:"";
                const postType=fields.postType ?fields.postType[0]:"friends";
                const postImages=files.postImages?files.postImages[0].filepath:"";
                
            

           
                if(postImages && postType || postMessage && postType){
                    if(postImages)
                        postImagesPath.push( await imageUploader(postImages))
                console.log(postImages,postMessage,postType,postImagesPath);
                await userPostModel.create({
                    userId,
                    postMessage,
                    postType,
                    postImages:postImagesPath
                }).then(result=>{
                    if(result){
                        res.status(200).json({
                            message:"successfully uploaded",
                            status:true,
                        })

                    }
                    else{
                        res.status(404).json({
                            message:"facing some problem",
                            status:false,
                        })
                    }
                }).catch(err=>{
                    res.status(404).json({
                        message:"facing some problem",
                        status:false,
                    })
                    console.log(err);
                })


                }else{
                    res.status(404).json({
                                message:"post is empty",
                                status:false,
                            })
                }
              
                // const imagePath= await imageUploader();
    
                // console.log(postMessage);
    
                
            }
        } catch (error) {
            console.log(error);
        }

       })

        
   

    }
    static updatePost=(req,res)=>{
console.log("hello");
    }
    static likeBlog=(req,res)=>{

    }
    static commentBlog=async(req,res)=>{

    }
    static deleteBlog=async(req,res)=>{

    }
    static disLikeBlog=async(req,res)=>{

    }

}

export {userPost}