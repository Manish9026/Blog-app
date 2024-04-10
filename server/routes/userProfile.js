import express from "express"
import { userProfile } from "../Controllers/userProfile.js";
import { authMiddleWare } from "../middlewares/auth.js";
const router =express.Router();

//  protected route
router.get("/getUserProfile",authMiddleWare,userProfile.getProfileData)
router.patch("/updateProfile",authMiddleWare,userProfile.updateProfile)

// public route



export default router;
