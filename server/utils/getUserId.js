export const  getUserId=(req)=>{

     const {uid}= req.cookies
     return uid
}