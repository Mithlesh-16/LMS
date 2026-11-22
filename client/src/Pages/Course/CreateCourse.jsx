import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createNewCourse } from "../../Redux/Slices/courseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai"
import { Link } from "react-router-dom";

function CreateCourse(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: ""
    })

    function handleImage(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function(){
            setUserInput({
                ...userInput,
                thumbnail: uploadedImage,
                previewImage: this.result
            })
        })
    }

    function handleUserInput(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.title || !userInput.description || !userInput.thumbnail){
            toast.error("All fields are mandatory");
            return;
        }
        
        const response = await dispatch(createNewCourse(userInput));
        if(response?.payload?.success){
            setUserInput({
                title: "",
                category: "",
                createdBy: "",
                description: "",
                thumbnail: null,
                previewImage: ""
            })
        }
        navigate('/courses')
    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form 
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative">
                        <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
                            <AiOutlineArrowLeft onClick={() => navigate(-1)}/>
                        </Link>
                        <h1 className="text-center text-2xl font-bold">
                            Create New Course
                        </h1>

                        <main className="grid grid-cols-2 gap-x-10">
                            <div className="gap-y-6">
                                <div>
                                    <label htmlFor="image_uploads" className="cursor-pointer">
                                        {userInput.previewImage ?
                                        (
                                        <img 
                                        className="w-full h-44 m-auto border" 
                                        src={userInput.previewImage}/>
                                        ): 
                                        (
                                            <div className="w-full h-44 m-auto flex items-center justify-center border">
                                                <h1 className="font-bold text-lg">
                                                    Upload your course Thumbnail
                                                </h1>
                                            </div>
                                        )}
                                    </label>
                                    <input 
                                        onChange={handleImage}
                                        type="file"
                                        className="hidden"
                                        id="image_uploads"
                                        accept=".jpg, .jpeg, .png"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="title" className="text-lg font-semibold">
                                        Course Title
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter Course Title:"
                                        className="bg-transparent px-2 py-1 border"
                                        value={userInput.title}
                                        onChange={handleUserInput}
                                    />
                                </div>
                            </div>
                            <div className="gap-y-6">
                                    <div className="flex flex-col gap-1">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="createdBy" className="text-lg font-semibold">
                                            Course Instructor
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="createdBy"
                                            id="createdBy"
                                            placeholder="Enter Course Instructor"
                                            className="bg-transparent px-2 py-1 border"
                                            value={userInput.createdBy}
                                            onChange={handleUserInput}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="createdBy" className="text-lg font-semibold">
                                            Course Category
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            name="category"
                                            id="category"
                                            placeholder="Enter Course Category"
                                            className="bg-transparent px-2 py-1 border"
                                            value={userInput.category}
                                            onChange={handleUserInput}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="description" className="text-lg font-semibold">
                                            Course Description
                                        </label>
                                        <textarea
                                            required
                                            type="text"
                                            name="description"
                                            id="description"
                                            placeholder="Enter Course Description"
                                            className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                                            value={userInput.description}
                                            onChange={handleUserInput}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        </main>
                    <button type="submit" className="w-full py-2 rounded-sm font-semibold cursor-pointer bg-yellow-700 hover:bg-yellow-600 transition-all ease-in-out duration-300">
                        Create Course
                    </button>
                        
                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateCourse;