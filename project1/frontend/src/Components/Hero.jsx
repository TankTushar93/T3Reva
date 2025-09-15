import React, { useEffect, useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import './Hero.css';
import { useSidebar } from '../context/Sidebarcontext';

const Hero = () => {
  const { setIsOpen, color, layout, background } = useSidebar();
  const col = localStorage.getItem('color');
  const [heroData, setHeroData] = useState(null);
  const [index, setIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((data) => {
        const colPos0 = data?.content?.colPos0 || [];
        const heroContainer = colPos0.find(item => item.type === "ns_base_container");
        if (!heroContainer) return;

        const twoCols = heroContainer?.content?.items?.[0]?.contentElements?.find(
          el => el.type === "ns_base_2Cols"
        );
        if (!twoCols) return;

        const textCol = twoCols.content?.items?.[0]?.contentElements || [];
        const imageCol = twoCols.content?.items?.[1]?.contentElements || [];

        const rotator = textCol.find(el => el.type === "mask_ns_text_rotator")?.content;
        const titleText = textCol.find(el => el.type === "text")?.content.bodytext;
        const buttonText = textCol.find(el => el.id === 2638)?.content.bodytext;
        const imageUrl = imageCol[0]?.content?.gallery?.rows?.[1]?.columns?.[1]?.publicUrl;

        setHeroData({
          preText: rotator?.preText || "",
          rotatorWords: rotator?.rotatorBlock?.map(r => r.rotatorText) || [],
          bodyHtml: titleText ? titleText.replace(/<[^>]+>/g, '') : "",
          buttonHtml: buttonText ? buttonText.replace(/<[^>]+>/g, '') : "",
          imageUrl: imageUrl || ""
        });
      })
      .catch(err => console.log(err));
  }, []);


  useEffect(() => {
    if (!heroData || !heroData.rotatorWords || heroData.rotatorWords.length === 0) return;
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
      setIndex((prevIndex) => (prevIndex + 1) % heroData.rotatorWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [heroData]);

 if (!heroData) {
  return (
    <div style={{ backgroundColor: col }} className='w-full h-screen'></div>
  );
}

  return (
    <div style={{ backgroundColor: col }} className='w-full'>
      <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-8 md:px-16 lg:px-[85px] py-42 sm:py-40 md:py-36 lg:py-[156px] xl:py-[136px] items-center'>

        <div className='w-full lg:w-1/2 text-center lg:text-left'>
          <div className="relative text-white">
            <h1 className="text-4xl text-left sm:text-5xl md:text-4xl lg:text-5xl xl:text-7xl font-bold relative z-10">
              {heroData.preText}{" "}
              <span key={animationKey} className='rotator-word'>
                {heroData.rotatorWords[index]}
              </span>
            </h1>

            <h1 className="text-4xl text-left sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mt-6 relative z-10">
              {heroData.bodyHtml.substring(0, 13)}
            </h1>

            <div
              className={`h-6 absolute top-21 sm:top-25 md:top-26 lg:top-27 ${
                layout === 'Wide' ? 'xl:top-36' : 'xl:top-53'
              } inset-0 ml-0 w-1/3 md:w-1/2 xl:w-3/4 bg-gradient-to-r from-blue-600 z-0`}
            ></div>

            <p className='mt-6 text-left sm:mt-12 text-base sm:text-lg md:text-lg lg:text-[17px] leading-relaxed tracking-wide text-white xl:max-w-189 mx-auto lg:mx-0'>
              {heroData.bodyHtml.substring(13)}
            </p>
          </div>

          <button
            className={`mt-8 cursor-pointer ml-0 sm:mt-10 md:mt-20 px-6 sm:px-10 py-4 text-sm sm:text-md font-semibold text-white bg-gradient-to-r from-pink-500 to-blue-600 flex items-center justify-center gap-2 group mx-auto lg:mx-0`}
          >
            {heroData.buttonHtml}
            <FaArrowRightLong className='transition-transform duration-300 group-hover:translate-x-2' />
          </button>
        </div>

        <div className='w-full lg:w-1/2 mt-8 lg:mt-0'>
          <img
            src={heroData.imageUrl}
            className='w-full h-auto rounded-xl object-cover'
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
