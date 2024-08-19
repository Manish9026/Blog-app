import { createSlice } from "@reduxjs/toolkit";


const userMessageSlice=createSlice({
    name:"userMessage",
    initialState:{
        msgPage:{
            isVisible:1,
        }
    },
    reducers:{
       setMsgPage({msgPage},{payload}){
        msgPage.isVisible=payload;
        
      }
    }
})

export const {setMsgPage}=userMessageSlice.actions
export default userMessageSlice.reducer