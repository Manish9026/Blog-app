import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../tools/serverURL";
import { urlLoader } from "../utills/urlReload";
axios.defaults.baseURL = url;

export const getUserProfile = createAsyncThunk("getUserProfile/userProfile", async (type) => {
    try {
        return await axios.get(`/user/profile/getUserProfile?type=${type}`, { withCredentials: true }).then(res => {

            urlLoader(res.data)
            return res.data
        }).catch(error => {
            alert(error)
        })


    } catch (error) {

    }
})

export const updateProfile = createAsyncThunk("updateProfile/userProfile", async ({ type, field, file }, { dispatch }) => {

    const formData = new FormData();
    formData.append("image", file)

    try {
        if (type == "profilePic" || type == "coverPic") dispatch(uploadLoader(type))

        return await axios.patch(`/user/profile/updateProfile?type=${type}`, file ? formData : { field }
            , { withCredentials: true }).then(res => {
                urlLoader(res.data)
                return res.data
            })



    } catch (error) {
        alert(error)
    }
})

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: {
        status: false,
        loading: false,
        data: [],
        formBoxStatus: false,
        error: null,
        uploadLoading: { pic: false, coverPic: false, status: false }
    },
    reducers: {

        setBoxStatus(state) {
            state.formBoxStatus = true

        },
        resetBoxStatus(state) {
            state.formBoxStatus = false
        },
        uploadLoader({ uploadLoading }, { payload }) {
            if (payload == "profilePic") {
                uploadLoading.pic = true;
            }
            else {
                uploadLoading.coverPic = true;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {



            state.data = payload.data || [];


            state.loading = false;
            state.status = payload.status;
        })

        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true;

        })
        builder.addCase(updateProfile.fulfilled, (state, { payload }) => {



            if (payload.type == "coverImage") {
                state.uploadLoading.coverPic = false;
                state.uploadLoading.status = payload.status;
            }
            else if (payload.type == "profileImage") {
                state.uploadLoading.pic = false;
                state.uploadLoading.status = payload.status;


            }
            else {
                state.loading = false;
                state.data = payload.data;
                state.status = payload.status;
            }

        })
    }
})

export const { setBoxStatus, resetBoxStatus, uploadLoader } = userProfileSlice.actions
export default userProfileSlice.reducer