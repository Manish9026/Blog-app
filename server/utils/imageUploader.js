import { v2 as cloudinary } from 'cloudinary';

const cloudnaryConfig = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDNARY_NAME,
        api_key: process.env.CLOUDNARY_APIKEY,
        api_secret: process.env.CLOUDNARY_SECRETKEY
    });
}
export const imageUploader = async (bufferImg) => {


    try {
        cloudnaryConfig();
        return await cloudinary.uploader.upload(bufferImg).then(res => {
            return res.secure_url;
        }).catch(err => {
            console.log(err);
            return false
        })
        // console.log(result)
        // return result.secure_url
    } catch (error) {

        console.log(error);
    }


}

export const multipleUploads = async (filesArray) => {
    // console.log(filesArray);

    if (filesArray.length != 0) {
        await cloudnaryConfig();
        const resultImage = [];
        for (const index in filesArray) {
            console.log(filesArray[index].mimetype);
            if(filesArray[index].mimetype.match(/video/gi)){
                await cloudinary.uploader.upload(filesArray[index].filepath,{resource_type:"video"}).then(async (result) => {
                    await resultImage.push({url:result.secure_url,type:result.resource_type});
                }).catch(err => console.log(err))
            }
            if(filesArray[index].mimetype.match(/image/gi)){
                await cloudinary.uploader.upload(filesArray[index].filepath,{resource_type:"image"}).then(async (result) => {
                    await resultImage.push({url:result.secure_url,type:result.resource_type});
                }).catch(err => console.log(err))
            }
        
        }
console.log(resultImage);
        return resultImage
    } else {
        return resultImage
    }
}