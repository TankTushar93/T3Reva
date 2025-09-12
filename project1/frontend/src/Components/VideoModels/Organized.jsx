import React, { useEffect, useState } from "react";
import { useSidebar } from "../../context/Sidebarcontext";
import { lighten } from "polished";

const Organized = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");

  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [data, setData] = useState({
    subtitle: "",
    title: "",
    description: "",
    trustImage: "",
    videoImage: "",
    videoUrl: "",
  });
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Mouse hover movement for video button
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCursorPos({ x, y });
  };

  // Fetch API data
  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/business-elements/video-modal")
      .then((res) => res.json())
      .then((json) => {
        // Helper to find nested object by ID
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

        // === Extract text (ID: 1102)
        const textBlock = findById(json, 1102);
        let subtitle = "",
          title = "",
          description = "";
        if (textBlock) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = textBlock.content.bodytext || "";
          subtitle = tempDiv.querySelector("span")?.innerText || "";
          title = tempDiv.querySelector("h2")?.innerText || "";
          description = tempDiv.querySelector("h6")?.innerText || "";
        }

        // === Extract trust image (ID: 1103)
        const trustBlock = findById(json, 1103);
        const trustImage =
          trustBlock?.content?.gallery?.rows?.["1"]?.columns?.["1"]?.publicUrl || "";

        // === Static video for now (Can also be dynamic if API provides it)
        const videoImage =
          "https://t3-reva.t3planet.de/fileadmin/ns_theme_t3reva/video-model/home_mobile_app_video_bg.jpg";
        const videoUrl = "https://www.youtube.com/embed/a6Ct4vL_XZM?mute=1&si=vl9LN_3gziSQVuZC";

        setData({ subtitle, title, description, trustImage, videoImage, videoUrl });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Organized data:", err);
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

  return (
    <div
      style={{
        backgroundColor:
          background === "Light" ? "oklch(96.7% 0.003 264.542)" : lighten(0.24, col),
      }}
      className="w-full h-screen px-3 py-12 flex flex-col lg:flex-row items-center justify-between"
    >
      {/* LEFT: Video Section */}
      <div className="w-full lg:w-1/2 h-142 mb-8 lg:mb-0 flex">
        <div
          className="relative w-full"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setCursorPos({ x: 0, y: 0 });
          }}
        >
          <img
            src={data.videoImage}
            alt="Team meeting"
            className="cursor-pointer w-230 h-full object-cover shadow-sm"
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <button
              onClick={openModal} 
              className="  hover:border-1 hover:border-white transition cursor-pointer rounded-full p-5 shadow-lg pointer-events-auto"
              style={{
                transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
                transition: isHovering ? "transform 0.19s linear" : "transform 0.9s ease-out",
                backgroundColor: isHovering ? "transparent" : col,
                
              }}
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
      </div>

      {/* RIGHT: Dynamic Text Section */}
      <div className="w-full lg:w-1/2 h-full py-20 pl-6 text-center lg:text-left">
        <h2 className="text-2xl sm:text-[18px] text-blue-500 mb-4">---  {data.subtitle}</h2>

        <h3
          style={{ color: background === "Dark" ? "#fff" : col }}
          className="text-[33px] font-bold text-blue-600 mb-4"
        >
          {data.title}
        </h3>

        <p
          style={{ color: background === "Dark" ? "#fff" : "gray" }}
          className="text-gray-500 leading-relaxed tracking-wide w-full text-[15px] sm:text-[16px] md:text-[20px] mt-3 sm:mt-8"
        >
          {data.description}
        </p>

        {data.trustImage && (
          <div className="mt-13 flex items-center justify-center">
            <img src={data.trustImage} className="h-full" alt="Trust Badge" />
          </div>
        )}
      </div>

      {/* MODAL: Video Player */}
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-white/40 bg-opacity-70 z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] md:w-[70%] mt-24 lg:w-[70%] bg-transparent rounded-lg overflow-hidden shadow-lg"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white text-2xl font-bold z-50 hover:text-gray-300"
            >
              ✕
            </button>

            {/* YouTube Iframe */}
            <iframe
              className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[600px]"
              src={data.videoUrl}
              title="YouTube video player"
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

export default Organized;
