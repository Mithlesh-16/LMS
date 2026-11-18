function CarouselSlide({image, title, description, slideNo, totalSlides}){
    return (
        <>
            <div id={`slide${slideNo}`} className="carousel-item relative w-full">
                <div className="flex flex-col items-center justify-center gap-4 px-[15%]"> 
                    <img
                    alt="Tailwind CSS slide example"
                    src={image}
                    className="w-48 h-48
                                sm:w-56 sm:h-56
                                md:w-64 md:h-64
                                rounded-full
                                border-2 
                                border-gray-400
                                object-cover
                                object-center"
                    />
                    <p className="text-xl text-gray-200 text-center">
                        {description}
                    </p>
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href={`#slide${((slideNo-2+totalSlides)%totalSlides)+1}`} className="btn btn-circle">❮</a>
                        <a href={`#slide${((slideNo%totalSlides) + 1)}`} className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarouselSlide;