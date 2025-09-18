import React, { useEffect, useState } from "react";
import { useSidebar } from "../../context/Sidebarcontext";

const Demo = () => {
  const {background,pageStripeVisible} = useSidebar();
  const [pageData,setPageData] = useState(null);
  const col = localStorage.getItem('color')
  const pcol = localStorage.getItem('pcolor');
   const gcol = localStorage.getItem('gcolor');
    const tcol = localStorage.getItem('tcolor');

  useEffect(()=>{
    fetch('https://t3-reva.t3planet.de/')
    .then((res)=> res.json())
    .then((data)=>{
      
                function findById(obj, id) {
                    let result = null;

                    //  Search By Id
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

                // Usage:
              const foundData = findById(data, 755); // Replace 123 with your ID
              // console.log(foundData);

         const headingData = foundData?.content?.bodytext;
                
          const text = headingData.replace(/<[^>]*>/g, '').trim();
          

         const secondid = findById(data,754) 
        //  console.log(secondid);

         const num1 = secondid?.content?.processBlock[0].processNumber;
         const bodytext = secondid?.content?.processBlock[0].processText;
         const text1 = bodytext.replace(/<[^>]*>/g, '').trim();

         const num2 = secondid?.content?.processBlock[1].processNumber;
         const bodytext1 = secondid?.content?.processBlock[1].processText;
         const text2 = bodytext1.replace(/<[^>]*>/g, '').trim();

         const num3 = secondid?.content?.processBlock[2].processNumber;
         const bodytext2 = secondid?.content?.processBlock[2].processText;
         const text3 = bodytext2.replace(/<[^>]*>/g, '').trim();
         console.log(num1);
         
         setPageData({text,num1,num2,num3,text1,text2,text3});
    })
  },[])

  const getSubstringBetween = (str, start, end) => {
    if (!str) return '';
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex + start.length);
    if (startIndex === -1 || endIndex === -1) return '';
    return str.substring(startIndex + start.length, endIndex);
  };

  if(!pageData){
    return (
       <div className={`w-full h-100  bg-white`}></div>
    )
  }

  
  return (
    <div style={{backgroundColor:background === 'Light' ? '#fff' : col}} className={`w-full  relative z-10  py-24 text-center`}>

    {pageStripeVisible &&  background === 'Light' &&
    <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-[-1]">
        <div className="absolute top-0 bottom-0 -left-10 w-px bg-gray-200 -z-10"></div>
        <div className="absolute top-0 bottom-0 left-110 w-px bg-gray-200 z-0"></div>
        <div className="absolute top-0 bottom-0 right-91 w-[0.5px] bg-gray-200 z-0"></div>
      </div>}
      

      
        <h1 style={{color: background === 'Dark' ? '#fff' : col}} className={`text-[39px]  font-extrabold `}>
        {pageData?.text?.substring(0,4)}{" "}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        {getSubstringBetween(pageData?.text, "Easy", "demo")}
        </span>{" "}
       {getSubstringBetween(pageData?.text, "one-click", "Set")}
      </h1>

      <p style={{color: background === 'Light' ? tcol : '#fff'}} className={`  leading-relaxed tracking-wide mx-auto max-w-88 text-[18px] mt-4`}>
        {getSubstringBetween(pageData?.text, "install", "just ")}<br/>
        {pageData?.text?.substring(68)}
      </p>

      <div className="grid grid-rows lg:flex px-48 mt-8 justify-center gap-19 xl:gap-69 items-start  py-6 relative">
        <div className="flex flex-col mb-12 items-center relative">
          <div className=" w-50 gap-20">
            <div style={{backgroundColor: pcol}} className="w-25 cursor-pointer ml-12 h-25 flex items-center justify-center   text-white text-4xl font-bold  transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_0_5px_#93c5fd,0_0_0_10px_#bfdbfe,0_0_20px_rgba(59,130,246,0.5)]">
             {pageData?.num1}
            </div>
            <p style={{color: background === 'Dark' ? '#fff' : col}} className={`mt-10 text-2xl  font-bold`}>{pageData?.text1}</p>
          </div>


          <svg
            className="absolute top-8 hidden lg:block lg:-right-30 xl:-right-72 rotate-12 ml-22 lg:w-40 xl:w-80 h-28"
            fill="none"
            viewBox="0 0 200 100"
          >
            <path
              d="M0,30 C70,70 130,90 200,60"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
              markerEnd="url(#arrowhead2)"
            />
            <defs>
              <marker
                id="arrowhead2"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="flex  w-90 flex-col items-center relative">
          <div className=" mt-16 w-50 gap-20">
            <div style={{backgroundColor: pcol}} className="w-25 cursor-pointer ml-12 h-25 flex items-center justify-center text-white text-4xl font-bold  transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_0_5px_#93c5fd,0_0_0_10px_#bfdbfe,0_0_20px_rgba(59,130,246,0.5)]">
              {pageData?.num2}
            </div>
            <p style={{color: background === 'Dark' ? '#fff' : col}} className={`mt-10 text-2xl font-bold`}>{pageData?.text2}</p>
          </div>

          <svg
            className="absolute top-8 mt-11 hidden lg:block lg:-right-30 xl:-right-50 w-40 xl:w-50 h-24"
            fill="none"
            viewBox="0 0 200 100"
          >
            <path
              d="M0,20 C60,10 140,20 200,60"
              stroke="#475569"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
              markerEnd="url(#arrowhead1)"
            />
            <defs>
              <marker
                id="arrowhead1"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
              </marker>
            </defs>
          </svg>
        </div>

        <div className="flex flex-col items-center relative">
          <div className=" mt-8 w-50 gap-20">
            <div style={{backgroundColor: pcol}} className="w-25 cursor-pointer  ml-12 mt-24 h-25 flex items-center justify-center text-white text-4xl font-bold  transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_0_5px_#93c5fd,0_0_0_10px_#bfdbfe,0_0_20px_rgba(59,130,246,0.5)]">
               {pageData?.num3}
            </div>
            <p style={{color: background === 'Dark' ? '#fff' : col}} className={`mt-10 text-2xl font-bold`}>{pageData?.text3}</p>
          </div>
        </div>
      </div> 
   
      
    </div>
  );
};

export default Demo;
