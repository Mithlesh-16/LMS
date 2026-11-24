import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    Lectures: [],
}

export const getCourseLectures = createAsyncThunk("/course/lecture", async(cid, {rejectWithValue}) => {
    try{
        const response = axiosInstance.get(`/courses/${cid}`);
        toast.promise(response, {
            success: "Lectures Fetched Successfully!!",
            error: "Failed to load the Lectures",
            loading: "Fetching course Lectures"
        })
        return (await response)?.data;
    }catch(e){
        toast.error(e?.response?.data?.message);
        rejectWithValue(e?.response?.data)
    }
})

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async(data, {rejectWithValue}) => {
    try{
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);
        const response = axiosInstance.post(`/courses/${data.id}`, formData);
        toast.promise(response, {
            loading: "adding course Lectures",
            success: "Lectures added Successfully",
            error: "Failed to add the lectures"
        });
        return (await response)?.data;
    }catch(e){
        toast.error(e?.response?.data?.message);
        rejectWithValue(e?.response?.data);
    }
})

export const deleteCourseLecture = createAsyncThunk("course/lecture/delete", async(data, {rejectWithValue}) => {
    try{
        const response = axiosInstance.delete(`/courses/?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response, {
            loading: "deleting course Lecture",
            success: "Lecture deletion successful",
            error: "Failed to delete the Lecture"
        })
    }catch(e){
        toast.error(e?.response?.data);
        rejectWithValue(e?.response?.data);
    }
})

const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            console.log(action);
            state.Lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled, (state, action) => {
            console.log(action)
            state.Lectures = action?.payload?.course?.lectures;
        })
        .addCase(deleteCourseLecture.fulfilled, (state, action) => {
            console.log("delete action: ", action);
            state.Lectures = action?.payload?.course?.lectures;
        })

    }
})

export default lectureSlice.reducer;
export const {} = lectureSlice.actions;