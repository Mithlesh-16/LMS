import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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
        return (await response).data.courses;
    }catch(e){
        toast.error(error?.response?.message);
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default courseSlice.reducer;
export const {} = courseSlice.actions;