import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {toast} from 'react-hot-toast'
import axiosInstance from "../../helpers/axiosInstance"
const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try{
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "loading course data...",
            success: "courses loaded successfully",
            error: "Failed to get the courses"
        });
        const res = (await response).data;
        return res;
    }catch(e){
        toast.error(e?.response?.data?.message);
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if(action?.payload){
                state.courseData = [...action.payload.lectures];
                // console.log("fulfilled Payload: ", action?.payload.lectures);
            }
        }
        )
    }
})

export default courseSlice.reducer;
export const {} = courseSlice.actions;