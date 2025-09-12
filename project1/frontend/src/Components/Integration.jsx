import React, { useState, useEffect } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { useSidebar } from '../context/Sidebarcontext';



const Integration = () => {
  const {background} = useSidebar();
  const col = localStorage.getItem('color')
  const [items, setItems] = useState([]);
  const [heading, setHeading] = useState('');
  

  useEffect(() => {
    fetch('https://t3-reva.t3planet.de/')
      .then((res) => res.json())
      .then((data) => {
        function findById(obj, id) {
          let result = null;
          function search(o) {
            if (typeof o !== 'object' || o === null) return;
            for (let key in o) {
              if (key === 'id' && o[key] === id) {
                result = o;
                return;
              }
              if (typeof o[key] === 'object') {
                search(o[key]);
                if (result) return;
              }
            }
          }
          search(obj);
          return result;
        }

        const foundData = findById(data, 798);
        const itemsArray = foundData?.content?.items || [];

        const formatted = itemsArray.flatMap((block) =>
          block.contentElements.map((el) => ({
            id: el.id,
            title: el.content.iconTitle,
            text: el.content.text,
            img: el.content.icon[0]?.publicUrl,
            link: el.content.link?.href,
            linktext: el.content.linkText,
          }))
        );

        const secid = findById(data, 796);
        const bodytext = secid?.content?.bodytext;
        const text = bodytext
          ?.replace(/<br\s*\/?>/gi, ' ')
          .replace(/<[^>]+>/g, '')
          .trim();

        setItems(formatted);
        setHeading(text);
        
      })
      .catch((err)=>console.log(err));
  }, []);

  const getSubstringBetween = (str, start, end) => {
    if (!str) return '';
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex + start.length);
    if (startIndex === -1 || endIndex === -1) return '';
    return str.substring(startIndex + start.length, endIndex);
  };

  if(!items){(
    <div className='h-100 w-full bg-white'></div>
  )}

  return (
    <div style={{backgroundColor:background === 'Light' ? '#fff' : col}} className={`px-6 relative    pt-20 py-2 text-center`}>
        { 
        <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-[-1]">
        <div className="absolute top-0 bottom-0 -left-10 w-px bg-gray-200 z-0"></div>
        <div className="absolute top-0 bottom-0 left-110 w-px bg-gray-200 z-0"></div>
        <div className="absolute top-0 bottom-0 right-91 w-[0.5px] bg-gray-200 z-0"></div>
      </div>}
        
      <h1 style={{color: background === 'Dark' ? '#fff' : col}} className={`text-[38px] font-extrabold   `}>
        {heading?.substring(0, 28)}{" "}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          {getSubstringBetween(heading, "Below ", "This")}
        </span>
      </h1>

      <p className={`${background === 'Light' ? 'text-gray-500' : 'text-white'} mx-auto max-w-115 leading-relaxed tracking-wide text-[18px] mt-4`}>
        {getSubstringBetween(heading, "Products", "&nbsp;")} <br />
        {heading?.substring(96)}
      </p>

      <div className="px-4 lg:px-8 xl:px-24 flex flex-col items-center lg:items-start  lg:flex-row gap-9 py-18 ">
        { items.map((item) => (
              <div
                key={item.id}
                className="border flex flex-col gap-5 px-8 py-8 bg-white border-gray-300 lg:h-auto xl:h-auto w-85 md:w-100"
              >
                <img src={item.img} alt={item.title} className="h-16 w-16" />
                <h1 style={{color:  col}} className="text-left text-[22px] font-semibold">
                  {item.title}
                </h1>
                <p className="text-left text-[20px] text-gray-500 leading-relaxed tracking-wide font-medium">
                  {item.text}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex mt-2 group cursor-pointer gap-1 items-center hover:text-blue-500"
                >
                  <p className="text-left text-[14px]">{item.linktext}</p>
                  <span className="transition group-hover:translate-x-2">
                    <FaArrowRight className="h-3 w-3" />
                  </span>
                </a>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Integration;
