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

    return await axios.get("/user/f1/notification",{withCredentials:true}).then(res=>{
    
        urlLoader(res.data)

        return res.data.data
     }).catch(err=>{
        alert(err)
     })
    })

export const getAllFrnd=createAsyncThunk("getAllFrnd",async({userId,type})=>{


        return await axios.get(`user/f1/get-friends?userId=${userId}&type=${type}`,{withCredentials:true}).then(res=>{
           
           
            return  res.data.data
        })
    })
export const getFriendPageData=createAsyncThunk("getFriendPageData",async()=>{
    return await axios.get("/user/f1/frnd-detail",{withCredentials:true}).then((res)=>{
   return res.data
    }).catch(err=>{
       window.location.replace("/internal-error")
    })
   })

const friendSlice=createSlice({
    name:"userfriend",
    initialState:{
        loading:false,
        error:"",
        notifiData:[],
        friends:[],
        sendedRequest:[],
        receivedRequest:[]

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
    state.friends=payload.friends || []

})
builder.addCase(getFriendPageData.pending,(state)=>{
state.loading=true
})
builder.addCase(getFriendPageData.fulfilled,(state,{payload})=>{
    console.log(payload,"payload");
    state.friends=payload?.data?.friends || [];
    state.receivedRequest=payload?.data.receivedRequest || [];
    state.sendedRequest=payload?.data.sendRequest || [];
state.loading=false

    
})
    },

})

export default friendSlice.reducer
