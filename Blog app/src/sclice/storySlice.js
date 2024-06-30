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

        urlLoader(res.data)
            
            return res.data
        })
    } catch (error) {
        alert(error)
    }
})

export const addComment=createAsyncThunk("addComment/userStory",async({cmtMessage,storyId})=>{

    console.log("hfsdgfh");
    return await axios.post("/user/story/addComment",{cmtMessage,storyId},{withCredentials:true}).then(res=>{
        console.log(res.data);
        return res.data
    }).catch(err=>{
        alert(err)
    })
})


export const getAllcomments=createAsyncThunk("getAllcomments",async(storyId)=>{

    return await axios.get("/user/story/allComments",{params:{storyId},withCredentials:true}).then(res=>{
        console.log(res.data,"kjggg");
        return res.data
    }).catch(err=>{
        alert(err)
    })
})
const storySlice=createSlice({
    name:"userStory",
    initialState:{
        loading:false,
        error:null,
        status:false,
        storyData:[],
        selfStoryData:[],
        comments:{
            data:[],
            status:0,
            loading:false
        },
        addComment:{
            addStatus:false,
            loading:false
        }

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
            state.selfStoryData=payload.selfStory || [];
        })
        
        builder.addCase(addComment.pending,({addComment},{payload})=>{
            addComment.addStatus=false;
            addComment.loading=true
        })

        builder.addCase(addComment.fulfilled,({addComment},{payload})=>{
            addComment.addStatus=payload.status;
            addComment.loading=false
        })

    
        builder.addCase(getAllcomments.pending,({comments})=>{
            comments.loading=true
        })
        builder.addCase(getAllcomments.fulfilled,({comments},{payload})=>{
            console.log(payload);
            comments.data=payload.data;
            comments.status=payload.status;
            comments.loading=false;
        })


    }
})

export default storySlice.reducer