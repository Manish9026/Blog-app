import { userModel } from "../Models/userModel.js"
import bcrypt, { hash } from 'bcrypt'
import dotenv, { populate } from 'dotenv'
import jwt from "jsonwebtoken";
import express from 'express'
import cookieParser from "cookie-parser";
import { userProfileModel } from "../Models/userProfileModel.js";
import { imageBuffer } from "../../Blog app/src/utills/imageBuffer.js";
import { imageUploader } from "../utils/imageUploader.js";
import mongoose from "mongoose";
let app=express();
app.use(cookieParser());

dotenv.config();
export class AuthTools {

    static hashPass = async (pass) => {
        const passwordKey = "manish", saltRounds = 15;


        return await bcrypt.hash(pass, saltRounds).then(hash => hash).catch(err => console.log(err))



    }
    static bycriptPass = (checkPass, hash) => {
        return bcrypt.compare(checkPass, hash).then(res => res).catch(err => console.log(err));
    }

    static genJWT_Token =async (userEmail,userId) => {
        console.log(userEmail,userId);
       return await jwt.sign({userEmail,userId},process.env.SECRET_KEY)
      

    }
    static tokenVerifier=async(token)=>{

      return await jwt.verify(token,process.env.SECRET_KEY)
       
        
    }

   static getUserId=async(req)=>{

        const {uid}= req.cookies
        if(uid)
        return await  this.tokenVerifier(uid)
        else
        return {userId:undefined}

   }
}

class userAuth extends AuthTools {


    static login = async (req, res) => {
        try {
            
            console.log(req.body);
        
            const { userEmail, password, tc, } = req.body;

            if (userEmail && password && tc) {
                const match = await userModel.findOne({ userEmail })
                if (match.length!=0) {
                    if (await this.bycriptPass(password, match.password)) {
                        
                        const loginToken= await this.genJWT_Token(match.userEmail,match.userId)
                        console.log(loginToken);
                        
                        res.cookie("uid",loginToken,{
                            sameSite: 'None',
                            secure: true,
                            httpOnly: true ,
                            expires: new Date(Date.now() + 3600000)
                          }).json({
                            message: "successfully login",
                            status:true
                        })
                    } else {
                        res.json({
                            message: "password not matched",
                            status:0
                        })
                    }
                }
                else {
                    res.json({
                        message: " Email not registered",
                        status:0
                    })
                }


            } else {
                res.json({
                    message: "all fields are required",
                    status: false,

                })
            }





        }
        catch (error) {

            console.log(error);
        }




    }
    static register = async (req, res) => {


        try {

            const {userEmail,userName,password,profileImage}=req.body
            console.log(req.body)
            if( userEmail && userName && password){

                let hashedPass=await this.hashPass(password)
                // console.log(hashedPass)
                const match =await userModel.findOne({userEmail})

                if(!match){
                    const imageUrl=await imageUploader(profileImage)
                
                    // console.log(new mongoose.Types.ObjectId);
                const userDetail= await userModel({
                    
                    userName,
                    userEmail,
                    password:hashedPass,
                    // userProfile:""/
                })

             const profile=await userProfileModel.create(
                    {
                       
                        profileImage:imageUrl
                    }
                )

                   userDetail.profile=profile._id;
                   userDetail.userId=userDetail._id;
                // userDetail.save()
                // await userProfileModel.save();

                 
                
               if(await userDetail.save()){
                res.status(200).json({
                    message:"successfully register",
                    status:true
                })
               }else{
                res.status(404).json({
                    message:"try after some time",
                    status:false
                })
               }
                }
                else{
                    res.status(200).json({
                        message:"all ready exist emailid please enter another one",
                        status:false
                    })
                }

            }
            else{
                res.status(404).json({
                    message:"all ields are required",
                    status:false
                })
            }
            
        } catch (error) {
            
           console.log(error);
        }
    }

    static logout = async (req, res) => {
        try {
            console.log("dsfhjs");
            res.clearCookie('uid', { 
                sameSite: 'None',
                secure: true
            });
      
           res.send({
            message:"logout successfully",
            status:true
           })

            
        } catch (error) {
            
        }
    }
    static forgot = async (req, res) => {

     
    }

    static setProfile = async (req, res) => {
        console.log(req.body);
 const { userId,profileImage,DOB,gender} =req.body
        try {
 const  userDetail=  await userProfileModel.create({
    userId,
    profileImage,
    DOB,
    gender
 })

  await userDetail.save();

  res.send({
    message:"successfully added"
  })
            
        } catch (error) {
            console.log(error);
        }
    }

    static getUserInfo=async(req,res)=>{


        try {
            const {uid}=req.cookies

            if(uid){

                let  {userId}=await this.tokenVerifier(uid);
                // console.log(uid,userId);
 

                    const data =await userModel.findOne({userId}).populate({
                        path:"profile",
                        
                    })
                    const {userName,userEmail,profile}=data
                    if(data){
                        res.status(201).json({
                            status:true,
                            data:{userEmail,userId,userName,profile}
                        })
                    }

                // console.log( data,"bvcf");
            }
            else{
                res.status(201).json({
                    "message":"wait some time",
                    status:false
                })
            }
          
            
        } catch (error) {
            
            console.log(error);
        }
    }

    static userVerifed=async(req,res)=>{
 
        // console.log(req.cookies);
        try {
            const {uid}=req.cookies;

            if(uid){
            const  {userId}= await this.tokenVerifier(uid)
            console.log(userId);
            const match=await userModel.findOne({userId})
            console.log(match);
            if(match){
        res.status(201).json({
        message:" user Already login",
        status:true,
        path:'/',


         })
         }else{
        res.status(404).json({
        message:"kindly you login again",
        status:false,
        path:"/sign-up"

    })
            }
        //    console.log( req.cookies)
        }else{
            res.status(404).json({
                message:"kindly you login again",
                status:false,
        
            })
        }

        } catch (error) {console.log(error);
            res.status(404).json({
                message:"server busy please wait",
                status:false,
                
            })
        }
    }
}



export default userAuth