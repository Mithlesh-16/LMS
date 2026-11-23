import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRazorpayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { useEffect } from "react";
import {BiRupee} from 'react-icons/bi'
import toast from "react-hot-toast";

function Checkout(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    const razorpayKey = useSelector((state) => state?.razorpay?.key)
    const userData = useSelector((state) => state?.auth?.data);
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }

    
    async function load() {
        await dispatch(getRazorpayId())
        await dispatch(purchaseCourseBundle());
    }

    useEffect(() => {
        load();
    }, [])

    async function handleSubscription(e) {
        e.preventDefault();
        if(!razorpayKey || !subscription_id){
            toast.error("Something went wrong");
            return;
        }
        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "coursify pvt. ltd.",
            description: "Subscription",
            theme: {
                color: '#F37254'
            },
            prefill: {
                email: userData.email,
                name: userData.fullName
            },
            handler: async function(response){
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
                toast.success("payment successfull");
                const res = await dispatch(verifyUserPayment(paymentDetails));
                // console.log("response in checkout page: ", res);
                {res?.payload?.success? navigate("/checkout/success"): navigate("/checkout/fail")}
                
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <HomeLayout>
            <form 
                onSubmit={handleSubscription}
                className="min-h-[90vh] flex items-center justify-center text-white"
            >
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-600 absolute top-0 w-80 text-center p-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
                        Subscription Bundle
                    </h1>
                    <div className="mt-10 px-4 space-y-5 text-center">
                        <p className="text-[17px]">
                            This purchase will allow you to access all available courses of our platform for
                            <span className="text-yellow-500 font-bold">
                                <br />
                                1 year Duration
                            </span> {" "}
                            All the existing and new launched courses will also be available.
                        </p>
                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee/>
                            <span>499</span> Only
                        </p>
                        <div>
                            <p>100% refund on cancellation.</p>
                            <p>*Terms and conditions Applied*</p>
                        </div>
                        
                    </div> 
                    <button type="submit" className="w-80 bottom-0 width-full text-xl font-bold rounded-br-lg rounded-bl-lg py-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 absolute cursor-pointer">
                            Buy Now
                        </button>
                </div>
            </form>
        </HomeLayout>
    )

}

export default Checkout;