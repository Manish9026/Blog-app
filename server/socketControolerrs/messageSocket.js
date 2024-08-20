import { set } from "mongoose";
import { AuthTools } from "../Controllers/userAuth.js";
let onlineUsers= {};
// let userId="";

export const onlineUserSocket=(io,socket)=>{
    socket.on('userOnline', async(userId)=> {
        
        socket.join(socket.id)
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