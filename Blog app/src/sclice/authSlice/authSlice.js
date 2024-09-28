import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 
import axios from 'axios'
import { url } from "../../tools/serverURL";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";
import { urlLoader } from "../../utills/urlReload";
axios.defaults.baseURL=url
//register async function

export const getRegister=createAsyncThunk("getRegister/userAuth",async(data)=>{
  
  console.log(data);

  try {
    const formData = new FormData();
    for (const key in data){
      formData.append(key,data[key]);
    }
    
  return  await axios.post("/user/s1/register",formData,{headers:{
    "Content-Type":"multipart/form-data"
  }}).then(res=>{

  
    res.data.status?
    toast.success(res.data.message): toast.error(res.data.message)

    return res.data
  }).catch(err=>{
    window.location.replace("/internal-error")
  })

} catch (error) {
  console.log(error);
}
})
// login function
export const getLogin=createAsyncThunk("getLogin/userAuth",async(data)=>{
    return await axios.post("/user/s1/login",data,{withCredentials:true}).then(res=>{
  
      console.log(res.data.message)
      
      if(res.data.status){
        toast.success(res.data.message) 
        // Navigate(-1)
      window.history.back();

      }else{
        toast.error(res.data.message)
      // window.history.pushState({},"",path)

      }
     
      
  
      return res.data
    }).catch(err=>{
      window.location.replace("/internal-error")
  
    })
  })

// get userInfo function
export const getUserInfo=createAsyncThunk("getUserInfo/userAuth",(data)=>{
    return axios.get("/user/s1/user-Info",{withCredentials:true}).then(res=>{
  
      // console.log(res.data.data)
      
        
      
  
      return res.data.data
    }).catch(err=>{
  
    })
  })


export const isVerified=createAsyncThunk("isVerified/userAuth",async()=>{

  return axios.get("/user/s1/verify",{withCredentials:true}).then(res=>{
    // const {path,status}=res.data
    // console.log(res.data);
    // alert(JSON.stringify(res.data))
    // urlLoader(res.data)
    // if(status){
    //  console.log("login succ");
    //   window.history.back();
    //   // window.location.reload();
    // }
    // else{
     
    //   window.history.pushState({},"",path)
    //   // window.location.reload();
      
    // }

    return res.data
  }).catch(error=>{
    window.location.replace("/internal-error")

  })
})

export const logout =createAsyncThunk("logout",async()=>{
  await  axios.get("/user/s1/logout",{withCredentials:true}).then(res=>{
    toast.success(res.data.message);
    if(res.data.status){
      window.history.pushState({},"","/");
      window.location.reload();
    }
    
    return res.data
  }).catch(err=>{
    window.location.replace("/internal-error")
  })
})
  // export const getUserInfo=createAsyncThunk('getUserInfo/userAuth',()=>{
  //   axios.get('user/s1/getInfo').then(res=>{
  //     return res.data
  //   })
  // })

  export const loginWithGoogle=createAsyncThunk("loginWithGoogle",async(code)=>{

    try {
     return await axios.get(`/user/s1/auth/google?code=${code}`,{withCredentials:true}).then(res=>{
        urlLoader(res.data)

        return res.data
      })
    } catch (error) {
     window.location.replace("/internal-error")
    //  console.log("error");
     
      
    }
  })
const authSlice=createSlice({
    name:"userAuth",
    initialState:{
        status:false,
        error:false,
        message:"",
        loading:false,
        userInfo:[],
        userVerified:false

    },
    reducers:{

    },
    extraReducers:(builder)=>{
        //register extra reducer
      
        builder.addCase(getRegister.pending,(state)=>{
            state.loading=true;
            state.message="still waiting some time",
            state.status=false

        })
        builder.addCase(getRegister.fulfilled,(state,{payload})=>{
          
            state.loading=false;
            state.message=payload.message
            state.status=payload.status;

        })
        builder.addCase(getRegister.rejected,(state,{payload})=>{
            state.loading=false;
            state.message=payload.message
            state.status=false

        })

        //login extra reducer

        builder.addCase(getLogin.pending,(state)=>{
            state.loading=true;
            state.message="still waiting some time",
            state.status=false

        })
        builder.addCase(getLogin.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.message=payload.message
            state.status=payload.status

        })
        builder.addCase(getLogin.rejected,(state,{payload})=>{
            state.loading=false;
            state.message=payload.message
            state.status=false

        })

        //isVerified extra reducer
        builder.addCase(getUserInfo.fulfilled,(state,{payload})=>{
          state.userInfo=payload || [];

        })
        builder.addCase(isVerified.fulfilled,(state,{payload})=>{
          state.status=payload.status
        })

        builder.addCase(logout.fulfilled,(state,{payload})=>{
          state.status=false
        })


        builder.addCase(loginWithGoogle.pending,(state)=>{
        state.loading=true;
        
        })
        builder.addCase(loginWithGoogle.fulfilled,(state,{payload})=>{
        state.loading=false;
        state.status=true
        console.log("payload",payload);
        
          
        })

        
        

    },

})

export default authSlice.reducer