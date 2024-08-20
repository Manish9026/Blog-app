import { createSlice } from "@reduxjs/toolkit";


const userMessageSlice=createSlice({
    name:"userMessage",
    initialState:{
        onlineUsers:[],
        msgPage:{
            isVisible:1,
        }
    },
    reducers:{
       setMsgPage({msgPage},{payload}){
        msgPage.isVisible=payload;
        
      },
      setOnlineUsers(state,{payload}){
        // console.log("payload",payload);
        
        state.onlineUsers=payload
      }
    }
})

export const {setMsgPage,setOnlineUsers}=userMessageSlice.actions
export default userMessageSlice.reducer