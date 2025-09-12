import React, { useEffect, useState } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useSidebar } from '../context/Sidebarcontext';

const Cards = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem('color')
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((data) => {
        let allCards = [];

        Object.keys(data.content).forEach((colKey) => {
          const blocks = data.content[colKey];

          blocks.forEach((block) => {
            const items = block?.content?.items || [];

            items.forEach((item) => {
              const elements = item?.contentElements || [];

              elements.forEach((element) => {
                if (element.type === "mask_ns_content_box") {
                  const imgUrl = element.content?.icon?.[0]?.publicUrl || "";
                  const title = element.content?.contentLinkText || "";
                  const link = element.content?.contentLink?.href || "#";

                  allCards.push({ imgUrl, title, link });
                }
              });
            });
          });
        });

        setCards(allCards);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{backgroundColor:background === 'Light' ? '#fff' : col}}
      className={`h-full relative  grid pb-12 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-4 px-4 py-4 w-full`}
    >
      {/* If no cards are loaded yet, render empty container */}
      {cards.length === 0 ? (
        <div className="col-span-full w-full h-screen"></div>
      ) : (
        cards.map((card, index) => (
          <Link
            to={card.link}
            key={index}
            className='relative group mb-18 flex flex-col justify-center items-center text-center w-full p-6 sm:p-8 bg-gray-100 cursor-pointer transition duration-200 ease-in hover:bg-white'
          >
            <img
              src={card.imgUrl}
              className='w-full h-auto object-contain'
              alt={card.title}
            />
            <div className='flex mt-3 justify-center gap-1 items-center hover:text-blue-500'>
              <p className='text-sm'>{card.title}</p>
              <span className='transition group-hover:translate-x-2'>
                <FaArrowRight />
              </span>
            </div>
            <div className="absolute bottom-0 h-[2px] bg-blue-600 w-[85%] origin-center scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Cards;
