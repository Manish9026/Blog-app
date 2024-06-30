
import fs from 'fs'
import { error, log } from "console";
import { formidable } from "formidable";
import { imageUploader, multipleUploads } from "../utils/imageUploader.js";
import { userPostModel } from '../Models/userPostModel.js';
import { userFriendModel } from '../Models/userFriendModel.js';
import path from 'path';

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
    static postLike = async (req, res) => {
        const { userId } = req;
        const { postId } = req.query;
        try {
            if (postId)
                await userPostModel.findOne({ _id: postId }, { postLike: 1 }).then(async result => {
                    if ("likedUsers" in result.postLike) {
                    console.log(result);

                        if (result.postLike.likedUsers.find(user => user == userId)) {
                            res.status(202).json({
                                status: true,
                                message: "already liked"
                            })
                        } else {
                            result.postLike.likedUsers.push(userId)
                            result.postLike.count = result.postLike.count + 1
                            await result.save()
                            res.status(202).json({
                                status: true,
                                message: "liked"
                            })
                        }
                    }

                })
        } catch (error) {
            res.json({ status: false, message: "try after sometime" })
            console.log(error);
        }
    }
    static postDisLike = async (req, res) => {
        const { userId } = req;
        const { postId } = req.query;
        try {
            if (postId)
                await userPostModel.findOne({ _id: postId }, { postLike: 1 }).then(async result => {
                    if ("likedUsers" in result.postLike) {
                    console.log(result);
                        let value=result.postLike.likedUsers.find(user => user == userId)
                        if (value) {
                            result.postLike.likedUsers.remove(value);
                            result.postLike.count = result.postLike.count - 1
                            await result.save()

                            res.status(202).json({
                                status: true,
                                message: "unliked"
                            })
                        }
                        else{
                            res.status(202).json({
                                status: false,
                                message: "already unliked"
                            })
                        }
                    }

                })
        } catch (error) {
            res.json({ status: false, message: "try after sometime" })
            console.log(error);
        }
    }
    static commentBlog = async (req, res) => {

    }
    static deleteBlog = async (req, res) => {

    }

    static getAllPost = async (req, res) => {
        try {
            const { userId } = req;
            console.log(userId);
            const checkFriendStatus = (friendArray) => {
                return friendArray.find(item => item == userId) ?
                    true : false

            }
            const checkLikeStatus = (usersArray) => {
                return usersArray.find(item => item == userId) ? true : false

            }
            await userFriendModel.findOne({ userId }).then(async userFriends => {
                // console.log(userFriends);
                if (userFriends) {
                    await userPostModel.find({ userId: userFriends.friends }).populate({
                        path: "userId",
                        select: "userName userEmail profile",
                        populate: [{
                            path: "profile",
                            select: "profileImage coverImage"
                        }, {
                            path: "friends",
                            select: "friends"
                        }]
                    }).then(async friendPost => {
                        let data = []
                        friendPost.forEach(item => {
                            data.push({ ...item.toObject(), friendStatus: checkFriendStatus(item.userId.friends.friends), likeStatus: checkLikeStatus(item.postLike.likedUsers) })
                        })

                        if (friendPost.length != 0) {
                            res.status(202).json({
                                data,
                                status: true,
                            })
                        }
                        else {
                            await userPostModel.find({postType:"public"}).populate({
                                path: "userId",
                                select: "userName userEmail profile",
                                populate: [{
                                    path: "profile",
                                    select: "profileImage coverImage"
                                }]
                            }).then(usersPost => {
                                // console.log(usersPost,"public");
                                let data=[]
                                usersPost.forEach(item => {
                                    // console.log(checkLikeStatus(item.postLike.likedUsers));
                                    data.push({ ...item.toObject(), friendStatus:false, likeStatus: checkLikeStatus(item.postLike.likedUsers) })
                                })
                                // console.log(data);
                                if (usersPost.length != 0) {
                                    res.status(202).json({
                                        data,
                                        status: true,
                                    })
                                }
                                else {
                                    res.status(202).json({
                                        data: [],
                                        status: false,
                                    })
                                }

                            })
                        }

                    })
                }
                else {
                    await userPostModel.find({ postType: "public" }).populate({
                        path: "userId",
                        select: "userName userEmail profile",
                        populate: [{
                            path: "profile",
                            select: "profileImage coverImage"
                        }]
                    }).then(usersPost => {
                        let data=[]
                                usersPost.forEach(item => {
                                    // console.log(checkLikeStatus(item.postLike.likedUsers));
                                    data.push({ ...item.toObject(), friendStatus:false, likeStatus: checkLikeStatus(item.postLike.likedUsers) })
                                })
                        if (usersPost.length != 0) {
                            res.status(202).json({
                                data,
                                status: true,
                            })
                        }
                        else {
                            res.status(202).json({
                                data: [],
                                status: false,
                            })
                        }

                    })
                }

            })

        } catch (error) {
            console.log(error);
        }
    }



}

export { userPost }