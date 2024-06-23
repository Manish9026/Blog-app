import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../tools/serverURL";
import { urlLoader } from "../utills/urlReload";
axios.defaults.baseURL=url;
 export const uploadPost=createAsyncThunk("uploadPost/userPost",async(data)=>{

    try {
        console.log(data);
        const  formData=new FormData();
        for (const key in data){
            formData.append(key,data[key]);
          }
        return await axios.post("/user/p1/upload",formData,{withCredentials:true}).then(res=>
            {
            urlLoader(res.data)
               return res.data
            }
        )
    } catch (error) {
        alert(error)
        console.log(error);
    }
})
const postSlice=createSlice({
    name:"userPost",
    initialState:{
        uploadState:{
        status:false,
        loading:false
        }
        
    },
    extraReducers:(builder)=>{
        builder.addCase(uploadPost.pending,({uploadState})=>{
            uploadState.loading=true;
        })
        builder.addCase(uploadPost.fulfilled,({uploadState})=>{
            uploadState.loading=false;
        })
        builder.addCase(uploadPost.rejected,({uploadState})=>{
            uploadState.loading=false;
            toast.success("your request is rejected")
        })
    
    }
})

export default postSlice.reducer