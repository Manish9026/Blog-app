import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../tools/serverURL";
import { urlLoader } from "../utills/urlReload";
axios.defaults.baseURL=url;

export const getUserProfile=createAsyncThunk("getUserProfile/userProfile",async(type)=>{
    try {
 return await axios.get(`/user/profile/getUserProfile?type=${type}`,{withCredentials:true}).then(res=>{

console.log(res.data);
    urlLoader(res.data)
    return res.data
}).catch(error=>{
    alert(error)
})
        
        
    } catch (error) {
        
    }
})

export const updateProfile=createAsyncThunk("updateProfile/userProfile",async({type,field})=>{

    console.log(type,field);
    try {
        return await axios.patch(`/user/profile/updateProfile?type=${type}`,{field},{withCredentials:true}).then(res=>{
            console.log(res.data);
            urlLoader(res.data)
            return res.data
        })
    } catch (error) {
        alert(error)
    }
})

const userProfileSlice=createSlice({
name:"userProfile",
initialState:{
    status:false,
    loading:false,
    data:[],
    formBoxStatus:false,
    error:null
},
reducers:{

    setBoxStatus(state){
        state.formBoxStatus=true

    },
    resetBoxStatus(state){
        state.formBoxStatus=false
    }
},
extraReducers:(builder)=>{
    builder.addCase(getUserProfile.pending,(state)=>{
        state.loading=true;       
    })
    builder.addCase(getUserProfile.fulfilled,(state,{payload})=>{
        
        state.loading=true;       
        state.data=payload.data || [];
        state.status=payload.status;
    })

    builder.addCase(updateProfile.pending,(state)=>{
        state.loading=true;
    })
    builder.addCase(updateProfile.fulfilled,(state,{payload})=>{
        state.loading=false;
        state.data=payload.data;
        state.status=payload.status;
    })
}
})

export const {setBoxStatus,resetBoxStatus}=userProfileSlice.actions
export default userProfileSlice.reducer