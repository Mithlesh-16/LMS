import HomeLayout from "../Layouts/HomeLayout";
import {useState} from "react"
import toast from "react-hot-toast";
import { isValidEmail, isValidName } from "../helpers/regexMatcher";
import axiosInstance from "../helpers/axiosInstance";

function Contact(){
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    })
    
    function handleInputChange(e){
        const {name, value} = e.target;
        // console.log(name, value)
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message){
            toast.error("All Fields are Mandatory");
            return;
        }
        //form validation
        isValidEmail(userInput.email);
        isValidName(userInput.name);
        
        try{
            const response = axiosInstance.post("/contact", userInput);
            toast.promise(response, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form"
            });
            const contactResponse = await response;
            if(contactResponse?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        }catch(e){
            toast.error("Operation Failed");
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form 
                onSubmit={onFormSubmit}
                className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">
                <h1 className="text-3xl font-semibold">
                    Contact Form
                </h1>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="name" className="text-xl font-semibold">
                        Name
                    </label>
                    <input 
                    type="text"
                    className="bg-transparent border px-2 py-1 rounded-sm"
                    id="name"
                    name="name"
                    value={userInput.name}
                    placeholder="Enter your name:"
                    onChange={handleInputChange}/>
                </div>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="email" className="text-xl font-semibold">
                        Email
                    </label>
                    <input 
                    type="email"
                    className="bg-transparent border px-2 py-1 rounded-sm"
                    id="email"
                    name="email"
                    value={userInput.email}
                    placeholder="Enter your Email:"
                    onChange={handleInputChange}/>
                </div>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="message" className="text-xl font-semibold">
                        Message
                    </label>
                    <textarea 
                    name="message" 
                    id="message" 
                    onChange={handleInputChange}
                    value={userInput.message}
                    className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                    placeholder="Draft your Message...">
                    </textarea>
                </div>
                <button type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer">
                    Submit
                </button>
            </form>
            </div>
            
        </HomeLayout>
    )
}

export default Contact;