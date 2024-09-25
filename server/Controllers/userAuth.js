import { userModel } from "../Models/userModel.js"
import bcrypt, { hash } from 'bcrypt'
import dotenv, { populate } from 'dotenv'
import jwt from "jsonwebtoken";
import express, { json } from 'express'
import cookieParser from "cookie-parser";
import { userProfileModel } from "../Models/userProfileModel.js";
import { imageBuffer } from "../../Blog app/src/utills/imageBuffer.js";
import { imageUploader } from "../utils/imageUploader.js";
import multer from 'multer'
import mongoose from "mongoose";
import formidable from 'formidable'
import { googleClient } from "../utils/googleConfig.js";
let app = express();
app.use(cookieParser());
import axios from 'axios'

dotenv.config();
export class AuthTools {

    static hashPass = async (pass) => {
        const passwordKey = "manish", saltRounds = 15;


        return await bcrypt.hash(pass, saltRounds).then(hash => hash).catch(err => console.log(err))



    }
    static bycriptPass = (checkPass, hash) => {
        return bcrypt.compare(checkPass, hash).then(res => res).catch(err => console.log(err));
    }

    static genJWT_Token = async (userEmail, userId,authType) => {
        console.log(userEmail, userId);
        return await jwt.sign({ userEmail, userId,authType}, process.env.SECRET_KEY)


    }
    static tokenVerifier = async (token) => {

        return await jwt.verify(token, process.env.SECRET_KEY)


    }

    static getUserId = async (req) => {

        const { uid } = req.cookies
        if (uid)
            return await this.tokenVerifier(uid)
        else
            return { userId: undefined }

    }
    static getFormData = async (req) => {
        try {
            let formData;
            const form = formidable();
            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.error('Error parsing form data:', err);
                    return
                }

                const file = files.file[0];
                //   const response=await imageUploader("C:\\Users\\manis\\AppData\\Local\\Temp\\d703c3da3ceeb867286c48d01")

                console.log(file.filepath, fields);
                formData = {
                    filePath: file.filepath,
                    fields: fields
                }

            })

            console.log(formData);
            return formData;
        } catch (error) {
            console.log(error);
        }
    }
}

class userAuth extends AuthTools {


    static login = async (req, res) => {
        try {

            console.log(req.body);

            let { userEmail, password, tc, } = req.body;
            userEmail=userEmail.toLowerCase();
            console.log(userEmail);
            if (userEmail && password && tc) {
                const match = await userModel.findOne({ userEmail })
                console.log(match);
                if (match) {
                    if (await this.bycriptPass(password, match.password)) {

                        const loginToken = await this.genJWT_Token(match.userEmail, match.userId,match.authType)
                        console.log(loginToken);
                     console.log("production", process.env.DEPLOYMENT_TYPE=="local"?false:true,);
                     
                        res.cookie("uid", loginToken, {
                            sameSite: 'Strict',
                            secure: process.env.DEPLOYMENT_TYPE=="local"?false:true,
                            httpOnly:process.env.DEPLOYMENT_TYPE=="local"?false:true,
                            expires: new Date(Date.now() + 3600000)
                        }).json({
                            message: "successfully login",
                            status: true
                        })
                    } else {
                        res.json({
                            message: "password not matched",
                            status: 0
                        })
                    }
                }
                else {
                    res.json({
                        message: " Email not registered",
                        status: 0
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
            const form = formidable();
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.log(err);
                    return
                }
                else {
                 
                    if(files.file){

                        
                    
                    const file = files.file[0]
                    const { filepath } = file;
                    let { userName, userEmail, password } = fields
                    userName = String(userName).toLowerCase();
                    userEmail = String(userEmail).toLowerCase();
                    password = String(password)
                    // const imageUrl=await imageUploader(filepath)

                    console.log(userName, userEmail, password,filepath);

                    if( userEmail && userName && password){
                        console.log("sadbhsd");
                        let hashedPass=await this.hashPass(password)
                        // console.log(hashedPass)
                        const match =await userModel.findOne({userEmail})

                        if(!match){
                            const imageUrl=await imageUploader(filepath)

                            console.log("hggff");
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
                        //  userProfileModel.save();



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
                        res.status(201).json({
                            message:"all fields are required",
                            status:false
                        })
                    }

                    }else{
                       res.status(201).json({
                        message:"all Fields are required",
                        status:false
                       })

                    }
                }


            })



        } catch (error) {

            console.log(error);
        }
    }

    static googleAuth=async(req,res)=>{
        try {
            
            const {code}=req.query;


            // get access_token
            const googleRes=await googleClient.getToken(code);
            googleClient.setCredentials(googleRes.tokens)
            // get userInfo through access token
            const userInfo=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)

            // store record in database
                if(userInfo.data){
                    let loginToken="";
                    const {id,email,name,picture}=userInfo.data;
                    const existUser=await userModel.findOne({$and:[{authType:"google"},{userEmail:email}]})
                   if(!existUser){

                    const newUser= new userModel({
                        userEmail:email,
                        userName:name,
                        authType:"google",
                        active:true
                        
                        
                    })
                    const userProfile= await userProfileModel.create({
                        profileImage:picture
                    });
                    
                    newUser.userId=newUser._id;
                    newUser.profile=userProfile._id
                    if(await newUser.save()){
                    
                        loginToken=await this.genJWT_Token(newUser.userEmail,newUser._id)
                        res.cookie("uid", loginToken, {
                            sameSite: 'None',
                            secure: true,
                            httpOnly: true,
                            expires: new Date(Date.now() + 3600000)
                        }).status(200).json({
                            message:"successfully login",
                            status:true
                        })
                    }
                    return
                   }
                   else{
                    loginToken=await this.genJWT_Token(existUser.userEmail,existUser._id)
                        res.cookie("uid", loginToken, {
                            sameSite: 'None',
                            secure: true,
                            httpOnly: true,
                            expires: new Date(Date.now() + 3600000)
                        }).status(200).json({
                            message:"successfully login",
                            status:true
                        })
                    
                   }
                    
                   
                }
                // 115897488701765711214  
        } catch (error) {
            console.log(error);
            
        }
    }

    static logout = async (req, res) => {
        try {
           
            res.clearCookie('uid', {
                sameSite: 'None',
                secure: true
            });

            res.send({
                message: "logout successfully",
                status: true
            })


        } catch (error) {

        }
    }
    static forgot = async (req, res) => {


    }

    static setProfile = async (req, res) => {
        console.log(req.body);
        const { userId, profileImage, DOB, gender } = req.body
        try {
            const userDetail = await userProfileModel.create({
                userId,
                profileImage,
                DOB,
                gender
            })

            await userDetail.save();

            res.send({
                message: "successfully added"
            })

        } catch (error) {
            console.log(error);
        }
    }

    static getUserInfo = async (req, res) => {


        try {
            const { uid } = req.cookies

            if (uid) {

                let { userId } = await this.tokenVerifier(uid);
                // console.log(uid,userId);


                const data = await userModel.findOne({ userId },{userEmail:1,userName:1,profile:1}).populate({
                    path: "profile",
                    select:"profileImage coverImage"

                })
                const { userName, userEmail, profile } = data
                if (data) {
                    res.status(201).json({
                        status: true,
                        data: { userEmail, userId, userName, profile }
                    })
                }

                // console.log( data,"bvcf");
            }
            else {
                res.status(201).json({
                    "message": "wait some time",
                    status: false
                })
            }


        } catch (error) {

        
        }
    }

    static userVerifed = async (req, res) => {

        // console.log(req.cookies);
        try {
            const { uid } = req.cookies;
           
            if (uid) {
                const { userId } = await this.tokenVerifier(uid)
                console.log(userId);
                const match = await userModel.findOne({ userId })
                console.log(match);
                if (match) {
                    res.status(201).json({
                        message:" user Already login",
                        status: true,
                        path: '/',


                    })
                } else {
                    res.status(404).json({
                        message: "kindly you login again",
                        status: false,
                        path: "/auth/sign-up"

                    })
                }
                //    console.log( req.cookies)
            } else {
                res.status(201).json({
                    message: "kindly you login again",
                    status: false,
                    path: "/auth/sign-up"


                })
            }

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "server busy please wait",
                status: false,

            })
        }
    }



    static upload = async (req, res) => {

        try {

            this.getFormData(req)

        } catch (error) {
            console.log(error);
        }


    }
}



export default userAuth