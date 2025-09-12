import React, { useState, useEffect } from "react";
import { useSidebar } from "../../context/Sidebarcontext";

const Cost = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Fetch dynamic data
  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/business-elements/video-modal") // Replace with correct endpoint
      .then((res) => res.json())
      .then((data) => {
        // Utility function to find an object by ID
        const findById = (obj, id) => {
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
        };

        // Get Heading Text (id: 1087)
        const textBlock = findById(data, 1087);
        if (textBlock) {
          setHeading(textBlock.content.bodytext);
        }

        // Get Video URL (id: 417)
        const videoBlock = findById(data, 417);
        if (videoBlock) {
          setVideoUrl(videoBlock.content.video?.[0]?.publicUrl || "");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Cost data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20 text-gray-500">
        Loading...
      </div>
    );
  }

  const getSubstringBetween = (str, start, end) => {
    if (!str) return '';
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex + start.length);
    if (startIndex === -1 || endIndex === -1) return '';
    return str.substring(startIndex + start.length, endIndex);
  };

  return (
    <div
      style={{ backgroundColor: background === "Light" ? "#fff" : col }}
      className="w-full px-6 sm:px-12 md:px-20 lg:px-24 py-16 pb-24 flex flex-col justify-center items-center text-center gap-6 mx-auto"
    >
      {/* Dynamic Heading */}
      <div className="w-full max-w-250 mt-4 text-center "> 
        <h1 style={{color: background === 'Dark' ? '#fff' : col}}
         className={`text-[36px] z-10 font-extrabold `} >
           {getSubstringBetween(heading, "<span class=\"h1\">", "</span>")}<br/>{' '} 
           {getSubstringBetween(heading, "<br><span class=\"h1\">", "</span><span class=\"gradient-color h1\">")}
         <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"> 
          {getSubstringBetween(heading, "<span class=\"gradient-color h1\">", "</span><span class=\"h1\"> ")}
          </span>
          {' '} {getSubstringBetween(heading, "</span><span class=\"h1\">", "</span></h2>")}
         </h1> {/* Subheading */}
         </div>

      {/* Play Button */}
      <div className="w-full mb-8 mt-4 flex justify-center">
        <div className="flex items-center justify-center pointer-events-none">
          <button
            onClick={openModal}
            className="bg-[#F43FE2] hover:bg-[#4C6FFF] cursor-pointer bg-opacity-80 rounded-full p-11 shadow-lg transition-transform duration-300 hover:scale-90 pointer-events-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal for Video */}
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] md:w-[70%] mt-24 lg:w-[70%] rounded-lg overflow-hidden shadow-lg"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white text-2xl font-bold z-50 hover:text-gray-300"
            >
              ✕
            </button>

            {/* Dynamic Video */}
            <iframe
              className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[600px]"
              src={videoUrl}
              title="Cost Section Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cost;
