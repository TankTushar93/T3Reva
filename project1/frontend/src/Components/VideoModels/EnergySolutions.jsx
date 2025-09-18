import React, { useState, useEffect } from "react";
import { useSidebar } from "../../context/Sidebarcontext";

const EnergySolutions = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");
  const tcol = localStorage.getItem('tcolor');
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [services, setServices] = useState([]);
  const [videoData, setVideoData] = useState({ image: "", video: "" });
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCursorPos({ x, y });
  };

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

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/business-elements/video-modal")
      .then((res) => res.json())
      .then((data) => {
        const servicesArray = [1097, 1099, 1096, 1098].map((id) => {
          const block = findById(data, id);
          return {
            icon: block?.content?.icon?.[0]?.publicUrl || "",
            title: block?.content?.iconTitle || "",
            description: block?.content?.text || "",
          };
        });
        setServices(servicesArray);

        const videoBlock = findById(data, 1094);
        if (videoBlock) {
          setVideoData({
            image: videoBlock.content.image?.[0]?.publicUrl || "",
            video: videoBlock.content.video?.[0]?.publicUrl || "",
          });
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching EnergySolutions data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="w-full text-center py-20 text-gray-500"></div>;
  }

  return (
    <div
      style={{ backgroundColor: background === "Light" ? "#fff" : col }}
      className="w-full px-4 md:px-12 py-4 lg:py-10 flex flex-col lg:flex-row items-center gap-6"
    >

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:ml-20">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white gap-4 px-8 py-4 text-center "
          >
            <img src={service.icon} alt={service.title} className="w-16 h-16" />
            <h3 style={{ color: col }} className="mt-2 text-[24px] font-semibold">
              {service.title}
            </h3>
            <p style={{color: tcol }} className="mt-2 text-gray-500 text-lg sm:text-xl leading-relaxed tracking-wide max-w-[270px]">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="relative w-full mb-5 lg:mb-37 lg:w-[45%]">
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
            src={videoData.image}
            alt="Renewable energy"
            className="cursor-pointer w-full h-auto object-cover "
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
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] md:w-[70%] lg:w-[60%] mt-22 bg-transparent rounded-lg overflow-hidden shadow-lg"
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
              title="Energy Solutions Video"
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

export default EnergySolutions;
