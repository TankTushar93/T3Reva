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

const Content = () => {
  return (
    <div className="flex flex-col lg:flex-row  px-14 py-18 bg-gray-100">
      {/* Left Content Section */}
      <div className="lg:w-1/2 p-4 lg:p-10 mb-10 lg:mb-0">
        <h2 className="text-3xl lg:text-[32px] font-bold text-cyan-400 mt-18 mb-6">
          Create request processes so you always get the info you need to deliver results fast
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Our network of practitioners will provide you with the strategic guidance to make the right technology, business and commercial decisions, and our program managers will help you develop and implement the best operational framework and processes for your company.
        </p>
        <ul className="list-none space-y-3 mb-8">
          <li className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Early stage product mentorship
          </li>
          <li className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Strong international ecosystem
          </li>
          <li className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Seed investment & incubation
          </li>
          <li className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Strong company culture
          </li>
        </ul>
        <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
          Our service
        </button>
      </div>

      {/* Right Timeline Section */}
      <div className="lg:w-1/2 p-4 lg:p-10 relative">
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-200"></div>
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse justify-end' : ''}`}
          >
            <div className={`w-70 ${index % 2 !== 0 ? 'text-left ml-90' : ''}`}>
              <div className="bg-cyan-400 px-8 py-10  max-w-sm ml-auto">
                <p className="text-sm text-white/90 mb-1 text-opacity-80">{event.date}</p>
                <h3 className="font-bold text-2xl text-white mb-2">{event.title}</h3>
                <p className="text-lg text-white text-opacity-80 leading-snug">{event.text}</p>
              </div>
            </div>
            <div className="z-10 bg-white border-4 border-gray-200 w-8 h-8 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;