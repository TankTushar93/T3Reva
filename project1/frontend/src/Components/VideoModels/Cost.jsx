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

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/business-elements/video-modal")
      .then((res) => res.json())
      .then((data) => {
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

        const textBlock = findById(data, 1087);
        if (textBlock) {
          setHeading(textBlock.content.bodytext);
        }

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
    if (!str) return "";
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex + start.length);
    if (startIndex === -1 || endIndex === -1) return "";
    return str.substring(startIndex + start.length, endIndex);
  };

  return (
    <div
      style={{ backgroundColor: background === "Light" ? "#fff" : col }}
      className="w-full px-4 sm:px-6 md:px-10 lg:px-10 py-12 sm:py-16 lg:py-24 flex flex-col justify-center items-center text-center gap-6 mx-auto "
    >
      {/* Heading */}
      <div className="w-full max-w-250 mt-4 text-center px-2">
        <h1
          style={{ color: background === "Dark" ? "#fff" : col }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-extrabold leading-tight"
        >
          {getSubstringBetween(heading, '<span class="h1">', "</span>")}
          <br />
          {getSubstringBetween(
            heading,
            '<br><span class="h1">',
            '</span><span class="gradient-color h1">'
          )}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            {getSubstringBetween(
              heading,
              '<span class="gradient-color h1">',
              '</span><span class="h1">'
            )}
          </span>
          {" "}
          {getSubstringBetween(heading, "</span><span class=\"h1\">", "</span></h2>")}
        </h1>
      </div>

      {/* Play Button */}
      <div className="w-full mb-6 mt-6 flex justify-center">
        <div className="flex items-center justify-center pointer-events-none">
          <button
            onClick={openModal}
            className="bg-[#F43FE2] hover:bg-[#4C6FFF] cursor-pointer bg-opacity-80 rounded-full p-8 sm:p-10 md:p-12 shadow-lg transition-transform duration-300 hover:scale-90 pointer-events-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-3"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] md:w-[70%] mt-24 lg:w-[70%] bg-transparent rounded-lg overflow-hidden shadow-lg"
          >
         
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white text-2xl font-bold z-50 hover:text-gray-300"
            >
              ✕
            </button>

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
