import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './Slices/authSlice'
import courseSliceReducer from './Slices/courseSlice'
import RazorpaySliceReducer from './Slices/RazorpaySlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: RazorpaySliceReducer
    },
    devTools: true
});

export default store;