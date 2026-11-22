import { useNavigate } from "react-router-dom";

function NotFound(){
    const navigate = useNavigate();
    return (
        <>
            <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
                <h1 className="text-9xl font-extrabold text-white tracking-widest">
                    404
                </h1>
                <div className="bg-red-600 text-white px-2 text-sm rounded rotate-12 absolute">
                    Page not Found....
                </div>
                {/* <button className="mt-5"> */}
                <div className="flex justify-center items-center gap-5 mt-5">
                    <button href="" onClick={() => navigate(-1)} className="relative cursor-pointer inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
                        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                            Go Back
                        </span>
                    </button>
                    <button href="" onClick={() => navigate(-1)} className="relative cursor-pointer inline-block text-sm font-medium text-green-500 group active:text-yellow-500 focus:outline-none focus:ring">
                        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                            Home
                        </span>
                    </button>
                </div>
                    
                {/* </button> */}
            </div>
        </>
    )
}

export default NotFound;