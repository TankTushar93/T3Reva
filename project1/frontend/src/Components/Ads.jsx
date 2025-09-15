import React, { useState, useEffect } from "react";
import { useSidebar } from "../context/Sidebarcontext";
import {lighten} from 'polished'
const Ads = () => {
  const { background, layout } = useSidebar();
  const col = localStorage.getItem('color');
  const [adData, setAdData] = useState(null);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((data) => {
        const rawText =
          data.content.colPos0[6].content.items[0].contentElements[0].content
            .items[0].contentElements[0].content.bodytext;

        let cleanText = rawText
          .replace(/<[^>]*>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        const img =
          data.content.colPos0[6].content.items[0].contentElements[0].content
            .items[1].contentElements[0].content.gallery.rows[1].columns[1]
            .publicUrl;

        const header =
          data?.content?.colPos0?.[6].content.items[0].contentElements[0]
            .content.items[0].contentElements[1].content.items[0]
            .contentElements[0].content;

        const sectext =
          data?.content?.colPos0?.[6].content.items[0].contentElements[0]
            .content.items[0].contentElements[1].content.items[0]
            .contentElements[1].content.bodytext;

        let secntext = sectext
          .replace(/<[^>]*>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        const header2 =
          data?.content?.colPos0?.[6].content.items[0].contentElements[0]
            .content.items[0].contentElements[1].content.items[1]
            .contentElements[0].content;

        const sectext2 =
          data?.content?.colPos0?.[6].content.items[0].contentElements[0]
            .content.items[0].contentElements[1].content.items[1]
            .contentElements[1].content.bodytext;

        let secntext2 = sectext2
          .replace(/<[^>]*>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        setAdData({
          text: cleanText,
          img,
          header,
          secntext,
          header2,
          secntext2,
        });
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

  if (!adData){
    return (
      <div
      className={`h-screen  w-full 
       bg-gray-100 `}
    ></div>
    )
  } 

  return (
    <div style={{backgroundColor:background === 'Light' ? '#fff' : lighten(0.26,col)}}
      className={`h-auto relative w-full flex justify-center items-center
       xl:pt-24 pb-19`}
    >
      <div
        className={`flex flex-col z-10 lg:flex-row mb-0 xl:mb-10 justify-center items-center w-full px-4 lg:px-6 xl:px-1 ${
          layout === "Wide" ? "xl:ml-27" : "xl:ml-10"
        } gap-3 ${background === "Light" ? "text-gray-900" : "text-white"}`}
      >
 
        <div
          className={`w-full xl:w-140 mt-19 ${
            layout === "Wide" ? "xl:pl-20" : "xl:pl-8"
          } pt-6 text-center lg:text-left`}
        >
          <h1
            style={{ color: background === 'Dark' ? '#fff' : col }}
            className={`text-[32px] md:text-[40px] font-extrabold`}
          >
            {adData.text?.substring(0, 4)}{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              {getSubstringBetween(adData.text, "Over", "Build")}
            </span>
            {getSubstringBetween(adData.text, "Elements", "Each")}
          </h1>

          <p
            className={`mt-6 text-base md:text-[20px] w-full xl:max-w-135 leading-relaxed tracking-wide ${
              background === "Light" ? "text-gray-500" : "text-white"
            }`}
          >
            {adData.text?.substring(61)}
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:flex gap-10 mt-18 justify-center lg:justify-center">
            {[{ header: adData.header, text: adData.secntext }, { header: adData.header2, text: adData.secntext2 }].map(
              (item, index) => (
                <div key={index} className="text-center">
                  <h1
                    style={{ color: background === 'Dark' ? '#fff' : col }}
                    className={`text-3xl md:text-5xl font-extrabold mt-6`}
                  >
                    {item?.header?.counterData}
                    {item?.header?.counterAppendeg}
                  </h1>
                  <p
                    className={`mt-4 text-center font-semibold text-[22px] ${
                      background === "Light" ? "text-gray-500" : "text-white"
                    }`}
                  >
                    {item?.header?.headline}
                  </p>
                  <p
                    className={`max-w-49 mx-auto text-[18px] leading-relaxed ${
                      background === "Light" ? "text-gray-500" : "text-white"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <div
          className={`w-full ${
            layout === "Wide" ? "lg:h-150 lg:w-250" : "lg:h-100 lg:w-160"
          } mb-2 flex justify-center`}
        >
          <img
            className="h-full w-full object-contain"
            src={adData.img}
            alt="Ad visual"
          />
        </div>
      </div>
    </div>
  );
};

export default Ads;
