import {  configureStore } from "@reduxjs/toolkit";
import authSlice from "./sclice/authSlice/authSlice";
import searchSlice from "./sclice/searchSlice";
import navsliderSlice from "./sclice/navsliderSlice";
import singleFriendSlice from "./sclice/singleFriendSlice";
import globalSlice from "./sclice/globalSlice";
import friendSlice from "./sclice/friendSlice";
import userProfileSlice from "./sclice/userProfileSlice";
import songSlice from "./sclice/songSlice";
import storySlice from "./sclice/storySlice";
import userPostSlice from "./sclice/userPostSlice";
import userMessageSlice from "./sclice/userMessageSlice";



const store=configureStore({
    reducer:{


        userAuth:authSlice,
        searchUser:searchSlice,
        navSlider:navsliderSlice,
        snglFrnd:singleFriendSlice,
        global:globalSlice,
        userFriend:friendSlice,
        userProfile:userProfileSlice,
        songList:songSlice,
        userStory:storySlice,
        userPost:userPostSlice,
        userMessage:userMessageSlice
    },

})

export {store}