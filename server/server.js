import express from 'express';
import dotenv from 'dotenv'
import DB_connection from './DBconfig/DB.config.js';
import userRoute from './routes/Auth.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
// import userPostRoute from './routes/userPost.js';

import userAuth from './Controllers/userAuth.js';
import friendRoute from './routes/userFriend.js';
import snglFriendRoute from './routes/userSinglefriend.js';
import bodyParser from 'body-parser';
import userProfileRoute from './routes/userProfile.js';
import userStoryRoute from './routes/story.js';
import userPostRoute from './routes/userPost.js';
dotenv.config();
const app = express();

// app.use(express.raw({ type: 'multipart/form-data' }));

app.use(cors({
    origin:[process.env.BASE_URL,process.env.BASE_URL2],
    credentials:true,
    methods:["POST","GET","DELETE","PATCH"]
}))

// middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// console.log(process.env.BASE_URL);
app.use("/user/s1",userRoute)
app.use("/user/p1",userPostRoute)
app.use("/user/f1",friendRoute)
app.use('/user/sf',snglFriendRoute)
app.use('/user/profile',userProfileRoute)
app.use('/user/story',userStoryRoute)

app.get("/h",(req,res)=>{
    res.send("hello")
})
DB_connection()
// app.post('/image',userBlog.convertBaseUrl)
const port = process.env.PORT || 8080
app.use('/', (req, res) => {

    // res.cookie("hello",34873)
    res.send("<h1>hello ,this is blog server</h1>")
})









app.listen(port, () => {
    console.log(`server started  on this port :${port}`)
})
