import HomeLayout from "../Layouts/HomeLayout";
import {BsPersonCircle} from "react-icons/bs";
import {useState} from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';
import {FaEye, FaEyeSlash} from "react-icons/fa"
import { createAccount } from "../Redux/Slices/authSlice";

function Signup(){
    const [previewImage, setPreviewImage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
        fullName:"",
        email: "",
        password: "",
        avatar: ""
    });

    function handleUserInput(e){
        const {name, value} = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function getImage(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function (){
                // console.log(this.result);
                setPreviewImage(this.result)
            })
        }
    }

    async function createNewAccount(e){
        e.preventDefault();
        if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("Please fill all the details");
            return;
        } 
        
        //checking field length
        if(signupData.fullName.length < 3) {
            toast.error("Full Name should be atleast 3 chars.");
            return;
        }

        //checking if valid email
        if(!signupData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            toast.error("Invalid Email ID");
            return;
        }

        //checking if correct password pattern
        if(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
            toast.error("Password must contain atleast 8 characters, one uppercase, one lowercase, one digit and one special character");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        //dispatch create account action
        const response = await dispatch(createAccount(formData));
        console.log(response);
        if(response?.payload?.success) navigate("/");
        
        setSignupData({
            fullName:"",
            email: "",
            password: "",
            avatar: ""
        })
        setPreviewImage("");
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={createNewAccount} className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold ">Registration Page</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                    ): (
                    <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                    )}
                    </label>
                    <input 
                    onChange={getImage}
                    className="hidden"
                    type="file"
                    id="image_uploads"
                    accept=".jpg, .jpeg, .png, .svg"/>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="fullName" className="font-semibold">Name</label>
                            <input 
                            type="text" 
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your Name:"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.fullName}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input 
                            type="email" 
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your Email:"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.email}/>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold">Password</label>
                            <div className="relative">
                                <input 
                                type={showPassword?"text":"password"}
                                name="password"
                                required
                                id="password"
                                placeholder="Enter your password: "
                                className="input input-bordered w-full"
                                onChange={handleUserInput}
                                value={signupData.password} />
                                <button 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {showPassword ? <FaEyeSlash/>: <FaEye/>}
                                </button>
                            </div>
                        </div>
                        <button className="mt-5 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg py-2 font-semibold text-lg cursor-pointer" type="Submit">
                            Create Account
                        </button>
                        <p className="text-center">
                            already have an account? <Link to="slow" className="link text-accent cursor-pointer">Login</Link>
                        </p>
                        
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Signup;