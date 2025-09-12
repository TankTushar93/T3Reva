import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css"; 
import { useSidebar } from "../../context/Sidebarcontext";

const SliderGallery = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");

  const [sliderData, setSliderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/basic-elements/gallery")
      .then((res) => res.json())
      .then((data) => {
        // Utility function to find by ID
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

        // Slider Gallery ID (from your JSON data: id = 149)
        const sliderGalleryContent = findById(data, 149);

        if (sliderGalleryContent) {
          const { header, text, image } = sliderGalleryContent.content;
          setSliderData({
            title: header,
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
      <div className="w-full bg-white flex justify-center items-center h-60">
        
      </div>
    );
  }

  if (!sliderData) {
    return (
      <div className="w-full flex justify-center items-center h-60">
        <p>No slider data available</p>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: background === "Light" ? "#fff" : col }}
      className="w-full flex flex-col items-center pb-22 justify-center mx-auto py-10"
    >
      {/* Title Section */}
      <h1
        style={{ color: background === "Dark" ? "#fff" : col }}
        className="text-[32px] mt-14 font-bold"
      >
        {sliderData.title}
      </h1>

      <p
        style={{ color: background === "Dark" ? "#fff" : "gray" }}
        className="text-gray-500 text-center leading-relaxed tracking-wide mx-auto max-w-110 text-[20px] mt-2"
      >
        {sliderData.description}
      </p>

      {/* Swiper Slider */}
      <div className="relative h-full mt-8 w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1.4} // Show side images partially
          centeredSlides={true} // Center the active slide
          loop={true}
          navigation
          pagination={{ clickable: true }}
          className="slider-container"
        >
          {sliderData.images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center pl-18 transition-transform duration-500"
            >
              <div className="relative w-[95%]">
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderGallery;
