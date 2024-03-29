import express from 'express'
import { authMiddleWare } from '../middlewares/auth.js';
import userFriendController from '../Controllers/userfriends.js';

const router =express.Router();

// router.get("blog/addfriend",authMiddleWare)
router.get("/send-request",authMiddleWare,userFriendController.sendFriendRequest)
router.get("/add",authMiddleWare,userFriendController.confirmFriendReq)
router.get("/search",userFriendController.searchFriend)
router.get('/notification',authMiddleWare,userFriendController.getAllfrndReq)
router.get('/check-friend-status',authMiddleWare,userFriendController.frndStatus)
router.get('/get-friends',userFriendController.getAllFrnd)




export default router