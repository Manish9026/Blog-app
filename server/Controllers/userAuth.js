import { userModel } from "../Models/userModel.js"
import bcrypt, { hash } from 'bcrypt'
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
import express from 'express'
import cookieParser from "cookie-parser";
let app=express();
app.use(cookieParser());

dotenv.config();
class AuthTools {

    static hashPass = async (pass) => {
        const passwordKey = "manish", saltRounds = 15;


        return await bcrypt.hash(pass, saltRounds).then(hash => hash).catch(err => console.log(err))



    }
    static bycriptPass = (checkPass, hash) => {
        return bcrypt.compare(checkPass, hash).then(res => res).catch(err => console.log(err));
    }

    static genJWT_Token =async (userEmail,_id) => {
        console.log(userEmail,_id);
       return await jwt.sign({userEmail,_id},process.env.SECRET_KEY)
      

    }
}

class userAuth extends AuthTools {


    static login = async (req, res) => {
        try {
            res.cookie("hello",9026)
            console.log(req.body);
            // const hash = await this.hashPass("123456");

 
            // console.log("hello", hash);
            const { userEmail, password, tc, } = req.body;

            if (userEmail && password && tc) {
                const match = await userModel.findOne({ userEmail })
                if (match) {
                    if (await this.bycriptPass(password, match.password)) {
                        
                        const loginToken= await this.genJWT_Token(match.userEmail,match._id)
                        console.log(loginToken);
                        // res.cookie("hdb",673735)
                        // res.cookie("uid",loginToken)
                        res.cookie("uid",loginToken).json({
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

            const {userEmail,userName,password}=req.body
            console.log(req.body)
            if( userEmail && userName && password){

                let hashedPass=await this.hashPass(password)
                console.log(hashedPass)
                const match =await userModel.findOne({userEmail})

                if(!match){

                
                const userDetail= await userModel.create({
                    userName,
                    userEmail,
                    password:hashedPass
                })

                 
                
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

    }
    static forgot = async (req, res) => {

    }

    static setProfile = async (req, res) => {

    }
}



export default userAuth