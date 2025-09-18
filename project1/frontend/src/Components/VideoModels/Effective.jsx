import React, { useState, useEffect } from "react";
import { useSidebar } from "../../context/Sidebarcontext";
import { lighten } from "polished";
const Effective = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");
  const tcol = localStorage.getItem('tcolor');
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

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCursorPos({ x, y });
  };

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/business-elements/video-modal") // Replace with actual API
      .then((res) => res.json())
      .then((json) => {
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

        const textBlock = findById(json, 1090);
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

        const trustBlock = findById(json, 1092);
        const trustImage =
          trustBlock?.content?.gallery?.rows?.["1"]?.columns?.["1"]?.publicUrl || "";

        const videoBlock = findById(json, 1089);
        const videoImage = videoBlock?.content?.image?.[0]?.publicUrl || "";
        const videoUrl = videoBlock?.content?.video?.[0]?.publicUrl || "";

        setData({
          subtitle,
          title,
          description,
          trustImage,
          videoImage,
          videoUrl,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Effective data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20 text-gray-500"></div>
    );
  }

  return (
    <div
      style={{ backgroundColor: background === "Light" ? "#fff" : col }}
      className="w-full min-h-screen  px-4  flex flex-col gap-6 lg:flex-row items-center justify-between"
    >
      <div className="w-full lg:w-1/2 h-full py-24 pl-6 lg:pl-24 text-left">
        <h2 className="text-2xl sm:text-[18px] text-blue-500 mb-4">
          {data.subtitle}
        </h2>

        <h3
          style={{ color: background === "Dark" ? "#fff" : col }}
          className="text-[33px] font-bold mb-4"
        >
          {data.title}
        </h3>

        <p
          style={{ color: background === "Dark" ? "#fff" : tcol }}
          className="text-gray-500 leading-relaxed tracking-wide max-w-[550px] text-[15px] sm:text-[16px] md:text-[18px] mt-3 sm:mt-8"
        >
          {data.description}
        </p>

        {data.trustImage && (
          <div className="mt-13 flex items-center justify-center">
            <img src={data.trustImage} className="h-full" alt="Trust Badge" />
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2  lg:h-138 mb-28 lg:mb-0 flex">
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
            src={data.videoImage}
            alt="Team meeting"
            className="cursor-pointer w-full max-w-184 h-auto object-cover shadow-md"
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

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-white/40 bg-opacity-70 z-50 flex items-center justify-center"
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

export default Effective;
