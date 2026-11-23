import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../Redux/Slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";


function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data)
    console.log("userData: ",userData);
    const [data, setData] = useState({
        previewImage: userData?.avatar?.secure_url,
        fullName: "",
        avatar: userData?.avatar?.secure_url,
        userId: useSelector((state) => state?.auth?.data?._id)
    });

    function handleImageUpload(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function(){
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }

    function handleInputChange(e){
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!data.fullName || !data.avatar){
            toast.error("All Fields are mandatory");
            return;
        }
        if(data.fullName.length < 5){
            toast.error("Name cannot be of less than 5 characters")
            return;
        }
        
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);
        formData.append("userId", data.userId);
        
        const response = await dispatch(updateProfile(formData));
        console.log("response: ", response);
        if(response?.payload?.success){
            navigate(-1);
        }
    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form 
                onSubmit={onFormSubmit}
                className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-semibold">Edit profile</h1>
                    <label htmlFor="image_upload"
                    className="cursor-pointer">
                        {data?.previewImage ? 
                        (
                            <img src={data?.previewImage} alt="" 
                            className="w-28 h-28 rounded-full m-auto"/>
                        ):(
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto"/>
                        )}
                    </label>
                    <input 
                        type="file"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image_upload" 
                        name="image_upload"
                        accept=".jpg, .png, .svg, .jpeg"
                    />
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="fullName"
                            className="text-lg font-semibold"
                        >
                            Full Name
                        </label>
                        <input type="text"
                        required
                        name="fullName"
                        id="fullName"
                        placeholder="Enter Your Name "
                        className="px-2 py-1 border"
                        value={data.fullName} 
                        onChange={handleInputChange}/>
                    </div>
                    <button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
                        Update Profile
                    </button>
                    <Link to='/user/profile'>
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full">
                            <AiOutlineArrowLeft/>Go Back to Profile
                        </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    )
}

export default EditProfile;