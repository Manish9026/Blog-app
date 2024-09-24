import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../tools/serverURL";

axios.defaults.baseURL=url;

export const getMessages=createAsyncThunk("getMessages",async(receiverId)=>{

  return await axios.get("/user/m1/messages",{params:{receiverId},withCredentials:true}).then((res)=>{
    console.log(res.data);
    
    return res.data
  }).catch((error)=>{
    // window.location.replace("/internal-error")
    console.log(error);
    
  })
})
const userMessageSlice=createSlice({
    name:"userMessage",
    initialState:{
        onlineUsers:[],
        msgPage:{
            isVisible:1,
            messages:null,
            loading:false,
          
        },
        selectedUser:null,
    },
    reducers:{
       setMsgPage({msgPage},{payload}){
        msgPage.isVisible=payload
        
      },
      setMessages({msgPage},{payload}){
        if(payload && msgPage.messages){
         const lenght= msgPage.messages?.length

         msgPage.messages[lenght-1]?.messages?.push(payload)
         
          // msgPage.messages.slice(-1)[0].messages.push()
        }
      },
      setOnlineUsers(state,{payload}){
        // console.log("payload",payload);
        
        state.onlineUsers=payload
      },
      setReceiverId(state,{payload}){
        console.log(payload);
        
        state.selectedUser=payload
      }
    },
    extraReducers:(builder)=>{
      builder.addCase(getMessages.pending,({msgPage})=>{
    msgPage.loading=true
      })
      builder.addCase(getMessages.fulfilled,({msgPage},{payload})=>{
    msgPage.loading=false;
    msgPage.messages=payload?.data || null
        
      })
    }
})

export const {setMsgPage,setOnlineUsers,setReceiverId,setMessages}=userMessageSlice.actions
export default userMessageSlice.reducer