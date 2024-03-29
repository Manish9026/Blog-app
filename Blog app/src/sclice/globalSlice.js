import { createSlice } from "@reduxjs/toolkit";

const globalSlice=createSlice({
    name:"global",
    initialState:{
        loaderStatus:false,
        searchTxt:""
    },reducers:{
        setSrhValue(state,{payload}){
            state.searchTxt=payload
        }
    }
})

export const {setSrhValue}=globalSlice.actions
export default globalSlice.reducer