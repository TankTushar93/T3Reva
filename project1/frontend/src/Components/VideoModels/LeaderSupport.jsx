import React, { useState, useEffect } from "react";
import { useSidebar } from "../../context/Sidebarcontext";
import { lighten } from "polished";

const LeaderSupport = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");
   const tcol = localStorage.getItem('tcolor'); 
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [videoData, setVideoData] = useState({ image: "", video: "" });
  const [textData, setTextData] = useState({
    subtitle: "",
    title: "",
    listItems: [],
    buttonText: "",
    buttonLink: "#",
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

        const videoBlock = findById(data, 506);
        if (videoBlock) {
          setVideoData({
            image: videoBlock.content.image?.[0]?.publicUrl || "",
            video: videoBlock.content.video?.[0]?.publicUrl || "",
          });
        }

        const textBlock = findById(data, 507);
        if (textBlock) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = textBlock.content.bodytext || "";

          const subtitle = tempDiv.querySelector("span")?.innerText || "";
          const title = tempDiv.querySelector("h2")?.innerText || "";

          const listItems = Array.from(tempDiv.querySelectorAll("p"))
            .map((p) => p.innerText)
            .filter((text) => text.includes("✔"));

          const buttonElement = tempDiv.querySelector("a");
          const buttonText = buttonElement?.innerText || "Start Your Business";
          const buttonLink = buttonElement?.getAttribute("href") || "#";

          setTextData({ subtitle, title, listItems, buttonText, buttonLink });
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Leader Support data:", err);
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
      style={{
        backgroundColor:
          background === "Light"
            ? "oklch(96.7% 0.003 264.542)"
            : lighten(0.24, col),
      }}
      className="w-full min-h-screen px-4 sm:px-6 lg:px-2 py-12 flex flex-col lg:flex-row items-center justify-between "
    >
      <div className="w-full lg:w-1/2  mb-10 lg:mb-0 lg:h-140 flex ">
        <div
          className="relative w-full max-w-3xl"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setCursorPos({ x: 0, y: 0 });
          }}
        >
          <img
            src={videoData.image}
            alt="Leader support thumbnail"
            className="cursor-pointer w-full max-w-184 h-auto object-cover shadow-md"
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              onClick={openModal}
              className="hover:border hover:border-white transition cursor-pointer rounded-full p-5 shadow-lg pointer-events-auto"
              style={{
                transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
                transition: isHovering
                  ? "transform 0.19s linear"
                  : "transform 0.9s ease-out",
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

      {/* Right Section - Text */}
      <div className="w-full lg:w-1/2 lg:pl-32 lg:mb-22 text-left">
        <h2 className="text-xl sm:text-base text-blue-500 mb-3">
          --- {textData.subtitle}
        </h2>
        <h3
          style={{ color: background === "Dark" ? "#fff" : col }}
          className="text-[26px] sm:text-[30px] md:text-[33px] font-bold mb-5 leading-snug"
        >
          {textData.title}
        </h3>

        <ul
          style={{ color: background === "Dark" ? "#fff" : "gray" }}
          className="text-base sm:text-lg leading-relaxed tracking-wide mt-6 mb-8 space-y-3"
        >
          {textData.listItems.map((item, index) => (
            <li   style={{color:background === "Light" ? tcol : "#fff"}}

              key={index}
              className="flex items-start sm:items-center gap-2 sm:gap-4 text-left"
            >
              <span   style={{color:background === "Light" ? tcol : "#fff"}}
 className=" text-lg">✔</span>
              {item.replace("✔", "").trim()}
            </li>
          ))}
        </ul>

        <a href={textData.buttonLink}>
          <button className="bg-blue-500 font-bold cursor-pointer text-white px-6 sm:px-8 py-3 sm:py-3.5  hover:bg-blue-400 transition">
            {textData.buttonText}
          </button>
        </a>
      </div>

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/70 z-50  flex items-center justify-center p-4"
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
              src={videoData.video}
              title="Leader Support Video"
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

export default LeaderSupport;
