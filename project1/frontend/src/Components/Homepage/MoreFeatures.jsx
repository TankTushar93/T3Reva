import React, { useState, useEffect } from "react";
import { useSidebar } from "../../context/Sidebarcontext";
import { lighten } from "polished";

const MoreFeatures = () => {
  const {background,layout,pageStripeVisible} = useSidebar();
  const col = localStorage.getItem('color');
   const gcol = localStorage.getItem('gcolor');
    const tcol = localStorage.getItem('tcolor');
  const [heading, setHeading] = useState("");
  const [subtext, setSubtext] = useState("");
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

        // Extract heading + subtext (id: 883)
        const headingData = findById(data, 883);
        const bodytext = headingData?.content?.bodytext || "";

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodytext;
        const h2Text = tempDiv.querySelector("h2")?.innerText || "";
        const pText = tempDiv.querySelector("p")?.innerText || "";

        setHeading(h2Text);
        setSubtext(pText);

        // Extract features from multiple sections
        const sectionIds = [905, 935, 942];

        function extractFeatures(obj) {
          let results = [];
          if (obj?.contentElements) {
            results.push(
              ...obj.contentElements.map((el) => ({
                id: el.id,
                title: el.content.iconTitle,
                text: el.content.text,
                img: el.content.icon?.[0]?.publicUrl,
              }))
            );
          }
          if (obj?.items) {
            obj.items.forEach((child) => {
              results.push(...extractFeatures(child));
            });
          }
          return results;
        }

        let allFeatures = [];
        sectionIds.forEach((sid) => {
          const sectionData = findById(data, sid);
          if (sectionData?.content) {
            allFeatures.push(...extractFeatures(sectionData.content));
          }
        });

        setFeatures(allFeatures);
        setLoading(false);
      });
  }, []);

  if(loading){
    return (
      <div className="h-150 w-full bg-gray-100"></div>
    )
  }

  return (
    <div style={{backgroundColor:background === 'Light' ? lighten(0.35,gcol) : lighten(0.26,col)}} className={`px-4 relative z-10 sm:px-6  pt-16 sm:pt-24 text-center`}>

      {background === 'Light' && layout === 'Wide' && pageStripeVisible &&
      <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-[-1]">
        <div className="absolute top-0 bottom-0 -left-10 w-px bg-gray-200 "></div>
        <div className="absolute top-0 bottom-0 left-110 w-px bg-gray-200 "></div>
        <div className="absolute top-0 bottom-0 right-91 w-[0.5px] bg-gray-200 "></div>
      </div>
      }
      {/* Heading */}
      <h1 style={{color: background === 'Dark' ? '#fff' : col}} className={`text-[28px] z-10 sm:text-[32px] md:text-[36px] lg:text-[38px] font-extrabold  leading-snug`}>
        {heading.split("more")[0]}
        <span className="bg-gradient-to-r z-10 from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          {heading.substring(17)}
        </span>
      </h1>

      {/* Subtext */}
      <p style={{color:background === "Light" ? tcol : "#fff"}} className={` mx-auto max-w-[440px] leading-relaxed tracking-wide text-[16px] sm:text-[18px] mt-4`}>
        {subtext.substring(0, 42)} <br />
        {subtext.substring(42)}
      </p>

      {/* Feature Grid */}
      <div className="mt-15  pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 xl:px-20">
        { features.map((feature) => (
              <div
                key={feature.id}
                className="px-10 py-6 sm:py-8 flex z-10 items-start gap-6 sm:gap-6 bg-white w-full h-auto"
              >
                <img
                  src={feature.img}
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  alt={feature.title}
                />
                <div className="flex flex-col gap-3 text-left">
                  <p style={{color:  col}} className="text-[20px] pb-3 sm:text-[22px] font-semibold ">
                    {feature.title}
                  </p>
                  <p style={{color: tcol }} className="text-[16px] sm:text-[19px] w-full leading-relaxed tracking-wide ">
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MoreFeatures;

/* Add shimmer effect in global CSS */
<style jsx global>{`
  .shimmer {
    position: relative;
    overflow: hidden;
  }
  .shimmer::after {
    content: "";
    position: absolute;
    top: 0;
    left: -150px;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.6) 50%,
      transparent 100%
    );
    animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer {
    100% {
      transform: translateX(300%);
    }
  }
`}</style>
