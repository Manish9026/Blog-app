import { AuthTools } from "../Controllers/userAuth.js";
import { userModel } from "../Models/userModel.js";

 export const authMiddleWare=async(req,res,next)=>{
    
    try {
        const {uid}=req.cookies;
        console.log(uid);
        if(uid){
          const {userId} =await AuthTools.getUserId(req)
          if(await userModel.findOne({userId})){

           req.userId=userId;
           next();
   
          }

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

