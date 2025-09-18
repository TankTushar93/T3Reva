import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useSidebar } from "../../context/Sidebarcontext";
import { lighten } from "polished";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css";

const SliderTran = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");
   const tcol = localStorage.getItem('tcolor');
  const [sliderData, setSliderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/basic-elements/gallery")
      .then((res) => res.json())
      .then((data) => {
        const findById = (obj, id) => {
          let result = null;
          const search = (o) => {
            if (typeof o !== "object" || o === null) return;
            for (let key in o) {
              if (key === "id" && o[key] === id) {
                result = o;
                return;
              }
              if (typeof o[key] === "object") {
                search(o[key]);
                if (result) return;
              }
            }
          };
          search(obj);
          return result;
        };

        // slider gallery 
        const sliderGalleryContent = findById(data, 150);

        if (sliderGalleryContent) {
          const { headline, text, image } = sliderGalleryContent.content;
          setSliderData({
            title: headline,
            description: text,
            images: image.map((img) => img.publicUrl),
          });
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching slider gallery data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 bg-gray-100 flex justify-center items-center"></div>
    );
  }

  if (!sliderData) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <p className="text-red-500 text-lg">No slider data available</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor:
          background === "Light" ? "oklch(96.7% 0.003 264.542)" : lighten(0.24, col),
      }}
      className="w-full flex flex-col items-center justify-center mx-auto pt-4 pb-24"
    >
      {/* Title Section */}
      <h1
        style={{ color: background === "Dark" ? "#fff" : col }}
        className="text-[32px] mt-14 text-center font-bold max-w-80"
      >
        {sliderData.title}
      </h1>

      <p
        style={{ color: background === "Dark" ? "#fff" : tcol }}
        className="text-center leading-relaxed tracking-wide mx-auto max-w-2xl text-[20px] mt-4"
      >
        {sliderData.description}
      </p>

      {/* Swiper Slider */}
      <div className="relative h-full mt-8 w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          className="slider-container"
        >
          {sliderData.images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center transition-transform duration-500"
            >
              <div className="relative w-screen xl:w-[80%]">
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="w-full object-cover "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderTran;
