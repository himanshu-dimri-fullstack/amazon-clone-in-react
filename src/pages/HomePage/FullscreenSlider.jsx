import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
import slider1 from "../../assets/slider-1.jpg";
import slider2 from "../../assets/slider-2.jpg";
import slider3 from "../../assets/slider-3.jpg";
import { data } from "./bannerCardData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


const slides = [slider1, slider2, slider3];

const FullscreenSlider = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplaySpeed: 3000,
    };

    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        const updateCount = () => {
            const width = window.innerWidth;
            if (width < 640) setVisibleCount(1);
            else if (width < 768) setVisibleCount(2);
            else if (width < 1024) setVisibleCount(3);
            else setVisibleCount(4);
        };

        updateCount();
        window.addEventListener("resize", updateCount);

        return () => window.removeEventListener("resize", updateCount);
    }, []);

    return (
        <div className="relative w-full">
            <Slider {...settings} >
                {slides.map((slide, index) => (
                    <div key={index}>
                        <img
                            className="mask-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))] object-cover"
                            src={slide}
                            alt={`slide-${index + 1}`}

                        />
                    </div>
                ))}
            </Slider>
            <div className="w-full sm:absolute sm:bottom-0 sm:translate-y-1/2 md:translate-y-1/2 
            lg:translate-y-1/4 static sm:pt-75 md:pt-25 lg:pt-0">
                <div className="grid w-full gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-6">
                    {data.slice(0, visibleCount).map((item, index) => (
                        <div key={index} className="bg-white p-5 shadow rounded">
                            <h2 className="text-xl font-bold text-black">{item.itemTitle}</h2>

                            <div className="grid grid-cols-2 gap-2 mt-3">
                                {item.imgData.map((dt, i) => (
                                    <Link to="/" key={i}>
                                        <div>
                                            <img src={dt.img} />
                                            <span className="text-black text-[12px] leading-4 inline-block">
                                                {dt.title}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-3">
                                <a href="#" className="text-sm text-[#2162a1]">
                                    See more
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FullscreenSlider