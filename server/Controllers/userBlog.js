import { userBlogModel } from "../Models/userBlogModel.js"
import fs from 'fs'
import { log } from "console";

class userBlog{

    
   static uploadBlog=async(req,res)=>{

    console.log(req.body);
    try {
        const { userId,blogTitle,blogImges,blogContent}=req.body


        if(userId && blogTitle && blogImges && blogContent){
        const userBlog= new userBlogModel({
            userId,blogTitle,blogImges,blogContent
        })

       await userBlog.save();
        res.send({
            message:"successfully add blog",
            status:true
        })
    }
    else{
        res.status(201).json({
            message:"all fields are required",
            status:false
        })
    }
        
    } catch (error) {
        console.log(error);
    }

    }
    static updateBlog=(req,res)=>{

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

export {userBlog}