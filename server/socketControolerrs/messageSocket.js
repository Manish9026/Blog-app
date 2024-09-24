import { set } from "mongoose";
import { AuthTools } from "../Controllers/userAuth.js";
import { userMessageModel } from "../Models/userMessageModel.js";
let onlineUsers= {};
// let userId="";

export const onlineUserSocket=(io,socket)=>{
    socket.on('userOnline', async(userId)=> {
        
        socket.join(socket.id)
        // console.log(socket,"ddd")
        onlineUsers[userId] = socket.id;
        io.emit('onlineUsers', Object.keys(onlineUsers)); // Broadcast online users
      });
    
      // Event when a user disconnects
      socket.on('disconnect', () => {
    //    onlineUsers.delete(userId)
       let userId = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id);
       if (userId) {
         delete onlineUsers[userId];
       }

        io.emit('onlineUsers',Object.keys(onlineUsers));// Broadcast online users
      });
}

export const sendUserMessage=async(io,socket)=>{
  // console.log(socket.hands);
  const {token}=socket?.handshake?.auth;
  console.log(token)
  
  if(token && Object.keys(token).length!=0){
  const {userId}=await AuthTools.tokenVerifier(token)
 socket.on("sendMessage",async({data,receiverId})=>{
  try {
    console.log(data,receiverId,userId);
    
    if(userId && receiverId && data){
      const {file,message}=data;
      let todayDate=new Date;
      let startDate= new Date;
      let response={};
      // console.table();
      

      startDate.setHours(0, 0, 0, 0);
      todayDate.setHours(23, 59, 59, 999);
      const isMessage=await userMessageModel.findOne({$and:[{$or:[{senderId:userId,receiverId},{senderId:receiverId,receiverId:userId}]},{ $and: [{ createdAt: { $lte: todayDate } }, { createdAt: { $gte: startDate } }] }]})
      if(!isMessage){
          return await userMessageModel.create({
            senderId:userId,
            receiverId,
            messages:[{
              message:message || null,
              filePath:file || null,
              senderId:userId,

            }]
          }).then(async(res)=>{
            
           io.emit("receiveMessage", (await res.save())?.messages?.slice(-1)[0])
            return
          })
      }
      else{
        isMessage.messages.push({
          message:message || null,
          filePath:file || null,  
          senderId:userId,
        })
        await isMessage.save();
        // console.log(isMessage,"ismessage");
      io.emit("receiveMessage",isMessage?.messages?.slice(-1)[0]);

        
      }
      // console.log(isMessage);
      

    }else{    
    }
    
  } catch (error) {
    console.log(error);
    
  }
// console.log(data)



 })
}
}