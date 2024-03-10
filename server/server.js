import express from 'express';
import dotenv from 'dotenv'
import DB_connection from './DBconfig/DB.config.js';
import userRoute from './routes/Auth.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

app.use(cors({
    origin:process.env.BASE_URL,
    credentials:true,
    
    methods:["POST","GET","DELETE","PATCH"]
}))

// middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// console.log(process.env.BASE_URL);
app.use("/user/s1",userRoute)
DB_connection()

const port = process.env.PORT || 8080
app.use('/', (req, res) => {

    // res.cookie("hello",34873)
    res.send("<h1>hello ,this is blog server</h1>")
})











app.listen(port, () => {
    console.log(`server started  on this port :${port}`)
})
