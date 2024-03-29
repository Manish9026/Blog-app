import {  configureStore } from "@reduxjs/toolkit";
import authSlice from "./sclice/authSlice/authSlice";
import searchSlice from "./sclice/searchSlice";
import navsliderSlice from "./sclice/navsliderSlice";
import singleFriendSlice from "./sclice/singleFriendSlice";
import globalSlice from "./sclice/globalSlice";
import friendSlice from "./sclice/friendSlice";



const store=configureStore({
    reducer:{

        userAuth:authSlice,
        searchUser:searchSlice,
        navSlider:navsliderSlice,
        snglFrnd:singleFriendSlice,
        global:globalSlice,
        userFriend:friendSlice
    },

})

export {store}