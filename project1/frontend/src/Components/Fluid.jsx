import React, { useState, useEffect } from "react";
import { useSidebar } from "../context/Sidebarcontext";
import { lighten } from "polished";

const Fluid = () => {
  const {background,layout} = useSidebar();
  const col = localStorage.getItem('color')
  const [section, setSection] = useState(null);
  const [features, setFeatures] = useState([]);
  const [images, setImages] = useState([]);
  

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

        // id 810 
        const headingData = findById(data, 810);
        const bodytext = headingData?.content?.bodytext || "";

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodytext;
        const h2 = tempDiv.querySelector("h2")?.innerText || "";
        const p = tempDiv.querySelector("p")?.innerText || "";

        setSection({ heading: h2, text: p });

        // id 811 
        const featureData = findById(data, 811);
        const itemsArray = featureData?.content?.items || [];
        const formattedFeatures = itemsArray.flatMap((block) =>
          block.contentElements.map((el) => ({
            id: el.id,
            title: el.content.iconTitle,
            text: el.content.text,
            img: el.content.icon[0]?.publicUrl,
          }))
        );
        setFeatures(formattedFeatures);

        // id 809 
        const photoData = findById(data, 809);
        setImages(photoData?.content?.image || []);

        
      })
      .catch((err) => console.log(err));
  }, []);

  const getSubstringBetween = (str, start, end) => {
    if (!str) return "";
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex + start.length);
    if (startIndex === -1 || endIndex === -1) return "";
    return str.substring(startIndex + start.length, endIndex);
  };

  if(!features){
    return (
      <div className="h-150 w-full bg-gray-100"></div>
    )
  }

  return (
    <div style={{backgroundColor:background === 'Light' ? '#fff' : lighten(0.26,col)}} className={` relative w-full flex items-center px-4 py-10`}>

    {background === 'Light' && layout === 'Wide' &&
     <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-0">
        <div className="absolute top-0 bottom-0 -left-10 w-px bg-gray-200 "></div>
        <div className="absolute top-0 bottom-0 left-110 w-px bg-gray-200 "></div>
        <div className="absolute top-0 bottom-0 right-91 w-[0.5px] bg-gray-200 "></div>
      </div>
      }
      

      <div className="w-full z-10 max-w-[1440px] mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10 lg:gap-20 justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start py-5 w-full lg:w-1/2 text-center lg:text-left">
          
              <h1 style={{color: background === 'Dark' ? '#fff' : col}} className={`text-[24px] sm:text-[28px] md:text-[34px] lg:text-[38px] font-extrabold  leading-snug`}>
                {section?.heading?.substring(0, 10)}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  {getSubstringBetween(section?.heading, "is", "across ")}
                </span>
                <br />
                {section?.heading.substring(30)}
              </h1>

              <p className={`mt-6 sm:mt-8 text-sm sm:text-base md:text-lg ${background === 'Light' ? 'text-gray-500' : 'text-white'}  leading-relaxed tracking-wide max-w-[430px] mx-auto lg:mx-0`}>
                {section?.text}
              </p>
          

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex justify-center lg:justify-between gap-6 mt-10 sm:mt-16 w-full">
            { features.map((feature) => (
                  <div
                    key={feature.id}
                    className={`text-center ${background === 'Light' ? '' : 'bg-gray-100'}  p-10 lg:text-left flex-1`}
                  >
                    <img
                      className="mx-auto lg:mx-0 w-14 h-14 md:w-16 md:h-16"
                      src={feature.img}
                      alt={feature.title}
                    />
                    <p style={{color:  col}} className="mt-6 sm:mt-8 font-medium text-lg sm:text-xl md:text-2xl">
                      {feature.title}
                    </p>
                    <p className="text-gray-500 leading-relaxed tracking-wide font-medium mt-4 sm:mt-6 text-sm sm:text-base md:text-lg max-w-[280px] mx-auto lg:mx-0">
                      {feature.text}
                    </p>
                  </div>
                ))}
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full mt-2 lg:mt-0 lg:mb-24 max-w-lg lg:max-w-lg">
            
                {images[0] && (
                  <img
                    className="rounded-lg w-full h-auto"
                    src={images[0].publicUrl}
                    alt="Desktop View"
                  />
                )}
                {images[1] && (
                  <img
                    className="lg:absolute mx-auto mt-2 lg:mt-0 lg:-top-[59px] lg:left-27 transform lg:-translate-x-1/2 h-auto w-1/2 max-w-[225px]"
                    src={images[1].publicUrl}
                    alt="Mobile View"
                  />
                )}
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fluid;
