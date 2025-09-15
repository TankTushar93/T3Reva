import React, { useState, useEffect } from 'react';
import { useSidebar } from '../context/Sidebarcontext';
import { lighten } from 'polished';

const Editing = () => {
  const { background ,layout,pageStripeVisible} = useSidebar();
  const col = localStorage.getItem('color')
   const gcol = localStorage.getItem('gcolor');
  const [activetab, setActivetab] = useState('Builder');
  const [openMobileTab, setOpenMobileTab] = useState(null);
  const [pageData, setPageData] = useState(null);
 

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

        const foundData = findById(data, 1146);
        const headingData = foundData?.content?.bodytext;
        const text = headingData.replace(/<[^>]*>/g, '').trim();

        const secondid = findById(data, 756);

        const bodytext = secondid?.content?.contentTabBlock[0].contentTabText;
        const bodytext1 = secondid?.content?.contentTabBlock[0].contentBlock[0].contentText;
        const img1 = secondid?.content?.contentTabBlock[0].contentBlock[0].contentImage[0].publicUrl;
        const text1 = bodytext1.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim();

        const bodytextt = secondid?.content?.contentTabBlock[1].contentTabText;
        const bodytext2 = secondid?.content?.contentTabBlock[1].contentBlock[0].contentText;
        const img2 = secondid?.content?.contentTabBlock[1].contentBlock[0].contentImage[0].publicUrl;
        const text2 = bodytext2.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim();

        const bodytextt2 = secondid?.content?.contentTabBlock[2].contentTabText;
        const bodytext3 = secondid?.content?.contentTabBlock[2].contentBlock[0].contentText;
        const img3 = secondid?.content?.contentTabBlock[2].contentBlock[0].contentImage[0].publicUrl;
        const text3 = bodytext3.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim();

        setPageData({ text, bodytext, text1, img1, bodytextt, img2, text2, bodytextt2, img3, text3 });
       
      });
  }, []);

  const getSubstringBetween = (str, start, end) => {
    if (!str) return '';
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex + start.length);
    if (startIndex === -1 || endIndex === -1) return '';
    return str.substring(startIndex + start.length, endIndex);
  };

  if(!pageData){
    return(
      <div className='h-150 w-full bg-gray-100'></div>
    )
  }

  

  return (
    <div style={{backgroundColor:background === 'Light' ? lighten(0.35,gcol) : lighten(0.26,col)}}
      className={` 
                  w-full relative items-center flex flex-col h-250 px-4 py-24 text-center`}
    >
      {background === 'Light' && layout === 'Wide' && pageStripeVisible &&
       <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-0">
        <div className="absolute top-0 bottom-0 -left-10 w-px bg-gray-200"></div>
        <div className="absolute top-0 bottom-0 left-110 w-px bg-gray-200"></div>
        <div className="absolute top-0 bottom-0 right-91 w-[0.5px] bg-gray-200"></div>
      </div>}
     

     
          {/* Main Heading */}
          <h1 style={{color: background === 'Dark' ? '#fff' : col}}
            className={`text-4xl z-10 font-extrabold `}
          >
            {pageData?.text?.substring(0, 8)}{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              {getSubstringBetween(pageData?.text, 'Powerful', 'tools')}
            </span>{' '}
            {getSubstringBetween(pageData?.text, 'editing', 'We')}
          </h1>

          <p style={{color:background === "Light" ? "gray" : "#fff"}}
            className={`z-10 mx-auto leading-relaxed tracking-wide max-w-130 text-[18px] mt-4 
                        `}
          >
            {getSubstringBetween(pageData?.text, 'tools', 'without')} <br /> {pageData?.text?.substring(91)}
          </p>

          {/* Desktop Tabs */}
          <div className={`hidden z-10 lg:flex justify-center 
                          ${background === "Light" ? "text-gray-500" : "text-white"} 
                          lg:text-md xl:text-lg font-medium items-center mt-24 text-center`}>
            <button
              onClick={() => setActivetab('Builder')}
              className={`border-b-3 leading-relaxed tracking-wide cursor-pointer font-semibold hover:text-blue-500  
                ${activetab === 'Builder' ? 'border-blue-500' : 'border-gray-200'} lg:px-22 xl:px-29 py-2`}
            >
              {pageData?.bodytext}
            </button>

            <button
              onClick={() => setActivetab('Options')}
              className={`border-b-3 leading-relaxed tracking-wide cursor-pointer font-semibold hover:text-blue-500 
                ${activetab === 'Options' ? 'border-blue-500' : 'border-gray-200'} lg:px-22 xl:px-29 py-2`}
            >
              {pageData?.bodytextt}
            </button>

            <button
              onClick={() => setActivetab('Dashboard')}
              className={`border-b-3 leading-relaxed tracking-wide cursor-pointer font-semibold hover:text-blue-500 
                ${activetab === 'Dashboard' ? 'border-blue-500' : 'border-gray-200'} lg:px-22 xl:px-29 py-2`}
            >
              {pageData?.bodytextt2}
            </button>
          </div>

          {/* Mobile Dropdown */}
          <div className="z-10 w-full max-w-xl mt-10 lg:hidden">
            {[
              { key: 'Builder', title: pageData?.bodytext, content: pageData?.text1, img: pageData?.img1 },
              { key: 'Options', title: pageData?.bodytextt, content: pageData?.text2, img: pageData?.img2 },
              { key: 'Dashboard', title: pageData?.bodytextt2, content: pageData?.text3, img: pageData?.img3 },
            ].map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-md mb-4 bg-white">
                <div
                  className="h-16 px-6 flex items-center justify-between cursor-pointer"
                  onClick={() => setOpenMobileTab(openMobileTab === item.key ? null : item.key)}
                >
                  <p className={`text-md font-medium ${background === "Light" ? "text-[#61dcdf]" : "text-gray-500"}`}>
                    {item.title}
                  </p>
                  <span
                    className={`text-xl font-bold transition-transform duration-300 
                      ${openMobileTab === item.key ? 'rotate-45 text-blue-500' : 'rotate-0 text-gray-500'}`}
                  >
                    +
                  </span>
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden 
                              ${openMobileTab === item.key ? 'max-h-[500px] p-4' : 'max-h-0'}`}
                >
                  <p className={`${background === "Light" ? "text-gray-600" : "text-[#61dcdf]"} text-left text-sm leading-relaxed tracking-wide`}>
                    {item.content}
                  </p>
                  <img src={item.img} alt={item.title} className="mt-4 w-full rounded-md" />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Content */}
          {activetab === 'Builder' && (
            <div className="px-24 z-10 py-24 hidden lg:flex gap-40 justify-between">
              <div className="flex flex-col items-start py-19 h-122 w-125">
                <h1 style={{color: background === 'Dark' ? '#fff' : col}}
                  className={`text-[38px] leading-relaxed tracking-wide font-extrabold text-left 
                              `}
                >
                  {pageData?.text1.substring(0, 20)} <br /> {getSubstringBetween(pageData?.text1, '&nbsp;', 'page')}
                  <br />
                  <span className="bg-gradient-to-r mt-9 from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    {getSubstringBetween(pageData?.text1, 'intuitive', 'Create')}
                  </span>
                </h1>

                <p
                  className={`mt-10 text-left text-lg leading-relaxed tracking-wide w-81 
                              ${background === "Light" ? "text-gray-500" : "text-white"}`}
                >
                  {getSubstringBetween(pageData?.text1, 'builder', '&nbsp; ')} <br />
                  {getSubstringBetween(pageData?.text1, 'professional&nbsp;', '&amp;')}
                  {getSubstringBetween(pageData?.text1, 'drag', 'amp')}
                  {getSubstringBetween(pageData?.text1, '&amp;', '&nbsp;')} <br />
                  {pageData?.text1.substring(144)}
                </p>
              </div>
              <div className="h-115 mt-4">
                <img className="h-auto w-full lg:mt-24 xl:mt-0 lg:h-auto lg:w-full xl:w-159" src={pageData?.img1} alt="" />
              </div>
            </div>
          )}

          {activetab === 'Options' && (
            <div className="px-24 z-10 py-18 hidden lg:flex gap-5 justify-between">
              <div className="flex flex-col items-start py-19 h-122">
                <h1 style={{color: background === 'Dark' ? '#fff' : col}}
                  className={`text-[38px] leading-relaxed tracking-wide font-extrabold text-left 
                              `}
                >
                  {pageData?.text2.substring(0, 46)}
                  <br />
                  <span className="bg-gradient-to-r mt-9 from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    {getSubstringBetween(pageData?.text2, '&nbsp;', 'The')}
                  </span>
                </h1>
                <p
                  className={`mt-10 text-left text-lg leading-relaxed tracking-wide w-150 
                              ${background === "Light" ? "text-gray-500" : "text-white"}`}
                >
                  {pageData?.text2.substring(66)}
                </p>
              </div>
              <div className="h-81 lg:mt-30 xl:mt-20">
                <img className="h-auto w-full lg:h-auto xl:h-80 lg:w-full xl:w-200" src={pageData?.img2} alt="" />
              </div>
            </div>
          )}

          {activetab === 'Dashboard' && (
            <div className="px-24 z-10 py-18 hidden lg:flex gap-5 justify-between">
              <div className="flex flex-col items-start py-19 h-122 w-224">
                <h1 style={{color: background === 'Dark' ? '#fff' : col}}
                  className={`text-[38px] leading-relaxed tracking-wide font-extrabold text-left 
                              `}
                >
                  {pageData?.text3.substring(0, 29)}-<br />
                  {getSubstringBetween(pageData?.text3, 'create', '&nbsp;')}
                  <br />
                  <span className="bg-gradient-to-r mt-9 from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    {getSubstringBetween(pageData?.text3, '&nbsp;', 'Use')}
                  </span>
                </h1>
                <p
                  className={`mt-10 text-left leading-relaxed tracking-wide text-lg w-90 
                              ${background === "Light" ? "text-gray-500" : "text-white"}`}
                >
                  {getSubstringBetween(pageData?.text3, 'required.', '&nbsp;')}
                  {getSubstringBetween(pageData?.text3, 'dashboard&nbsp;', '&nbsp')}
                  {pageData?.text3.substring(159)}
                </p>
              </div>
              <div className="h-115 mt-20">
                <img className="h-auto w-full lg:h-auto lg:w-full xl:w-189" src={pageData?.img3} alt="hello" />
              </div>
            </div>
          )}
       
    </div>
  );
};

export default Editing;
