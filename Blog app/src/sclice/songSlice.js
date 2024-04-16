import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSong=createAsyncThunk("getSong/songList",async({srhQuery,offset,limit})=>{
    try {
        // console.log(srhQuery || "hindi song ");\
        
        const options = {
            method: 'GET',
            url: 'https://spotify-web2.p.rapidapi.com/search/',
            params: {
              q:srhQuery || "hindi song " ,
              type: 'tracks',
              offset:offset,
              limit:limit,
              numberOfTopResults: '5'
            },
            headers: {
              'X-RapidAPI-Key': '283888f038mshec22b2d2318bdbap13c030jsn0d4b3fa639a1',
              'X-RapidAPI-Host': 'spotify-web2.p.rapidapi.com'
            }
          };
          const response = await axios.request(options);
        // console.log(response.data);
        return response.data.tracks;
    } catch (error) {
        console.log(error);  
    }
    })



const songSlice=createSlice({
    name:"songList",
    initialState:{
        songData:{},
        loading:false,

    },
    extraReducers:(builder)=>{
       builder.addCase(getSong.pending,(state)=>{
        state.loading=true
       })
       builder.addCase(getSong.fulfilled,(state,{payload})=>{
        state.loading=false;
        state.songData=payload;
       })
    }
})


export default songSlice.reducer;