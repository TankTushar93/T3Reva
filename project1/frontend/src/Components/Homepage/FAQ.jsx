import React, { useState, useEffect } from 'react';
import { useSidebar } from '../../context/Sidebarcontext';

const FAQ = () => {
  const { background, layout ,pageStripeVisible} = useSidebar();
  const col = localStorage.getItem('color');
   const tcol = localStorage.getItem('tcolor');
  const [faq, setFaq] = useState({ heading: "", text: "", items: [] });
  const [open, setOpen] = useState(null); // Track currently opened index
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/") // replace with your actual API endpoint
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

        const faqData = findById(data, 762);

        const rawBodytext =
          faqData?.content?.items?.[0]?.contentElements?.[0]?.content?.bodytext || "";
        const temp = document.createElement("div");
        temp.innerHTML = rawBodytext;
        const heading = temp.querySelector("h2")?.innerText || "";
        const text = temp.querySelector("p")?.innerText || "";

        const accordions =
          faqData?.content?.items?.[0]?.contentElements?.[1]?.content?.items || [];

        const items = accordions.flatMap((block) =>
          block.contentElements.flatMap((el) => el.content.accordionItem || [])
        );

        setFaq({ heading, text, items });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if(loading){
    return (
      <div className='h-100 w-full bg-white'></div>
    )
  }

  return (
    <div style={{backgroundColor:background === 'Light' ? '#fff' : col}} className={`px-4 flex  z-10 relative  flex-col items-center text-center pb-29 py-22`}>

      {!loading && background === 'Light' && pageStripeVisible &&
        <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-[-1]">
          <div className="absolute top-0 bottom-0 -left-10 w-[1px] bg-gray-200 z-0"></div>
          <div className="absolute top-0 bottom-0 left-110 w-[1px] bg-gray-200 z-0"></div>
          <div className="absolute top-0 bottom-0 right-91 w-[0.6px] bg-gray-200 z-0"></div>
        </div>
      }

      {/* Heading */}
      
        <h1 style={{ color: background === 'Dark' ? '#fff' : col }} className={`text-[38px] font-extrabold  `}>
          {faq?.heading.substring(0, 14)}{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            {faq?.heading.substring(14)}
          </span>
        </h1>
      

      {/* Sub Text */}
      
        <p style={{color:background === "Light" ? tcol : "#fff"}} className={`mt-7 max-w-149 font-mono leading-relaxed tracking-wide   text-lg`}>
          {faq?.text.substring(0, 68)} <br />
          {faq?.text.substring(68)}
        </p>
      

      {/* Accordion Items */}
      <div className={`grid grid-cols-1 md:grid-cols-2 mt-20 gap-4 px-3 ${layout === 'Wide' ? 'xl:px-22' : 'xl:px-8'}  xl:w-full`}>
        {/* First Column - First 4 Questions */}
        <div className="flex flex-col gap-4">
          { faq.items.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className={`relative border cursor-pointer  border-gray-200 justify-between px-6 lg:w-120 ${layout === 'Wide' ? 'xl:w-160' : 'xl:w-130'}  flex flex-col bg-white`}
              >
                {/* Question */}
                <div
                  onClick={() => setOpen(open === index ? null : index)}
                  className="h-auto min-h-16 flex justify-between items-center px-2 w-full"
                >
                  {/* Title Text */}
                  <p
                    style={{ color: col }}
                    className="flex-1 text-left pr-8 leading-relaxed tracking-wide text-[15px] sm:text-[16px] md:text-[17px] lg:text-lg font-medium hover:text-blue-600 cursor-pointer break-words"
                  >
                    {item.title}
                  </p>

                  {/* Toggle Button */}
                  <button className="relative flex items-center justify-center w-6 h-6">
                    <span className="absolute cursor-pointer w-3 h-[3px] bg-gray-500 transition-all"></span>
                    <span
                      className={`absolute cursor-pointer w-[3px] h-3 bg-gray-500 transition-transform duration-300 ${open === index ? "-rotate-90" : ""
                        }`}
                    ></span>
                  </button>
                </div>


                {/* Dropdown Answer */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${open === index ? "max-h-[500px] py-4" : "max-h-0"
                    }`}
                >
                  <p style={{color: tcol}} className=" text-lg text-left leading-relaxed tracking-wide px-1">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Second Column - Remaining Questions */}
        <div className="flex flex-col gap-4">
          {faq.items.slice(4).map((item, index) => {
            const actualIndex = index + 4; // ensure unique index for second column
            return (
              <div
                key={actualIndex}
                className={`relative border cursor-pointer border-gray-200 justify-between px-6 lg:w-120 ${layout === 'Wide' ? 'xl:w-160' : 'xl:w-130'} flex flex-col bg-white`}
              >
                {/* Question */}
                <div
                  onClick={() => setOpen(open === actualIndex ? null : actualIndex)}
                  className="min-h-16 items-center flex justify-between w-full px-2"
                >
                  {/* Title Text */}
                  <p
                    style={{ color: col }}
                    className="flex-1 text-left pr-8 leading-relaxed tracking-wide text-[15px] sm:text-[16px] md:text-[17px] lg:text-md xl:text-lg font-medium hover:text-blue-600 cursor-pointer break-words"
                  >
                    {item.title}
                  </p>

                  {/* Toggle Button */}
                  <button className="relative flex items-center justify-center w-6 h-6">
                    <span className="absolute w-3 h-[3px] cursor-pointer bg-gray-500 transition-all"></span>
                    <span
                      className={`absolute w-[3px] h-3 cursor-pointer bg-gray-500 transition-transform duration-300 ${open === actualIndex ? "-rotate-90" : ""
                        }`}
                    ></span>
                  </button>
                </div>


                {/* Dropdown Answer */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${open === actualIndex ? "max-h-[500px] py-4" : "max-h-0"
                    }`}
                >
                  <p style={{color: tcol }} className=" text-lg text-left leading-relaxed tracking-wide px-1">
                    {item.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default FAQ;
