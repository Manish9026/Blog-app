import mongoose from "mongoose";
import { friendRequestModel } from "../Models/friendRequestModel.js";
import { userFriendModel } from "../Models/userFriendModel.js";
import { userModel } from "../Models/userModel.js";
import userAuth, { AuthTools } from "./userAuth.js"
import { badRes, goodRes } from "./index.js";




class userFriendController extends AuthTools {

static friends=async(userId)=>{
    try {
        if(userId){
            const friends=await userFriendModel.findOne({userId}).populate({
                path:"friends",
                select:"userName profile",
                populate:{
                    path:"profile",
                    model:"userProfiles",
                    select:"profileImage",
                   
                },
                
            }).populate({
                path:"friends",
                select:"userName profile",
                populate:{
                    path:"friends"
                }
            })

            return friends?.friends;
        }
        return []
        
    } catch (error) {
        return []
    }
}
static sendedRequests=async(userId)=>{
try {
let match=await friendRequestModel.find({senderId:userId,status:"pending"}).populate({
        path: 'receiverId',
        select:"userName userId",
        populate: {
          path: 'profile',
          model: 'userProfiles',
          select:"profileImage"
        }
      })
      return match
} catch (error) {
    return []
}
}
static receivedRequests=async(userId)=>{
    try {
        let match=await friendRequestModel.find({receiverId:userId,status:"pending"}).populate({
            path: 'senderId',
            select:"userName userId",
            populate: {
              path: 'profile',
              model: 'userProfiles',
              select:"profileImage"
            }
          })

          return match
    } catch (error) {
        return false
    }
    }
  
static friendPageDetail=async(req,res)=>{
    const {userId}=req
    try {
       await Promise.all([this.friends(userId),this.sendedRequests(userId),this.receivedRequests(userId)]).then(([friends,sendRequest,receivedRequest])=>{
            goodRes({res,data:{friends,sendRequest,receivedRequest}})
        }).catch((err)=>{
            badRes({res,})
        })
        
    } catch (error) {
        badRes({res,})
    }
}


    static sendFriendRequest = async (req, res) => {
        try {
           
            const { friendId } = req.query;

           const {userId}=await this.getUserId(req);
            if (userId) {

                 const match=await friendRequestModel.findOne({senderId:userId, receiverId: friendId})
                 if(!match){
                    const friend = new friendRequestModel({
                        senderId:userId,
                        receiverId: friendId
                    })
    
    
                    await friend.save()
                    res.status(201).json({
                        message:"successfully send friend request",
                        status:true,
                        
                    })
                 }
                 else{
                    res.status(201).json({
                        message:"already send friend request",
                        status:false,

                    })
                 }
               
               



            } else {

                res.status(404).json({
                    message: "please login firstly"
                })

            }

        } catch (error) {

            console.log(error);

        }


    }
    static confirmFriendReq = async (req, res) => {


        try {
            let { senderId } = req.query;
            const { userId } = await this.getUserId(req);
            if (userId) {


                
            let match =await userFriendModel.findOne({userId,friends:senderId})
 console.log(match,"dshdgsjf");
            if(!match){

            
        
                let userDatail = await friendRequestModel.findOne({ $and: [{ senderId }, { receiverId:userId }] })

                if (userDatail) {

                    userDatail.status = "accepted"
                    await userDatail.save()


                    let data = await userFriendModel.findOne({ userId })

                    if (!data) {
                       match= await userFriendModel.create({
                            userId,
                            friends: senderId
                        })
                       const test=await userModel.findOne({_id:userId})
                       test.friends=match._id;
                       test.save();
                    } else {
                        await userFriendModel.findOneAndUpdate(
                            { userId},
                            { $push: { friends: senderId } },
                            { new: true }
                        )
                    }
                    data = await userFriendModel.findOne({ userId: senderId })

                    if (!data) {
                       match= await userFriendModel.create({
                            userId: senderId,
                            friends: userId
                        })

                        const test=await userModel.findOne({_id:senderId})
                        test.friends=match._id;
                        test.save();
                    } else {
                        await userFriendModel.findOneAndUpdate(
                            { userId: senderId },
                            { $push: { friends: userId } },
                            { new: true }
                        )
                    }
                   res.status(201).json({
                    message:"friend request accepted",
                    status:true
                   })

                } else {
                    res.status(201).json({
                        message:"already friends",
                        status:true
                       })
                    // console.log("please send friend request")
                }

                // console.log(userDatail);

                // data.userId=userId,

                // data.save()
                // console.log(data);


            }

            }
            //     const data=await friendRequestModel.find({friendRequestId}).populate("friendRequestId")

            // const data =await userModel.findOne({userId:friendRequestId}).populate({
            //     path:"profile",

            // })
            // console.log(data,friendRequestId);


        } catch (error) {
            console.log(error);
        }


    }

    static getAllfrndReq=async(req,res)=>{
        try {
            const {userId}=await this.getUserId(req);
            console.log("hello",userId);
           if(userId){

            let match=await friendRequestModel.find({receiverId:userId,status:"pending"}).populate({
                path: 'senderId',
                select:"userName userId",
                populate: {
                  path: 'profile',
                  model: 'userProfiles',
                  select:"profileImage"
                }
              })

              if(match){
            res.status(201).json({
                data:match,
                status:true,
            })
        }else{
            res.status(201).json({
                data:[],
                status:false,
            })
        }
           }
            
        } catch (error) {
            res.status(404).json({
                data:[],
                status:false,
                message:"try after some time"
            })
            console.log(error);
        }
    }

    static searchFriend=async(req,res)=>{
        try {
            const {userId}=await this.getUserId(req)
            console.log(userId);
            const  {srhPram}=req.query;
            console.log(srhPram);
            if(srhPram){

                let regex = new RegExp("^" + srhPram, "i");
            
            const data=await userModel.find({ userName:{ $regex: regex},userId: { $not: { $eq:userId} } },{userName:1,profile:1,userId:1}).populate("profile")
            console.log(data);

            if(data.length!=0){
                res.status(201).json({
                    message:"record founded",
                    status:true,
                    data,
    
                })
            }else{
                res.status(201).json({
                    message:"record not founded",
                    status:false,
                    data:[]
    
                })
            }
           
        }
        else {
            res.status(201).json({
                status:false,
                message:"search box is empty",
                data:[]
            })
        }
            
        } catch (error) {
            console.log(error);
            res.status(404).json({
                status:false,
                message:"try after some time",
                data:[]
            })
        }

    }

    static frndStatus=async(req,res)=>{
        try {
            
            const {userId}=await this.getUserId(req);
            const {frndId}=req.query;
            // console.log();
          
            if( await userFriendModel.findOne({userId,friends:frndId})){
                res.json({
                    message:"already friends",
                    status:true,
                    data:"friends"
                })
                return
            }
            if(await friendRequestModel.findOne({senderId:userId,receiverId:frndId,status:"pending"})){
                res.json({
                    message:"friend request in pending",
                    status:true,
                    data:"send request"
                })
                return

            }
               
                console.log(match);
                // if()
            
        } catch (error) {
            
        }
    }

    static getAllFrnd=async(req,res)=>{



        try {
            const {type}=req.query;
          console.log(type);
            const getFriend=async(userId)=>{
            try{  
                  const match=await userFriendModel.findOne({userId}).populate({
                    path:"friends",
                    select:"userName profile",
                    populate:{
                        path:"profile",
                        model:"userProfiles",
                        select:"profileImage",
                       
                    },
                    
                }).populate({
                    path:"friends",
                    select:"userName profile",
                    populate:{
                        path:"friends"
                    }
                })
                console.log(match)
                if(match){
                    res.status(201).json({
                        data:match,
                        status:true
                    })
                }else{
                    // console.log("sngf")
                    res.status(201).json({
                        data:[],
                        status:false
                    })
                }}catch(err){
                    console.log(err);
                }
            }
         

            switch(type){
                case 'self':const {userId}=await this.getUserId(req);
                            getFriend(userId);
                           
                            break;
                case 'other': const friendId=req.query.userId;
                console.log("sadgsah"); 
                            getFriend(friendId);
                           
                            break;

            }
            // console.log(match);
        } catch (error) {
            console.log(error);
        }
    }
}

export default userFriendController