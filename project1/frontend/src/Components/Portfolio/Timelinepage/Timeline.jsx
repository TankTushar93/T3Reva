import React from 'react';

const timelineEvents = [
  {
    date: "December 23rd 2005",
    title: "How Buy Now, Pay Later Could Transform Traditional B2B Trade Finance Models",
    text: "There are more questions that need answers before significant disruption to current models, such as the credit card,....",
  },
  {
    date: "November 23rd 2010",
    title: "Hiring Your Startup’s First Customer Success Lead",
    text: "Customer success (CS) is one of the most critical functions of a startup.",
  },
  {
    date: "November 23rd 2009",
    title: "This Entrepreneur Is Bringing The In-Person Bazaar",
    text: "Digital marketplaces continue to be a staple of the e-commerce world today.",
  },
];

const Timeline = () => {
  return (
    <div className="relative wrap overflow-hidden px-24 py-24 h-full">
      <div className="border-2-2 absolute border-opacity-20 border-cyan-400 h-full border" style={{ left: '50%' }}></div>
      {timelineEvents.map((event, index) => (
        <div 
          key={index} 
          className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : 'left-timeline'}`}
        >
          <div className="order-1 w-xl"></div>
          <div className="z-10 flex items-center order-1 bg-cyan-400 shadow-xl w-10 h-10 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-white"></h1>
          </div>
          <div className="order-1 w-xl py-6 px-8 flex flex-col gap-2 bg-cyan-400 text-white/90 ">
            <p className="text-sm">{event.date}</p>
            <h3 className="mb-3 font-semibold text-2xl">{event.title}</h3>
            <p className="text-lg leading-snug tracking-wide text-white text-opacity-100">{event.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;