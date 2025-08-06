import React from "react";
import Slider from "react-slick";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: arrowsScroll,
    arrows: true,
  };

  return (
    <div className="flex justify-center py-[100px]">
      <div className="w-[90%] relative">
        <Slider {...settings}>{children}</Slider>
      </div>
    </div>
  );
};

export default Slide;
