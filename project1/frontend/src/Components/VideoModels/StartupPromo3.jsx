import React, { useState, useEffect } from "react";
import { useSidebar } from "../../context/Sidebarcontext";
import { FaArrowRightLong } from "react-icons/fa6";

const StartupPromo3 = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");

  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [videoData, setVideoData] = useState({ image: "", video: "" });
  const [textData, setTextData] = useState({ title: "", description: "", buttonLink: "" });
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Track mouse movement
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCursorPos({ x, y });
  };

  // Fetch data dynamically
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

        // Video block id: 488
        const videoBlock = findById(data, 488);
        if (videoBlock) {
          setVideoData({
            image: videoBlock.content.image?.[0]?.publicUrl || "",
            video: videoBlock.content.video?.[0]?.publicUrl || "",
          });
        }

        // Text block id: 489
        const textBlock = findById(data, 489);
        if (textBlock) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = textBlock.content.bodytext || "";

          const h2 = tempDiv.querySelector("h2")?.innerText || "";
          const p = tempDiv.querySelector("p")?.innerText || "";
          const buttonLink = tempDiv.querySelector("a")?.getAttribute("href") || "#";

          setTextData({ title: h2, description: p, buttonLink });
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching StartupPromo3 data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="w-full text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div
      style={{ backgroundColor: col }}
      className="w-full px-6 sm:px-12 md:px-20 lg:px-24 py-16 flex flex-col lg:flex-row justify-between gap-6 mx-auto"
    >
      {/* Left: Video Thumbnail */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
        <div
          className="relative w-full max-w-2xl"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setCursorPos({ x: 0, y: 0 });
          }}
        >
          <img
            src={videoData.image}
            alt="Video thumbnail"
            className="w-full h-auto cursor-pointer object-cover"
          />

          {/* Play Button */}
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

      {/* Right: Text Content */}
      <div className="w-full lg:w-1/2 mt-13 text-center lg:text-left">
        <h1 style={{ color: "#fff" }} className="text-[28px] sm:text-[32px] md:text-[32px] font-semibold leading-tight">
          {textData.title.substring(0,24)}<br/>
          {textData.title.substring(25)}
        </h1>

        <p style={{ color: "#fff" }} className="leading-relaxed max-w-[740px] text-[15px] sm:text-[16px] md:text-[18px] mt-3 sm:mt-8">
          {textData.description}
        </p>

        <a href={textData.buttonLink}>
          <button className="mt-8 cursor-pointer px-6 sm:px-10 py-4 text-sm sm:text-md font-semibold text-white bg-gradient-to-r from-pink-500 to-blue-600 flex items-center justify-center gap-2 group mx-auto lg:mx-0">
            View More
            <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-2" />
          </button>
        </a>
      </div>

      {/* Modal */}
      {isOpen && (
        <div onClick={closeModal} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
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
              src={videoData.video}
              title="Dynamic Video"
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

export default StartupPromo3;
