import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    key: "",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}
export const getRazorpayId = createAsyncThunk("/razorpay/getId", async(_, {rejectWithValue}) => {
    try{
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response?.data;
    }catch(e){
        toast.error("Failed to load data");
        return;
    }
})

export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async(_, {rejectWithValue}) => {
    try{
        const response = await axiosInstance.post("/payments/subscribe");
        return response?.data;
    }catch(e){
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
})

export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data, {rejectWithValue}) => {
    try{
        const response = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data?.razorpay_payment_id,
            razorpay_subscription_id: data?.razorpay_subscription_id,
            razorpay_signature: data?.razorpay_signature
        })
        return response?.data;
    }catch(e){
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
})

export const cancelCourseBundle = createAsyncThunk("/payments/unsubscribe", async(_, {rejectWithValue}) => {
    try{
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "unsubscribing the course",
            success:  (data) => {
                return data?.data?.message
            },
            error: "Failed to unsubscribe"
        })
        return (await response)?.data;
    }catch(e){
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
})

export const getPaymentRecord = createAsyncThunk("/payments/record", async(_, {rejectWithValue}) => {
    try{
        const response = axiosInstance.get("/payments?count=100");
        toast.promise(response, {
            loading: "Getting the payment records",
            success: (data) => {
                return data?.data?.message
            },
            error: "failed to get payment records"
        })
        return (await response)?.data;
    }catch(e){
        toast.error("Payment fetch failed!!");
        return rejectWithValue(e?.response?.data);
    }
})

const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorpayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key
            })
            .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
                state.subscription_id = action?.payload?.subscription_id;
            })
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
                state.allPayments = action?.payload?.allPayments;
                state.finalMonths = action?.payload?.finalMonths;
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            })
    }
})

export const {} = razorpaySlice.actions;
export default razorpaySlice.reducer;