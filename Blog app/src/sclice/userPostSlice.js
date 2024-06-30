import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../tools/serverURL";
import { urlLoader } from "../utills/urlReload";
axios.defaults.baseURL=url;
 export const uploadPost=createAsyncThunk("uploadPost/userPost",async(data)=>{

    try {
        console.log(data);
        const  formData=new FormData();
        for (const key in data){
            console.log(key,data);
            if(key=="postFiles"){
                data[key].map((file)=>{

                    formData.append(key,file);
                })

            }else{

                formData.append(key,data[key]);
            }
          }
        return await axios.post("/user/p1/upload",formData,{withCredentials:true, headers: {
            'Content-Type': 'multipart/form-data'
          }}).then(res=>
            {
                console.log(res.data);
            urlLoader(res.data)
               return res.data
            }
        )
    } catch (error) {
        // alert(error)
        console.log(error);
    }
})
export const getAllPost=createAsyncThunk("getAllPost/userPost",async({skip=0,next=10})=>{

    try {

       return  await axios.get(`/user/p1/getPosts?skip=${skip}&next=${next}`,{withCredentials:true}).then(res=>{


            return res.data
        }).catch(error=>{
            alert(error)
        })
        
    } catch (error) {
        alert(error)
        
    }

})

export const setPostLike=createAsyncThunk("setPostLike/userPost",async(postId,{dispatch})=>{

    const data= await axios.get(`/user/p1/like?postId=${postId}`,{withCredentials:true}).then(async res=>{
    return res.data
}
   ).catch(err=>alert(err))

   dispatch(getAllPost({skip:0,next:10}))
    return data

})
export const setPostdisLike=createAsyncThunk("setPostdisLike/userPost",async(postId,{dispatch})=>{
 
    const data= await axios.get(`/user/p1/dislike?postId=${postId}`,{withCredentials:true}).then(async res=>{
      
     return res.data

 }
    ).catch(err=>alert(err))

    dispatch(getAllPost({skip:0,next:10}))
    return data
 })
const postSlice=createSlice({
    name:"userPost",
    initialState:{
        uploadState:{
        status:false,
        loading:false
        },
        postState:{
            data:[],
            loading:false,
            error:"",
            status:false
        },
        likeState:{
            loading:false,
            status:false,
        }
        
    },
    extraReducers:(builder)=>{
        builder.addCase(uploadPost.pending,({uploadState})=>{
            uploadState.loading=true;
        })
        builder.addCase(uploadPost.fulfilled,({uploadState})=>{
            uploadState.loading=false;
        })
        builder.addCase(uploadPost.rejected,({uploadState})=>{
            uploadState.loading=false;
            toast.success("your request is rejected")
        })
    
        builder.addCase(getAllPost.pending,({postState})=>{
            postState.loading=true;
        })
        
        builder.addCase(getAllPost.fulfilled,({postState},{payload})=>{
            postState.loading=false;
            postState.status=payload.status;
            postState.data=payload.data || [];


        })
        builder.addCase(setPostLike.pending,({likeState})=>{
            likeState.status=false
        })
        builder.addCase(setPostLike.fulfilled,({likeState},{payload})=>{
            likeState.status=payload.status
        })
        builder.addCase(setPostdisLike.pending,({likeState})=>{
            likeState.status=false     })
        builder.addCase(setPostdisLike.fulfilled,({likeState},{payload})=>{
            likeState.status=payload.status
      })
    }
})

export default postSlice.reducer