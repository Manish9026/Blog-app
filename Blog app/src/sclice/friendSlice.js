import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { url } from "../tools/serverURL"
import { toast } from "react-toastify"
import { urlLoader } from "../utills/urlReload"
import { useDispatch } from "react-redux"

axios.defaults.baseURL=url
export const sndFrndReq=createAsyncThunk("sndFrndReq/userFriend",async(frndId)=>{
 return await axios.get(`/user/f1/send-request?friendId=${frndId}`,{withCredentials:true}).then(res=>{
    urlLoader(res.data);
    return res.data
 }).catch(err=>{
    alert(err)
 })
})

export const cnfFrndReq=createAsyncThunk("cnfFrndReq",(frndReqId)=>{
    return axios.get(`/user/f1/add?senderId=${frndReqId}`,{withCredentials:true}).then(res=>{
        urlLoader(res.data)
        return res.data
     }).catch(err=>{
        alert(err)
     })
    })

export const getNotificData=createAsyncThunk("getNotificData",async()=>{
    console.log("getNotific called");
    return await axios.get("/user/f1/notification",{withCredentials:true}).then(res=>{
    
        urlLoader(res.data)

        return res.data.data
     }).catch(err=>{
        alert(err)
     })
    })

export const getAllFrnd=createAsyncThunk("getAllFrnd",({userId,type})=>{

    console.log(type,userId);
        return axios.get(`user/f1/get-friends?userId=${userId}&type=${type}`,{withCredentials:true}).then(res=>{
           
           
            return  res.data.data
        })
    })
export const getFriendPageData=async()=>{
 
}

const friendSlice=createSlice({
    name:"userfriend",
    initialState:{
        loading:false,
        error:"",
        notifiData:[],
        friends:[],

    },
    extraReducers:(builder)=>{
builder.addCase(getNotificData.pending,(state)=>{
    state.loading=true;
})
builder.addCase(getNotificData.fulfilled,(state,{payload})=>{
    state.loading=false;
    state.notifiData=payload || [];
})


builder.addCase(getAllFrnd.pending,(state)=>{

    state.loading=true;
})
builder.addCase(getAllFrnd.fulfilled,(state,{payload})=>{


    state.loading=false;
    state.friends=payload.friends

})
    },

})

export default friendSlice.reducer
