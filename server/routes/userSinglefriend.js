import express from 'express'
import { singleFriend } from '../Controllers/userSingleFriend.js';
import { authMiddleWare } from '../middlewares/auth.js';
const router =express.Router();

router.get('/userInfo',singleFriend.userInfo)
router.get('/userLikes',authMiddleWare, singleFriend.userLikeHandler)
export default router