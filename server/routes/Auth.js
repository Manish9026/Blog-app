import express from 'express'
import userAuth from '../Controllers/userAuth.js';
import cookieParser from 'cookie-parser';
import { authMiddleWare } from '../middlewares/auth.js';
import multer from "multer"
import { userMessage } from '../Controllers/userMessage.js';
const upload=multer({ dest: 'uploads/' })
const app=express();
const router=express.Router();
app.use(cookieParser())

router.post("/login",userAuth.login);
router.post("/register",userAuth.register);
router.get("/user-Info",userAuth.getUserInfo)
router.get("/logout",userAuth.logout);
router.get("/forgot",userAuth.forgot);
router.post('/upload',userAuth.upload)
router.get("/auth/google",userAuth.googleAuth)
router.post("/profile",userAuth.setProfile);
router.get('/verify',userAuth.userVerifed)

router.post("/msg",authMiddleWare,userMessage.sendMessage)
export default router;