import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../tools/serverURL";
import { urlLoader } from "../utills/urlReload";
axios.defaults.baseURL=url;

export const createStory=createAsyncThunk("createStory/userStory",async({data,storyImage})=>{
    console.log(data);
    try {

        const formData = new FormData();
    formData.append("storyImage",storyImage);
        for (const key in data){
          formData.append(key,data[key]);
        }
    return await axios.post("/user/story/create",formData,{withCredentials:true}).then(res=>{
        console.log(res.data);
        urlLoader(res.data)
        return res.data
    })
        
    } catch (error) {
        alert(error)
    }
})

const storySlice=createSlice({
    name:"userStory",
    initialState:{
        loading:false,
        error:null,
        status:false

    },
    extraReducers:(builder)=>{

        builder.addCase(createStory.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(createStory.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.status=payload.status || false
        })
    }
})

export default storySlice.reducer