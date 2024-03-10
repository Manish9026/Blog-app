import express from 'express'
import userAuth from '../Controllers/userAuth.js';
import cookieParser from 'cookie-parser';
const app=express();
const router=express.Router();
app.use(cookieParser())

router.post("/login",userAuth.login);
router.post("/register",userAuth.register);
router.get("/logout",userAuth.logout);
router.get("forgot",userAuth.forgot);

router.post("profile",userAuth.setProfile);


export default router;