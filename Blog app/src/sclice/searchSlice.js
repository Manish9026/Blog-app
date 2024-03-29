import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from 'axios'
import { url } from "../tools/serverURL";
import { toast } from "react-toastify";
axios.defaults.baseURL=url
export const getSrhRes=createAsyncThunk("getSrhRes/searchUser",async(srhData)=>{

    return await axios.get(`user/f1/search?srhPram=${srhData}`,{withCredentials:true}).then(res=>{

        if(res.data.message=="search box is empty"){
            toast(res.data.message)
        }
        // console.log(res.data);
        return res.data
    }).catch(err=>{
        alert(err)
    })
})

const searchSlice=createSlice({
    name:"searchUser",
    initialState:{
        status:false,
        loading:false,
        data:[],
        error:null
    },
    extraReducers:(builder)=>{

        builder.addCase(getSrhRes.pending,(state)=>{
            state.loading=true
            // state.status=false
        })
        builder.addCase(getSrhRes.fulfilled,(state,{payload})=>{
            state.loading=false
            state.status=payload.status
            state.data=payload.data
        })
    },
})

export default searchSlice.reducer
