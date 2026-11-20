import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../helpers/axiosInstance'

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
}

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
        toast.error(error?.response?.data?.massage);
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
        return (await res).data;
    }catch(e){
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("auth/logout", async() => {
    try{
        const res = axiosInstance.post("users/logout");
        toast.promise(res, {
            loading: "wait!! logout in progress..",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out!!"
        })
    }catch(e){
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user.role;
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