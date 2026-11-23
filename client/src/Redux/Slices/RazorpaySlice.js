import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    key: "",
    subscription: "",
    isPaymentVerfied: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}
export const getRazorpayId = createAsyncThunk("/razorpay/getId", async() => {
    try{
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data;
    }catch(e){
        toast.error("Failed to load data");
        return;
    }
})

export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async() => {
    try{
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    }catch(e){
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
})

export const verifyUserPayment = createAsynThunk("/payments/verify", async (data) => {
    try{
        const response = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data?.razorpay_payment_id,
            razorpay_subscription_id: data?.razorpay_subscription_id,
            razorpay_signature: data?.razorpay_signature
        })
        return response.data;
    }catch(e){
        toast.error(e?.response?.data?.message);
        return rejectWithValue(e?.response?.data);
    }
})

export const cancelCourseBundle = createAsyncThunk("/payments/record", async() => {
    try{
        const response = await axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "unsubscribing the course",
            success:  (data) => {
                return data?.data?.message
            },
            error: "Failed to unsubscribe"
        })
        return (await response).data;
    }catch(e){
        return 
    }
})

export const getPaymentRecord = createAsyncThunk("/payments/record", async() => {
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
                state.isPaymentVerfied = action?.payload?.success;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerfied = action?.payload?.success;
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                toast.success(action?.payload?.message);
                state.isPaymentVerfied = action?.payload?.success
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                state.allPayments = action?.payload?.allPayments;
                state.finalMonths = action?.payload?.finalMonths;
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            })
    }
})