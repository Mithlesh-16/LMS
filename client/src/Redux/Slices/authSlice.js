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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})

export const {} = authSlice.actions;
export default authSlice.reducer;