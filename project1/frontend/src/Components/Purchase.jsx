import React, { useState, useEffect } from "react";
import { useSidebar } from "../context/Sidebarcontext";

const Purchase = () => {
  const {background} = useSidebar();
  const col = localStorage.getItem('color')
  const pcol = localStorage.getItem('pcolor');
  const [pageData, setPageData] = useState(null);
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

        const foundData = findById(data, 969);
        const headingData = foundData?.content?.bodytext;
        const text = headingData?.replace(/<[^>]*>/g, "").trim();

        const secondid = findById(data, 972);
        const bodytext = secondid?.content?.bodytext;
        const text1 = bodytext
          ?.replace(/<br\s*\/?>/gi, " ")
          .replace(/<[^>]+>/g, "")
          .trim();

        setPageData({ text, text1 });
        setLoading(false);
      });
  }, []);

  const getSubstringBetween = (str, start, end) => {
    if (!str) return "";
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex + start.length);
    if (startIndex === -1 || endIndex === -1) return "";
    return str.substring(startIndex + start.length, endIndex);
  };

  if(loading){
    return (
      <div className="h-100 w-full bg-[#61dcdf]"></div>
    )
  }

  return (
    <div style={{backgroundColor: col}} className="px-4 flex relative   bg-[#61dcdf] flex-col justify-center items-center text-center py-22">
      
          <h1 className="text-[38px] font-extrabold max-w-109  text-white">
            {pageData?.text.substring(0, 21)} <br />{" "}
            {getSubstringBetween(pageData?.text, "&nbsp;", "One")}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"></span>
          </h1>

          <p className="mt-9 max-w-125  font-mono leading-relaxed tracking-wide text-white text-lg">
            {getSubstringBetween(pageData?.text, "effort", "&nbsp;")} <br />
            {getSubstringBetween(pageData?.text, "&nbsp;&nbsp;", "&nbsp;")}
          </p>

          <button style={{backgroundColor:pcol,
            borderColor:pcol
          }} className="mt-12 px-10 py-4 relative cursor-pointer overflow-hidden border  text-white font-medium text-md group">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-blue-600">
              {pageData?.text1.substring(0, 15)}
            </span>
            <span style={{backgroundColor: col}} className="absolute inset-0  translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
          </button>

          <p className="mt-7 max-w-125 font-mono leading-relaxed tracking-wide text-white text-lg">
            {pageData?.text1.substring(15)}
          </p>
       
    </div>
  );
};

export default Purchase;
