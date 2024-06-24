
import fs from 'fs'
import { error, log } from "console";
import { formidable } from "formidable";
import { imageUploader, multipleUploads } from "../utils/imageUploader.js";
import { userPostModel } from '../Models/userPostModel.js';
import { userFriendModel } from '../Models/userFriendModel.js';

class userPost {


    static uploadPost = async (req, res) => {

        const { userId } = req;
        const form = formidable();

        //    form.DEFAULT_OPTIONS.multiples=true
        form.parse(req, async (err, fields, files) => {

            try {

                if (err) {
                    res.status(404).json({
                        message: "try after some time",
                        status: 0
                    })
                    return
                }

                if (files || fields) {
                    let postFilesPath = []
                    const postMessage = fields.postMessage ? fields.postMessage[0] : "";
                    const postType = fields.postType ? fields.postType[0] : "friends";
                    const postFiles = files.postFiles ? files.postFiles : [];



                    if (postFiles.length != 0 && postType || postMessage && postType) {
                        if (postFiles.length != 0) {
                            postFilesPath = await multipleUploads(postFiles);
                            if (postFilesPath.length == 0) {
                                res.json({
                                    message: "Only image & videos are supported",
                                    status: 0,
                                })
                                return
                            }
                        }
                        await userPostModel.create({
                            userId,
                            postMessage,
                            postType,
                            postFiles: postFilesPath
                        }).then(result => {
                            if (result) {
                                res.status(200).json({
                                    message: "successfully uploaded",
                                    status: true,
                                })

                            }
                            else {
                                res.status(404).json({
                                    message: "facing some problem",
                                    status: false,
                                })
                            }
                        }).catch(err => {
                            res.status(404).json({
                                message: "facing some problem",
                                status: false,
                                error: err
                            })

                        })


                    } else {
                        res.status(404).json({
                            message: "post is empty",
                            status: false,
                        })
                    }



                }
            } catch (error) {
                console.log(error);
            }

        })




    }
    static updatePost = (req, res) => {

    }
    static likeBlog = (req, res) => {

    }
    static commentBlog = async (req, res) => {

    }
    static deleteBlog = async (req, res) => {

    }
    static disLikeBlog = async (req, res) => {

    }
    static getAllPost = async (req, res) => {
        try {
            const { userId } = req;

            await userFriendModel.findOne({ userId }).then(async userFriends => {
                await userPostModel.find({ userId: userFriends.friends }).populate({
                    path:"userId",
                    select:"userName userEmail profile",
                    populate:[{
                        path:"profile",
                        select:"profileImage coverImage"
                    }]
                }).then(async friendPost => {
                    if(friendPost.length!=0){
                        res.status(202).json({
                            data:friendPost,
                            status:true,   
                        })
                    }
                    else{
                        await userPostModel.find().populate({
                            path:"userId",
                            select:"userName userEmail profile",
                            populate:[{
                                path:"profile",
                                select:"profileImage coverImage"
                            }]
                        }).then(usersPost=>{
                            if(usersPost.length!=0){
                                res.status(202).json({
                                    data:usersPost,
                                    status:true,   
                                })
                            }
                            else{
                                res.status(202).json({
                                    data:[],
                                    status:false,   
                                })
                            }
                          
                        })
                    }
                    
                })

            })

        } catch (error) {

        }
    }

}

export { userPost }