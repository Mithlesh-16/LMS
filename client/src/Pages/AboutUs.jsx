import HomeLayout from "../Layouts/HomeLayout";
import CarouselSlide from '../Components/CarouselSlide';
import Celebrities from "../Constants/CelebrityData";

function AboutUs(){
    return (
        <>
            <HomeLayout>
                <div className="pl-20 pt-20 flex flex-col text-white">
                    <div className="flex items-center gap-5 mx-10">
                        <section className="w-1/2 space-y-10">
                            <h1 className="text-5xl text-yellow-500 font-semibold">
                                Affordable and quality education.
                            </h1>
                            <p className="text-xl text-gray-200">
                                Our goal is to provide the affordable and quality education to the world. We're providing the platform to share the skills, knowledge and creativity to each other, to empower and contribute in the growth of the mankind.
                            </p>
                        </section>
                        <div className="w-1/2">
                            <img 
                            id="test1"
                            style={{filter: "drop-shadow(0px 10px 10px rgb(0, 0, 0))"}}
                            alt="about main Image"
                            className="drop-shadow-2xl"
                            src="https://images.stockcake.com/public/0/7/f/07f6d562-953c-4933-a930-88f3e9c3219a_large/students-using-laptops-stockcake.jpg" />
                        </div>

                    </div>
                </div>
                <div className="carousel w-1/2 m-auto my-16 flex items-center">
                    {Celebrities && Celebrities.map(celebrity => (<CarouselSlide {...celebrity} key={celebrity.slideNo}  totalSlides={4}/>))}
                </div>
            </HomeLayout>
        </>
    )
}

export default AboutUs;