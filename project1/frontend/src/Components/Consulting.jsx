import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useSidebar } from "../context/Sidebarcontext";

const Consulting = () => {
  const {background,pageStripeVisible} = useSidebar();
  const col = localStorage.getItem('color')
  const [section, setSection] = useState(null);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

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

        // ID 874 → Heading + Bodytext
        const headingData = findById(data, 874);
        const bodytext = headingData?.content?.bodytext || "";

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodytext;
        const h2 = tempDiv.querySelector("h2")?.innerText || "";
        const p = tempDiv.querySelector("p")?.innerText || "";

        setSection({ heading: h2, text: p });

        // ID 878 → 3 feature boxes
        const featureData = findById(data, 878);
        const itemsArray = featureData?.content?.items || [];

        const formattedFeatures = itemsArray.flatMap((block) =>
          block.contentElements.map((el) => {
            const temp = document.createElement("div");
            temp.innerHTML = el.content.featuredText;
            const title = temp.querySelector("h4")?.innerText || "";
            const desc = temp.querySelector("p")?.innerText || "";
            const bullets = Array.from(temp.querySelectorAll("li")).map(
              (li) => li.innerText
            );

            return {
              id: el.id,
              img: el.content.image[0]?.publicUrl,
              title,
              desc,
              bullets,
            };
          })
        );

        setFeatures(formattedFeatures);
        setLoading(false);
      });
  }, []);

  if(loading){
    return ( 
      <div className="h-150 w-full bg-white"></div>
    )
  }

  const getSubstringBetween = (str, start, end) => {
    if (!str) return "";
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex + start.length);
    if (startIndex === -1 || endIndex === -1) return "";
    return str.substring(startIndex + start.length, endIndex);
  };

  return (
    <div style={{backgroundColor:background === 'Light' ? '#fff' : col}} className={`px-6  z-10  relative pb-8 pt-26 py-2 text-center`}>
      { !loading && pageStripeVisible && background === 'Light' &&
      <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-[-1]">
        <div className="absolute top-0 bottom-0 -left-10 w-px bg-gray-200 z-0"></div>
        <div className="absolute top-0 bottom-0 left-110 w-px bg-gray-200 z-0"></div>
        <div className="absolute top-0 bottom-0 right-91 w-[0.5px] bg-gray-200 z-0"></div>
      </div>}
     
      
          <h1 style={{color: background === 'Dark' ? '#fff' : col}} className={` text-[38px] font-extrabold `}>
            {section?.heading.substring(0, 6)}{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              {getSubstringBetween(section?.heading, "Custom", "for")}
            </span>{" "}
            {getSubstringBetween(section?.heading, "layouts", "Corporate,")}{" "}
            <br />
            {section?.heading.substring(29)}
          </h1>

          <p className={`${background === 'Light' ? 'text-gray-600' : 'text-white'} mx-auto max-w-125 leading-relaxed tracking-wide text-[18px] mt-8`}>
            {section?.text.substring(0, 56)} <br />
            {section?.text.substring(56)}
          </p>

          <div className="px-4  lg:px-24 flex flex-col items-center lg:items-start  lg:flex-row gap-9 py-18">
            {features.map((item) => (
              <div
                key={item.id}
                className="border flex bg-white flex-col gap-5 py-2 border-gray-300 xl:h-full w-85 md:w-100"
              >
                <div className="border-b  border-gray-300">
                  <img src={item.img} alt={item.title} />
                </div>

                <div className="flex flex-col gap-2 py-6 px-14">
                  <h1 style={{color: col}} className="text-left text-[22px] font-medium">
                    {item.title}
                  </h1>
                  <p className="text-left text-[18px] text-gray-500 font-medium">
                    {item.desc}
                  </p>
                  <div className="flex mt-2  group cursor-pointer gap-1 items-center hover:text-blue-500">
                    <div className="flex flex-col px-3 py-7 gap-3">
                      {item.bullets.map((bullet, i) => (
                        <p
                          key={i}
                          className="flex items-center gap-5 leading-relaxed tracking-wide font-medium text-[15px] text-gray-500"
                        >
                          <img
                            className="h-4 w-4"
                            src="../src/assets/check.png"
                            alt=""
                          />
                          {bullet}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
       
    </div>
  );
};

export default Consulting;
