import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../tools/serverURL";
import { urlLoader } from "../utills/urlReload";
axios.defaults.baseURL=url;
export const getUserInfo=createAsyncThunk("getUserInfo/snglFrnd",async(param)=>{

   return axios.get(`/user/sf/userInfo?uid=${param}`,{withCredentials:true}).then(res=>{
    console.log(res.data,"getInfo");
        return res.data
    }).catch(err=>{
        alert(err)
    })
})

export const setLike=createAsyncThunk("setLike",async(frndId)=>{

  return await axios.get(`/user/sf/userLikes?friendId=${frndId}&type=like`,{withCredentials:true}).then(res=>{
    console.log(res.data)
    urlLoader(res.data)

    return res.data
  }) 
})
export const setDisLike=createAsyncThunk("setLike",async(frndId)=>{

    return await axios.get(`/user/sf/userLikes?friendId=${frndId}&type=disLike`,{withCredentials:true}).then(res=>{
    //   console.log(res.data)
    urlLoader(res.data)
      return res.data
    }) 
  })
export const followerHandler=createAsyncThunk("followerHandler",async(data,{dispatch})=>{

    return await axios.get(`/user/sf/userFollowers?followerId=${data?.followerId}&type=${data?.type}`,{withCredentials:true}).then(res=>{
    //   console.log(res.data)
    urlLoader(res.data)
      return res.data
    }) 
  })
const singleFriendSlice=createSlice({
    name:"snglFrnd",
    initialState:{
        userInfo:[],
        loading:false,
        error:false,
        friends:[],
        frndStatus:"unCheck",
        likeStatus:false
    },
    extraReducers:(builder)=>{
builder.addCase(getUserInfo.pending,(state)=>{
    state.loading=true;
})
builder.addCase(getUserInfo.fulfilled,(state,{payload})=>{
    state.loading=false;
    // console.log(payload.data);
    state.userInfo=payload.data;
    state.likeStatus=payload.likeStatus
    state.frndStatus=payload.frndStatus
})


    }
})


export default singleFriendSlice.reducer