import express from 'express'
import { authMiddleWare } from '../middlewares/auth.js';
import { userPost } from '../Controllers/userPostController.js';
// const app=express();
const router=express.Router();


router.post("/upload",authMiddleWare,userPost.uploadPost);
router.get("/update",authMiddleWare,userPost.updatePost);
router.post("/delete",authMiddleWare);
router.get("/like",authMiddleWare)
router.get("/comment",authMiddleWare)
router.get("/dislike",authMiddleWare)


export default router


