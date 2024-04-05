import { createSlice } from "@reduxjs/toolkit";

const globalSlice=createSlice({
    name:"global",
    initialState:{
        loaderStatus:false,
        searchTxt:"",
        imageShow:{
            img:"https://res.cloudinary.com/dztzqqiex/image/upload/v1712292456/g5parlhrritrijl22jed.jpg",
            toggle:0
        }
    },reducers:{
        setSrhValue(state,{payload}){
            state.searchTxt=payload
        },
        showImage(state,{payload}){
            state.imageShow.img=payload;
            state.imageShow.toggle=!state.imageShow.toggle;
        }
    }
})

export const {setSrhValue,showImage}=globalSlice.actions
export default globalSlice.reducer