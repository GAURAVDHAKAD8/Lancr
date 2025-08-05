import React from "react";
import Slider from "infinite-react-carousel";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="flex justify-center py-[100px]">
      <div className="w-[90%] relative">
        <Slider
          slidesToShow={slidesToShow}
          arrowsScroll={arrowsScroll}
          className="[&_.carousel-initialized]:static
                    [&_.carousel-prev]:w-[50px]
                    [&_.carousel-prev]:h-[50px]
                    [&_.carousel-prev]:bg-purple-600
                    [&_.carousel-prev]:hover:bg-purple-700
                    [&_.carousel-prev]:rounded-[50%]
                    [&_.carousel-prev]:absolute
                    [&_.carousel-prev]:top-[50%]
                    [&_.carousel-prev]:translate-y-[-50%]
                    [&_.carousel-prev]:left-[-25px]
                    [&_.carousel-prev]:flex
                    [&_.carousel-prev]:items-center
                    [&_.carousel-prev]:justify-center
                    [&_.carousel-prev]:z-10
                    [&_.carousel-next]:w-[50px]
                    [&_.carousel-next]:h-[50px]
                    [&_.carousel-next]:bg-purple-600
                    [&_.carousel-next]:hover:bg-purple-700
                    [&_.carousel-next]:rounded-[50%]
                    [&_.carousel-next]:absolute
                    [&_.carousel-next]:top-[50%]
                    [&_.carousel-next]:translate-y-[-50%]
                    [&_.carousel-next]:right-[-25px]
                    [&_.carousel-next]:flex
                    [&_.carousel-next]:items-center
                    [&_.carousel-next]:justify-center
                    [&_.carousel-next]:z-10"
        >
          {children}
        </Slider>
      </div>
    </div>
  );
};
export default Slide
