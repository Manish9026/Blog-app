

import { userStory } from '../Controllers/userStory.js';
import {authMiddleWare} from  '../middlewares/auth.js'
import express from "express";
const router=express.Router();


// protected routes
router.post("/create",authMiddleWare,userStory.createStory)
router.get("/getStory",authMiddleWare,userStory.getStory)
router.post("/addComment",authMiddleWare,userStory.addComment)
router.get("/allComments",authMiddleWare,userStory.getAllComments)
router.get("/test",authMiddleWare,userStory.test)

router.post("/like",authMiddleWare,userStory.liked);




export default router