import { friendRequestModel } from "../Models/friendRequestModel.js";
import { userFriendModel } from "../Models/userFriendModel.js";
import { userLikesModel } from "../Models/userLikes.js";
import { userModel } from "../Models/userModel.js";
import { AuthTools } from "./userAuth.js";

class singleFriend extends AuthTools{

    static userInfo=async(req,res)=>{
        try{
            let likeStatus;
const {uid}=req.query;
const {userId}=await this.getUserId(req)
console.log(uid,userId);
if(uid){

    Promise.all([
        userModel.findOne({userId:uid},{password:0},).populate({
            path:"profile",
            select:"profileImage coverImage"
        }).populate({
            path:"like",
            // match:{likes:{ $elemMatch:{userId}}}
        }),
        friendRequestModel.findOne({senderId:userId,receiverId:uid,status:"pending"}),
        userFriendModel.findOne({userId,friends:uid}),

    ]).then(([frndInfo,frndReqStatus,frndStatus])=>{

 
        if(frndInfo.like){

        
        likeStatus=frndInfo.like.likes.some(like=>{
        return like.userId==userId
       })
       console.log(likeStatus);

    }

       
       
        if(frndInfo && frndReqStatus){
            res.status(201).json({
                        message:"successfully fetched",
                        data:frndInfo,
                        status:true,
                        frndStatus:"pending",
                        likeStatus
                    })
        }
        else if(frndInfo && frndStatus ){
            res.status(201).json({
                message:"successfully fetched",
                data:frndInfo,
                status:true,
                frndStatus:"success",
                likeStatus
            })
        }
        else {
            res.status(201).json({
                message:"successfully fetched",
                data:frndInfo,
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
    static userfollowHandler=async(req,res)=>{
        try {


            
        } catch (error) {
            
        }
        
    }
    
}
export {singleFriend}