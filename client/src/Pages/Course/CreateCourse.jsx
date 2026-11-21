import HomeLayout from "../../Layouts/HomeLayout";

function CreateCourse(){
    return(
        <HomeLayout>
            <div className="w-full flex justify-center h-[90vh] py-5 px-5">
                <h1 className="text-3xl font-bold text-yellow-500">Create Course</h1>
            </div>
        </HomeLayout>
    )
}

export default CreateCourse;