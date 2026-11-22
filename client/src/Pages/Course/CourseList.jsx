import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/courseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import {useEffect} from "react"
import { CourseCard } from "../../Components/CourseCard";

function CourseList() {
    const dispatch = useDispatch();
    const courseData = useSelector((state) => state.course.courseData);

    async function loadCourses(){
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, [])
    // console.log("courseData payload: ", courseData);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-5xl font-semibold text-center mb-5">
                    Explore the courses made by
                    <span className="font-bold text-yellow-500 p-5">
                        Industry Experts
                    </span>
                </h1>
                <div className="mb-10 flex flex-wrap gap-14">
                    {courseData?.map((course) => {
                        return <CourseCard key = {course.id} data={course}/>
                    })}
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseList;