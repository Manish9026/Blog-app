import express from 'express'
import { authMiddleWare } from '../middlewares/auth.js';
import { userBlog } from '../Controllers/userBlog.js';
// const app=express();
const router=express.Router();


router.post("/upload/blog",authMiddleWare,userBlog.uploadBlog);
router.post("/update/blog",authMiddleWare,userBlog.updateBlog);
router.post("/delete/blog",authMiddleWare);
router.get("/like/blog",authMiddleWare)
router.get("/comment/blog",authMiddleWare)
router.get("/dislike/blog",authMiddleWare)


export default router


