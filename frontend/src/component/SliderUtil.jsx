import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import MovieCard from '../pages/Movies/MovieCard';

const SliderUtil = ({ data }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <Slider {...settings}>
                {data?.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </Slider>
        </div>
    );
}

export default SliderUtil;