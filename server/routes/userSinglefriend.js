import express from 'express'
import { singleFriend } from '../Controllers/userSingleFriend.js';
import { authMiddleWare } from '../middlewares/auth.js';
const router =express.Router();

router.get('/userInfo',singleFriend.userInfo)
router.get('/userLikes',authMiddleWare, singleFriend.userLikeHandler)
router.get('/userFollowers',authMiddleWare, singleFriend.userFollowHandler)

export default router