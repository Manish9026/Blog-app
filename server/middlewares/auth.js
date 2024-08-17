import { AuthTools } from "../Controllers/userAuth.js";
import { userModel } from "../Models/userModel.js";

 export const authMiddleWare=async(req,res,next)=>{
    
    try {
        const {uid}=req.cookies;
        if(uid){
          const {userId} =await AuthTools.getUserId(req)
          if(await userModel.findOne({userId})){

           req.userId=userId;
           next();
   
           return
          }
          res.clearCookie('uid', {
            sameSite: 'None',
            secure: true
        }).status(201).json({
            message:"firstly login",
            statusCode:65,
            data:[]
        });

        }else{
            res.status(201).json({
                message:"firstly login",
                statusCode:65,
                data:[]
            })
        }


        
    } catch (error) {
        
    }

}

