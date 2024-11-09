import { createSlice } from "@reduxjs/toolkit";

const navsliderSlice=createSlice({
    name:"navslider",
    initialState:{
        slideStatus:true
    },
    reducers:{
        navTogle(state,{payload}){
          
            switch (payload) {
                case "onClick":
                state.slideStatus=!state.slideStatus
                    
                    break;

             case "hover":
                state.slideStatus=false
                    
                    break;

                    case "leave":
                state.slideStatus=true
                    
                    break;
                default:
                state.slideStatus=false

                    break;
            }

        }
    },
})
export const {navTogle}=navsliderSlice.actions
export default navsliderSlice.reducer