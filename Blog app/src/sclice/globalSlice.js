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
        ,
        popupStatus:{
            isActive:0,
            message:""
        },
        storyViewToggle:{
            status:0,
            pos:0
        },
    },reducers:{
        setSrhValue(state,{payload}){
            state.searchTxt=payload
        },
        showImage(state,{payload}){
            state.imageShow.img=payload;
            state.imageShow.toggle=!state.imageShow.toggle;
        },
        popupHandler({popupStatus},{payload}){
            popupStatus.isActive=!popupStatus.isActive;
           popupStatus.message=payload;

        },
        setStoryViewToggle({storyViewToggle},{payload}){
            storyViewToggle.status=!storyViewToggle.status;
            storyViewToggle.pos=payload;
        }
    }
})

export const {setSrhValue,showImage,popupHandler,setStoryViewToggle}=globalSlice.actions
export default globalSlice.reducer