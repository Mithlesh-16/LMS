import HomeLayout from "../Layouts/HomeLayout";
import {useState} from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';
import {FaEye, FaEyeSlash} from "react-icons/fa"
import { login } from "../Redux/Slices/authSlice";

function Login(){
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setloginData] = useState({
        email: "",
        password: "",
    });

    function handleUserInput(e){
        const {name, value} = e.target;
        setloginData({
            ...loginData,
            [name]: value
        })
    }


    async function onLogin(e){
        e.preventDefault();
        if(!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        } 

        //dispatch create account action
        const response = await dispatch(login(loginData));
        console.log(response);
        if(response?.payload?.success) navigate("/");
        
        setloginData({
            email: "",
            password: "",
        })
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={onLogin} className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold ">Login Page</h1>
                    
                    <div className="flex flex-col gap-1">
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
                            value={loginData.email}/>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="font-semibold">Password</label>
                            <div className="relative">
                                <input 
                                type={showPassword?"text":"password"}
                                name="password"
                                required
                                id="password"
                                placeholder="Enter your password: "
                                className="input input-bordered w-full"
                                onChange={handleUserInput}
                                value={loginData.password} />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {showPassword ? <FaEyeSlash/>: <FaEye/>}
                                </button>
                            </div>
                        </div>
                        <button className="mt-5 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg py-2 font-semibold text-lg cursor-pointer" type="Submit">
                            Login
                        </button>
                        <p className="text-center">
                            Don't have an account? <Link to="/signup" className="link text-accent cursor-pointer">Signup</Link>
                        </p>
                        
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Login;