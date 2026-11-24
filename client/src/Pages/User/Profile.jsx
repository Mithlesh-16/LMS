import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/authSlice";
import toast from "react-hot-toast";
function Profile(){
    const userData = useSelector((state) => state.auth.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleCancellation(){
        if(userData?.subscription?.status !== 'active'){
            toast.error("Already Cancelled !!")
            return;
        }
        console.log("userData: ", userData);
        await dispatch(cancelCourseBundle());
        const updatedUser = await dispatch(getUserData());
        console.log("new userData fetched: ", updatedUser);
        navigate("/");
    }

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white max-w-fit shadow-[0_0_10px_black]">
                    <img 
                    src={userData?.avatar?.secure_url} 
                    alt="user_img" 
                    className="w-40 m-auto rounded-full border border-black"/>
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-2 overflow-auto">
                        <p>Email: </p><p>{userData?.email}</p>
                        <p>Subscription: </p>
                        <p>{userData?.subscription?.status === "active"? "Active": "Inactive"}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <Link to="/change/password" className="w-1/2 bg-yellow-600 rounded-sm font-semibold py-2 cursor-pointer text-center hover:bg-yellow-500 transition-all ease-in-out duration-300">
                        Change Password</Link>
                        <Link to="/user/editProfile" className="w-1/2 bg-yellow-600 rounded-sm font-semibold py-2 cursor-pointer text-center hover:bg-yellow-500 transition-all ease-in-out duration-300">
                        Edit Profile</Link>
                    </div>
                    {userData?.subscription?.status === 'active' && (
                        <button 
                        onClick={handleCancellation}
                        className="w-full py-2 rounded-sm bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300">
                            Cancel Subscription
                        </button>
                    )}
                    {userData?.subscription?.status !== 'active' && (
                        <Link to="/checkout"
                        className="w-full py-2 rounded-sm bg-green-600 hover:bg-green-500 transition-all ease-in-out duration-300 text-center font-bold text-xl">
                            Subscribe Now
                        </Link>
                    )}
                </div>
            </div>
        </HomeLayout>
    )



}

export default Profile;