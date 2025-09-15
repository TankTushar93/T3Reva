import React, { useState, useEffect } from "react";
import { useSidebar } from "../../context/Sidebarcontext";

const Masonrygallery = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");

  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/basic-elements/gallery")
      .then((res) => res.json())
      .then((data) => {
        function findById(obj, id) {
          let result = null;
          function search(o) {
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
          }
          search(obj);
          return result;
        }

        //  Masonry Gallery Data 
        const masonryGallery = findById(data, 152);
        if (masonryGallery) {
          setGalleryData({
            title: masonryGallery.content.header,
            description: masonryGallery.content.text,
            images: masonryGallery.content.image,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gallery data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-110 bg-white flex justify-center items-center"></div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: background === "Light" ? "#fff" : col,
      }}
      className="w-full flex flex-col items-center justify-center mx-auto px-4 pt-12 pb-18"
    >
      {/* Title Section */}
      <h1
        style={{ color: background === "Dark" ? "#fff" : col }}
        className="text-[32px] mt-10 font-bold"
      >
        {galleryData?.title}
      </h1>

      <p
        style={{ color: background === "Dark" ? "#fff" : "gray" }}
        className="text-gray-500 text-center leading-relaxed tracking-wide mx-auto max-w-240 text-[20px] mt-2"
      >
        {galleryData?.description}
      </p>

      {/* Masonry Layout */}
      <div className="grid grid-cols-1  md:grid-cols-3 grid-rows-2 gap-4 px-0 sm:px-10 md:px-17 xl:px-26 mt-12 w-full">
        {galleryData?.images?.length > 0 && (
          <>
            {/* Large Main Image */}
            <div className="md:col-span-2 md:row-span-2 border border-gray-200 overflow-hidden cursor-pointer">
              <img
                src={galleryData.images[0].publicUrl}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-108"
                alt={galleryData.images[0].properties.alternative || "Large Product"}
              />
            </div>

            {/* Top Right Small Images */}
            {galleryData.images.slice(1, 3).map((img, index) => (
              <div
                key={index}
                className="border border-gray-200 overflow-hidden cursor-pointer"
              >
                <img
                  src={img.publicUrl}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-108"
                  alt={img.properties.alternative || `Product ${index + 1}`}
                />
              </div>
            ))}

            {/* Bottom Row Images */}
            {galleryData.images.slice(3).map((img, index) => (
              <div
                key={index}
                className="border border-gray-200 overflow-hidden cursor-pointer"
              >
                <img
                  src={img.publicUrl}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-108"
                  alt={img.properties.alternative || `Product ${index + 3}`}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Masonrygallery;
