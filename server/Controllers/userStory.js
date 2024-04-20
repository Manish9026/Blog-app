import formidable from 'formidable';
import { userStoryModel } from '../Models/userStoryModel.js';
import { imageUploader } from '../utils/imageUploader.js';


class userStory {

static createStory=async(req,res)=>{
    try {

        const form=formidable();
        form.parse(req,async(err,fields,files)=>{

            if(err){

                console.log(err);
                return  res.status(201).json({
                    message:"please try after sometime",
                    status:false
                })
            }
            console.log(files,req.userId,fields);
            if(files && fields){
                let {songUrl,storyType}=fields;      
                songUrl=songUrl[0];
                storyType=storyType[0]
                console.log(files.storyImage[0].filepath);
                const storyImage= await imageUploader(files.storyImage[0].filepath);
 
                console.log(storyImage);
                console.log(storyType,songUrl);
                const saveStory= new userStoryModel({
                    image:storyImage,
                    userId:req.userId,
                    songUrl,
                    storyType
                })

               if( await saveStory.save()){

                res.status(201).json({
                    message:"story uploaded",
                    status:true
                })
               }else{
                res.status(201).json({
                    message:"please try after sometime",
                    status:false
                })
               }
            }
        })

        
    } catch (error) {
        res.status(201).json({
            message:"please try after sometime",
            status:false
        })
    }

}

}

export {userStory}