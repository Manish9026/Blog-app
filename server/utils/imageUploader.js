import {v2 as cloudinary} from 'cloudinary';

export const imageUploader=async(bufferImg)=>{
      
  
    try {
        cloudinary.config({ 
            cloud_name: process.env.CLOUDNARY_NAME, 
          api_key: process.env.CLOUDNARY_APIKEY, 
          api_secret: process.env.CLOUDNARY_SECRETKEY
        });

       return  await cloudinary.uploader.upload(bufferImg).then(res=>{
        return res.secure_url;
       }).catch(err=>{
        console.log(err);
        return false
       })
        // console.log(result)
        // return result.secure_url
    } catch (error) {
        
        console.log(error);
    }
   

}