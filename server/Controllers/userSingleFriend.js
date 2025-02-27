import mongoose from "mongoose";
import { friendRequestModel } from "../Models/friendRequestModel.js";
import { userFollowerModel } from "../Models/userFollowers.js";
import { userFriendModel } from "../Models/userFriendModel.js";
import { userLikesModel } from "../Models/userLikes.js";
import { userModel } from "../Models/userModel.js";
import { badRes, goodRes } from "./index.js";
import { AuthTools } from "./userAuth.js";

class singleFriend extends AuthTools{

    static userInfo=async(req,res)=>{
        try{
            let likeStatus;
const {uid}=req.query;
const {userId}=await this.getUserId(req)
const followerId=userId
console.log(uid,userId);
if(uid){

    Promise.all([
       userModel.aggregate([
            {
                $match: { userId:new mongoose.Types.ObjectId(uid)} // Match the specific user by their ObjectId
            },
            {
                $lookup: {
                    from: 'userprofiles', // Collection to join (should match the referenced collection name)
                    localField: 'profile',
                    foreignField: '_id',
                    as: 'profile'
                }
            },
            {
                $lookup: {
                    from: 'userfriends', // Collection for friends
                    localField: 'friends',
                    foreignField: '_id',
                    as: 'friends'
                }
            },
            {
                $lookup: {
                    from: 'userstories', // Collection for stories
                    localField: 'stories',
                    foreignField: '_id',
                    as: 'storyDetails'
                }
            },
            {
                $lookup: {
                    from: 'userlikes', // Collection for stories
                    localField: 'like',
                    foreignField: '_id',
                    as: 'like'
                }
            },
            {
                $lookup: {
                    from: 'userfollowers', // Collection for stories
                    localField: 'follower',
                    foreignField: '_id',
                    as: 'followerDetail'
                }
            },
            {
                $unwind: {
                    path: '$followerDetail',
                    preserveNullAndEmptyArrays: true // Ensures that users without followe // followerDetail: { $arrayElemAt: ['$followerDetail', 0] },

                   
                }
            },
            {
                $addFields: {
                    friends: { $arrayElemAt: ['$friends', 0] },
                    profile: { $arrayElemAt: ['$profile', 0] },
                    like: { $arrayElemAt: ['$like', 0] },
                }
            },
            {
                $project: {
                    userName: 1,
                    userEmail: 1,
                    'profile.profileImage':1,
                    'profile.coverImage':1,
                    totalLikes: "$like.likeCount",
                    userFollowers: 1,
                    totalFollowers:"$followerDetail.totalFollowers",
                    followed:{
                        $cond: {
                            if: {

                                $and: [
                                    { $isArray: '$followerDetail.followers' }, // Check if it's an array
                                    { $in: [ new mongoose.Types.ObjectId(followerId), '$followerDetail.followers'] }
                                ]
                                // $in: [ new mongoose.Types.ObjectId(followerId), '$followerDetail.followers']
                            },
                            then: true,
                            else: false
                        }
                    },
                    liked:{
                        $cond: {
                            if: {
                                $and:[
                                    {$isArray:"$like.likes"},
                                    {$in: [ new mongoose.Types.ObjectId(followerId), '$like.likes.userId']}
                                ]
                                
                            },
                            then: true,
                            else: false
                        }
                    },
                    // followerDetail:1,
                    totalFriends:{ $size: { $ifNull: ['$friends.friends', []] } }
                }
            }
        ]),
        friendRequestModel.findOne({senderId:userId,receiverId:uid,status:"pending"}),
        userFriendModel.findOne({userId,friends:uid}),

    ]).then(([frndInfo,frndReqStatus,frndStatus])=>{

 
    //     if(frndInfo?.like){

        
    //     likeStatus=frndInfo.like.likes.some(like=>{
    //     return like.userId==userId
    //    })
    //    console.log(likeStatus);

    // }

       
       
        if(frndInfo && frndReqStatus){
            res.status(201).json({
                        message:"successfully fetched",
                        data:frndInfo[0],
                        status:true,
                        frndStatus:"pending",
                        likeStatus
                    })
        }
        else if(frndInfo && frndStatus ){
            res.status(201).json({
                message:"successfully fetched",
                data:frndInfo[0],
                status:true,
                frndStatus:"success",
                likeStatus
            })
        }
        else {
            res.status(201).json({
                message:"successfully fetched",
                data:frndInfo[0],
                status:true,
                frndStatus:"unCheck"
                ,likeStatus
            })
        }


    })
    // console.log(match);
    // if(match.length!=0){
    //     res.status(201).json({
    //         message:"successfully fetched",
    //         data:match,
    //         status:true,
    //     })

    // }else{
    //     res.status(201).json({
    //         message:"not fetched",
    //         data:[],
    //         status:false,
    //     })
    // }
}
else{
    res.status(201).json({
        message:"not fetched",
        data:[],
        status:false,
    })
}

        }catch(err){
            res.status(201).json({
                message:"try after sometime",
                data:[],
                status:false,
            })
            console.log(err);

        }
    }
//     static userInfo =async(req,res)=>{
//         try {
//     const {uid}=req.query;
//     // const {userId}=req;
// const {userId}=await this.getUserId(req)

//     const followerId=userId;
//     console.log(userId,uid);
    
            
//            const data= await userModel.aggregate([
//                 {
//                     $match: { userId:new mongoose.Types.ObjectId(uid)} // Match the specific user by their ObjectId
//                 },
//                 {
//                     $lookup: {
//                         from: 'userprofiles', // Collection to join (should match the referenced collection name)
//                         localField: 'profile',
//                         foreignField: '_id',
//                         as: 'profile'
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: 'userfriends', // Collection for friends
//                         localField: 'friends',
//                         foreignField: '_id',
//                         as: 'friends'
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: 'userstories', // Collection for stories
//                         localField: 'stories',
//                         foreignField: '_id',
//                         as: 'storyDetails'
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: 'userlikes', // Collection for stories
//                         localField: 'like',
//                         foreignField: '_id',
//                         as: 'like'
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: 'userfollowers', // Collection for stories
//                         localField: 'follower',
//                         foreignField: '_id',
//                         as: 'followerDetail'
//                     }
//                 },
//                 {
//                     $unwind: {
//                         path: '$followerDetail',
//                         preserveNullAndEmptyArrays: true // Ensures that users without followe // followerDetail: { $arrayElemAt: ['$followerDetail', 0] },

                       
//                     }
//                 },
//                 {
//                     $addFields: {
//                         friends: { $arrayElemAt: ['$friends', 0] },
//                         profile: { $arrayElemAt: ['$profile', 0] },
//                         like: { $arrayElemAt: ['$like', 0] },
//                     }
//                 },
//                 {
//                     $project: {
//                         userName: 1,
//                         userEmail: 1,
//                         'profile.profileImage':1,
//                         'profile.coverImage':1,
//                         totalLikes: "$like.likeCount",
//                         userFollowers: 1,
//                         totalFollowers:"$followerDetail.totalFollowers",
//                         followed:{
//                             $cond: {
//                                 if: {

//                                     $and: [
//                                         { $isArray: '$followerDetail.followers' }, // Check if it's an array
//                                         { $in: [ new mongoose.Types.ObjectId(followerId), '$followerDetail.followers'] }
//                                     ]
//                                     // $in: [ new mongoose.Types.ObjectId(followerId), '$followerDetail.followers']
//                                 },
//                                 then: true,
//                                 else: false
//                             }
//                         },
//                         liked:{
//                             $cond: {
//                                 if: {
//                                     $and:[
//                                         {$isArray:"$like.likes"},
//                                         {$in: [ new mongoose.Types.ObjectId(followerId), '$like.likes.userId']}
//                                     ]
                                    
//                                 },
//                                 then: true,
//                                 else: false
//                             }
//                         },
//                         // followerDetail:1,
//                         totalFriends:{ $size: { $ifNull: ['$friends.friends', []] } }
//                     }
//                 }
//             ]);
//             console.log("\n--------------------------------------data------------------------------------->\n",data,"data");
            
//             goodRes({res,data:data[0]})
//         } catch (error) {
//             console.log(error);
            
//         }
//     }

    static userLikeHandler=async(req,res)=>{
        try {
            const {userId}=await this.getUserId(req);
            const {friendId,type}=req.query;
            console.log(userId,friendId,type);


            if(userId){



                let user=await userModel.findOne({userId:friendId})
              
             
                const like=async()=>{
                    
                    console.log(user.like);
    
               if(!await userLikesModel.findOne({_id:user.like})){
              const match= await userLikesModel.create({
                   likeCount:1,
                   likes:{userId,createdAt: new Date()}                 
                   
               })
               user.like=match._id;
               await user.save()
    
               res.status(201).json({
                   message:"successfully liked",
                   match,
                   status:true
                })
           }else{
               if(!await userLikesModel.findOne({_id:user.like,likes:{ $elemMatch:{userId}}}))
    
         {   const match=await userLikesModel.findOne({_id:user.like})
            console.log(new Date());
            match.likeCount=match.likeCount+1;
            match.likes.push({userId,createdAt: new Date()});
            // match.$__.validateBeforeSave = true;
            await match.save();
            
            res.status(201).json({
               message:"successfully liked",
               match,
               Date:Date.now,
               status:true
            })
           
           }
           else{
               res.status(201).json({
                   message:"already liked",
                   status:true
                })
           }
           }
                   }

               const disLike=async()=>{

                await userLikesModel.findOne({_id:user.like},{likes:{$elemMatch:{userId}},likeCount:1}).then(async(result)=>{
                   
                    // console.log(result);
                    if(result.likes.length!=0){
                        await  userLikesModel.findOneAndUpdate({_id:user.like},{$pull:{likes:{userId}}})
                        result.likeCount=result.likeCount-1;
                        result.save();
                        res.status(201).json({
                                        message:"successfully disliked",
                                        status:true
                                      })
                    }
                    else{

                        res.status(201).json({
                    
                                    status:false
                            })
                    }
                })

            //  const match= await userLikesModel.findOneAndUpdate({_id:user.like},{$pull:{likes:{userId}}}).then(data=>{
            //     console.log(data);

            //     if(data){


            //         res.status(201).json({
            //             message:"successfully disliked",
            //             status:true
            //           })
            //     data.likeCount=data.likeCount-1;             

                   
            //          data.save()

            //     }
            //         else{
            //     res.status(201).json({
                    
            //         status:false
            // })}

               
                
            //   })
            //   console.log(match);

            
             
               }


               switch(type){
                case "like": like();
                console.log("sdajfhhj");
                            break;
                case "disLike":disLike();
                                break;
               }
               
                // const match=await userModel.findOne({userId});
                // match.like
             

            }
            
        } catch (error) {
            
            console.log(error);
        }

    }
    static userFollowHandler=async(req,res)=>{
        try {

            const {userId} =req;
            const {followerId,type}=req.query;

            const user=await userFollowerModel.findOne({userId})
            const followerFrnd=await userFollowerModel.findOne({userId:followerId});
            console.log(user,followerFrnd);
            
         if(user && followerFrnd){

            if (!(user.followers.includes(followerId) && followerFrnd.followers.includes(userId)) ) {
                user.totalFollowers +=1 ;
                user?.followers.push(followerId);
                await user.save();

                followerFrnd.totalFollowers +=1 ;
                followerFrnd?.followers.push(userId);
                await followerFrnd.save()
            

                goodRes({res,message:"followed"})
                // res.send("message")

              } else {
                goodRes({res,message:"already followed"})
              }

              console.log("exist");
              
         }
         else{
            console.log("not exist");
            if(!user){
            await userFollowerModel.create({
                                    userId,
                                    totalFollowers:1,
                                    followers:[followerId]
                                })
               } 
               else{
                user.totalFollowers +=1 ;
                user?.followers.push(followerId);
                await user.save();
               }                
            if(!followerFrnd){ 
                console.log("f exist");
                                               
            await userFollowerModel.create({
                            userId:followerId,
                            totalFollowers:1,
                            followers:[userId]
                        })
}
else{
    console.log("f not exist");
    followerFrnd.totalFollowers +=1 ;
    followerFrnd?.followers.push(followerId);
        await followerFrnd.save();
}
                    goodRes({res,message:"followed"});
         }

        
            
        //     if(userId && followerId){
        //         const existFollower=await userFollowerModel.findOne({userId});
        //         if(type=="follow"){
        //             if(!existFollower){
        //                 const follower=await userFollowerModel.create({
        //                     userId,
        //                     totalFollowers:1,
        //                     followers:[followerId]
        //                 })
        //                 await userModel.updateOne({userId},{$set:{"follower":follower?._id}})
        //                 goodRes({res,message:"followed"})
        // }
        // else{
        //     existFollower.totalFollowers +=1 ;
        //     existFollower?.followers.push(followerId);
        //     existFollower.save()
        //     goodRes({res,message:"followed"})
        
        // }
        //         }
        //         else if(type=="unfollow"){
        //             if(existFollower){
        //                 existFollower.totalFollowers -=1 ;
        //                 existFollower?.followers.pop(followerId);
        //                 existFollower.save()
        //                 goodRes({res,message:"unFollowed"})
        //             }

        //         }
        //         console.log(existFollower);
                



        //     }
        //     else
        //     goodRes({res,message:"your follower id is missing"})

            
        } catch (error) {
            console.log(error);
            badRes({res,message:"internal error"})
            
        }
        
    }

    
}
export {singleFriend}