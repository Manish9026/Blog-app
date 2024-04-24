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


export const getStories=createAsyncThunk("getStories/userStory",async()=>{
    try {
        
       return await axios.get("/user/story/getStory",{withCredentials:true}).then(res=>{

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
        status:false,
        storyData:[],
        selfStoryData:[]

    },
    extraReducers:(builder)=>{

        builder.addCase(createStory.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(createStory.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.status=payload.status || false
        })

        builder.addCase(getStories.pending,(state)=>{

        })
        builder.addCase(getStories.fulfilled,(state,{payload})=>{
            state.storyData=payload.data || [];
            state.selfStoryData=payload.selfStory;
        })

    }
})

export default storySlice.reducer