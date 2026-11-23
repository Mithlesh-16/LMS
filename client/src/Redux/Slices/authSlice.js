import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../helpers/axiosInstance'

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === "true" || false,
    role: localStorage.getItem('role') || "",
    data: (() => {
        try{    
            return JSON.parse(localStorage.getItem("data")) || {};
        }catch(e){
            return {}
        }
    })()
}

// we do network request using the createAsyncThunk
export const createAccount= createAsyncThunk("/auth/signup", async(data) => {
    try{
        const res = axiosInstance.post("users/register", data);
        toast.promise(res, {
            loading: "wait!! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create Account"
        })
        return (await res).data;
    }
    catch(e){
        toast.error(e?.response?.data?.massage);
        return rejectWithValue(e?.response?.data);
    }
})

export const login = createAsyncThunk("/auth/login", async(data) => {
    try{
        const res = axiosInstance.post("users/login", data);
        toast.promise(res, {
            loading: "wait!! while logging in",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login"
        })
        const response = (await res).data;
        return response;
        // console.log("response of login asyncThunk: ", response.data);
    }catch(e){
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
})

export const updateProfile = createAsyncThunk("auth/updateProfile", async(data) => {
    try{
        const res = axiosInstance.post("users/profile-update", data);
        toast.promise(res,{
            loading: "wait!! Profile Updation in progress",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to Update Profile"
        })
        const response = (await res).data;
        return response;
    }catch(e){
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
})

export const logout = createAsyncThunk("auth/logout", async() => {
    try{
        const res = axiosInstance.get("users/logout");
        toast.promise(res, {
            loading: "wait!! logout in progress..",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out!!"
        })
        return (await res).data;
    }catch(e){
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
})

export const getUserData = createAsyncThunk("user/details", async() => {
    try{
        const res = axiosInstance.get('/user/me');
        return (await res).data;
    }catch(e){
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            const user = action?.payload?.userExists;
            if(!user) return;
            localStorage.setItem("data", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", user.role);
            state.isLoggedIn = true;
            state.data = user;
            state.role = user.role;
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            const user = action?.payload?.user;
            console.log("user after update Profile: ", user);
            if(!user) return;
            localStorage.setItem("data", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", user.role);
            state.isLoggedIn = true;
            state.data = user;
            state.role = user.role;
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.data = {};
            state.role = "";
        })
    }
})

export const {} = authSlice.actions;
export default authSlice.reducer;