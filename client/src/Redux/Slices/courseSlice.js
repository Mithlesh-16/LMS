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

export const createNewCourse = createAsyncThunk("/course/create", async(data) => {
    try{
        const formData = new FormData();
        formData.append("title", data?.title);
        formData.append("category", data?.category);
        formData.append("description", data?.description);
        formData.append("thumbnail", data?.thumbnail);
        formData.append("createdBy", data?.createdBy);

        const response = axiosInstance.post('/courses', formData);
        toast.promise(response, ({
            loading: "Creating new Course",
            success: "Course created Successfully",
            error: "Failed to create course"
        }))
        return (await response)?.data;
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