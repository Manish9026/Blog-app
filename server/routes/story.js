

import { userStory } from '../Controllers/userStory.js';
import {authMiddleWare} from  '../middlewares/auth.js'
import express from "express";
const router=express.Router();


// protected routes
router.post("/create",authMiddleWare,userStory.createStory)
router.get("/getStory",authMiddleWare,userStory.getStory)

export default router