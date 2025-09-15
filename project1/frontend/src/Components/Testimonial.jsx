import React, { useState, useEffect, useRef } from "react";
import { useSidebar } from "../context/Sidebarcontext";

const Testimonial = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");
  const pcol = localStorage.getItem('pcolor');
  const [heading, setHeading] = useState("");
  const [reviews, setReviews] = useState([]);

  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
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

        // Heading (id: 761)
        const headingData = findById(data, 761);
        if (headingData?.content?.bodytext) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = headingData.content.bodytext;
          setHeading(tempDiv.innerText);
        }

        // Reviews (id: 760)
        const reviewData = findById(data, 760);
        if (reviewData?.content?.reviewBlock) {
          setReviews(reviewData.content.reviewBlock);
        }
      });
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Adjust based on card width
      if (direction === "left") {
        scrollRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const CreateCard = ({ card }) => (
    <div className="px-8 pt-12 pb-4 bg-white mx-3 shadow hover:shadow-lg border border-white transition-all cursor-pointer duration-200 h-auto w-80 lg:w-100 shrink-0">
      <div className="flex items-center pb-4 justify-between">
        <div>
          <p className="text-black font-normal text-lg">{card.reviewName}</p>
          <p className="text-gray-500">{card.reviewDesignation}</p>
        </div>
        <div className="flex text-center gap-1 flex-col items-center leading-none">
          <p style={{color : pcol}} className=" font-semibold text-[20px] m-0 p-0 leading-none"> {card.reviewStar} </p>
          <div className="flex gap-0 leading-none">
            {Array(5).fill(0).map((_, i) => {
              const fullStars = Math.floor(card.reviewStar);
              const hasHalfStar = card.reviewStar - fullStars >= 0.25 && card.reviewStar - fullStars < 0.75;
              if (i < fullStars) {
                return (<span key={i} style={{color : pcol}}  className="inline-block text-[19px] " > ★ </span>);
              } else if (i === fullStars && hasHalfStar) {
                return (<span key={i} className="inline-block text-[19px] text-gray-300 relative" >
                  <span style={{color : pcol}}  className="absolute left-0 top-0 w-1/2 overflow-hidden "> ★ </span> ★ </span>);
              }
              else { return (<span key={i} className="inline-block text-[19px] text-gray-300" > ★ </span>); }
            })}
          </div>
        </div>
      </div>
      <div>
        <p className="leading-relaxed tracking-wide text-gray-500 py-4 text-xl"> {card.reviewText} </p>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: col }} className=" px-3 pt-24 pb-48"> {/* Heading */} {!reviews ? (<div className="h-10 w-2/3 mx-auto bg-gray-300 rounded shimmer animate-pulse" />) : (<h1 className="text-center text-white font-extrabold text-[41px] whitespace-pre-line"> {heading} </h1>)}

      {/* Carousel Section */}
      <div className="relative flex justify-center items-center w-full">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-127 right-63 lg:right-37 lg:-top-4 -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 cursor-pointer text-gray-800 rounded-full w-15 h-15 flex items-center justify-center z-10"
        >
          ◀
        </button>

        {/* Cards Wrapper */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto mt-16 no-scrollbar scroll-smooth space-x-3"
        >
          {[...reviews, ...reviews].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>

        {/* Right Button */}
        
        <button
          onClick={() => scroll("right")}
          className="absolute top-127 cursor-pointer right-36 lg:right-15 lg:-top-4 -translate-y-1/2 bg-white shadow-md hover:bg-gray-100 text-gray-800 rounded-full w-15 h-15 flex items-center justify-center z-10"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
