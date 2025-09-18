import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../context/Sidebarcontext';
import { lighten } from 'polished';

const Needhelp = () => {
    const {background,layout,pageStripeVisible} = useSidebar();
    const col = localStorage.getItem('color')
     const gcol = localStorage.getItem('gcolor');
      const tcol = localStorage.getItem('tcolor');
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

        // Heading + text
        const headingData = findById(data, 958);
        const bodytext = headingData?.content?.bodytext || "";
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodytext;
        const h2 = tempDiv.querySelector("h2")?.innerText || "";
        const p = tempDiv.querySelector("p")?.innerText || "";
        setSection({ heading: h2, text: p });

        // Features
        const featureData = findById(data, 959);
        const itemsArray = featureData?.content?.items || [];

        const formattedFeatures = itemsArray.flatMap((block) =>
          block.contentElements.map((el) => ({
            id: el.id,
            img: el.content.icon?.[0]?.publicUrl || "",
            title: el.content.header || "",
            desc: el.content.text || "",
            bullets: el.content.listBlock?.map((l) => l.list) || [],
            link: el.content.link?.href || "#",
            linkText: el.content.linkText || ""
          }))
        );

        setFeatures(formattedFeatures);
        setLoading(false);
      });
  }, []);

  if(loading){
    return(
      <div className='h-150 w-full bg-gray-100'></div>
  )}

  return (
    <div style={{backgroundColor:background === 'Light' ? lighten(0.35,gcol) : lighten(0.26,col)}} className={`px-4 sm:px-6 ${layout === 'Wide' ? 'lg:px-24' : 'lg:px-4'}  relative z-10 pt-24 pb-10 text-center`}>
      {/* Background vertical lines */}
      {!loading && background === 'Light' && layout === 'Wide' && pageStripeVisible &&(
        <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-[-1]">
          <div className="absolute top-0 bottom-0 -left-10 w-px bg-gray-200"></div>
          <div className="absolute top-0 bottom-0 left-110 w-px bg-gray-200"></div>
          <div className="absolute top-0 bottom-0 right-91 w-[0.5px] bg-gray-200"></div>
        </div>
      )}

      {/* Section Heading */}
      <h1 style={{color: background === 'Dark' ? '#fff' : col}} className={`text-[28px] sm:text-[32px] lg:text-[38px] z-10 font-extrabold `}>
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          {section?.heading.substring(0, 10)}
        </span>{" "}
        {section?.heading.substring(10)}
      </h1>

      {/* Section Sub Text */}
      <p style={{color:background === "Light" ? tcol : "#fff"}} className={` z-10 mx-auto max-w-170 leading-relaxed tracking-wide text-base sm:text-lg mt-4 px-2`}>
        {section?.text.substring(0, 75)} <br />
        {section?.text.substring(75)}
      </p>

      {/* Cards Section */}
      <div className="mt-12 flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start justify-center gap-y-10 gap-x-8">
        { features.map((feat) => (
              <div
                key={feat.id}
                className="z-10 h-full bg-white flex flex-col gap-5 px-10 py-12 border-gray-300 w-full sm:w-80 md:w-96 lg:w-80 xl:w-102 cursor-pointer transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="p-4 bg-gray-100 flex justify-center items-center h-16 w-16 mx-auto lg:mx-0">
                  <img src={feat?.img} className="h-7 w-7" alt="" />
                </div>

                {/* Title */}
                <h1 style={{color:  col}} className="text-left text-[20px] sm:text-[22px] w-full  font-medium">
                  {feat?.title}
                </h1>

                {/* Description */}
                <p style={{color: tcol }} className="text-left  leading-relaxed tracking-wide font-medium text-base sm:text-lg">
                  {feat?.desc}
                </p>

                {/* Bullets */}
                <div className="flex flex-col gap-3">
                  {feat.bullets.map((bull, i) => (
                    <p style={{color: tcol }}
                      key={i}
                      className="flex items-center gap-2 md:gap-3 leading-relaxed tracking-wide font-medium text-gray-500 text-sm sm:text-base"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                      >
                        <linearGradient
                          id="grad"
                          x1="32"
                          x2="32"
                          y1="12.664"
                          y2="52.422"
                          gradientUnits="userSpaceOnUse"
                          spreadMethod="reflect"
                        >
                          <stop offset="0" stopColor="#1A6DFF" />
                          <stop offset="1" stopColor="#C822FF" />
                        </linearGradient>
                        <path
                          fill="url(#grad)"
                          d="M24.982,51c-1.273,0-2.547-0.475-3.524-1.429L6.888,35.364C6.315,34.806,6,34.061,6,33.268
                            s0.315-1.538,0.889-2.097l2.82-2.75c1.166-1.137,3.063-1.137,4.228,0.001l10.259,10.003c0.395,0.385,1.058,0.38,1.446-0.012
                            l24.341-24.526c1.147-1.156,3.044-1.186,4.228-0.068l2.867,2.705c0.582,0.55,0.91,1.29,0.923,2.083
                            c0.013,0.793-0.291,1.542-0.854,2.109L28.565,49.514C27.584,50.504,26.283,51,24.982,51z"
                        />
                      </svg>
                      {bull}
                    </p>
                  ))}
                </div>

                {/* Link Button */}
                <div className="flex justify-center md:justify-start">
                  <Link
                    to={feat.link}
                    onClick={() => scrollTo(0, 0)}
                    className="cursor-pointer py-3 px-6 mt-5 font-medium text-white bg-gradient-to-r from-pink-500 to-blue-600"
                  >
                    {feat.linkText || "Get Help"}
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Needhelp;
