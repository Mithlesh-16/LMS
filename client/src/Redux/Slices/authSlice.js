import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../helpers/axiosInstance'

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {}
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
        console.log("response of login asyncThunk: ", response.data);
    }catch(e){
        toast.error(e?.response?.data?.message);
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
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.userExists));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.userExists?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.userExists;
            state.role = action?.payload?.userExists?.role;
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