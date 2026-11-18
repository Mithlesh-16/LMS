import HomeLayout from "../Layouts/HomeLayout";

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
                    <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]"> 
                            <img
                            alt="Tailwind CSS slide example"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQFk1-JzIGTE2hnx6vT9WAksoT6IbF_gPvoUmFVxJrzw&s=10"
                            className="w-1/2 rounded-full border-2 border-gray-400"/>
                            <p className="text-xl text-gray-200">
                                {"Education is the mainifestation of the perfection already in man."}
                            </p>
                            <h3 className="text-2xl font-semibold">Swami Vivekanand</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide4" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]"> 
                            <img
                            alt="Tailwind CSS slide example"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz_23JtiVq3gw1zxCXSWHipCSVA_oSwh3SN3CFjPENMA&s=10"
                            className="w-40 rounded-full border-2 border-gray-400"/>
                            <p className="text-xl text-gray-200">
                                {"By Education, i mean an all-round drawing out-of the best in the child and man - body, mind and spirit."}
                            </p>
                            <h3 className="text-2xl font-semibold">Mahatma Gandhi</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]"> 
                            <img
                            alt="Tailwind CSS slide example"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk_FdhwHQj8qdRuviOBsyiFQ4c9tvDgnKkogSKNn4dYDdOrvUutFeD0rgw&s=10"
                            className="w-40 rounded-full border-2 border-gray-400"/>
                            <p className="text-xl text-gray-200">
                                {"Education is the most powerful Weapon, you can use to change the world. "}
                            </p>
                            <h3 className="text-2xl font-semibold">Dr. Bhim Rao Ambedkar</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]"> 
                            <img
                            alt="Tailwind CSS slide example"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZxS6Po4xHQo4_3YQQELBbn0RCyXRsypB13I4TMuIHg&s=10"
                            className="w-40 rounded-full border-2 border-gray-400"/>
                            <p className="text-xl text-gray-200">
                                {"Education is not the learning of facts, but, the training of the mind to think. "}
                            </p>
                            <h3 className="text-2xl font-semibold">Albert Einstein</h3>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide3" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                </div>
            </HomeLayout>
        </>
    )
}

export default AboutUs;