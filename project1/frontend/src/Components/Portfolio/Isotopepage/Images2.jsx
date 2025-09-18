import React, { useState } from "react";


 const images = [
    {
      url: "https://t3-reva.t3planet.de/fileadmin/ns_theme_t3reva/Portfolio/buster-keaton.jpg",
      category: "App",
    },
    {
      url: "https://t3-reva.t3planet.de/fileadmin/ns_theme_t3reva/Portfolio/great-work-done.jpg",
      category: "App",
    },
    {
      url: "https://t3-reva.t3planet.de/fileadmin/ns_theme_t3reva/Portfolio/home_main_portfolio_2.jpg",
      category: "Web",
    },
    {
      url: "https://t3-reva.t3planet.de/fileadmin/ns_theme_t3reva/Portfolio/marketing-campaigns.jpg",
      category: "UX Design",
    },
    {
      url: "https://t3-reva.t3planet.de/fileadmin/ns_theme_t3reva/Portfolio/home_main_portfolio_5.jpg",
      category: "UX Design",
    },
    {
      url: "https://t3-reva.t3planet.de/fileadmin/ns_theme_t3reva/Portfolio/home_main_portfolio_6.jpg",
      category: "Branding",
    },
    
   
  ]


const Images2 = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredImages = images.filter(
    (image) => activeFilter === "All" || image.category === activeFilter
  );

  // Distribute images into three columns for the masonry layout
  const col1 = filteredImages.filter((_, index) => index % 3 === 0);
  const col2 = filteredImages.filter((_, index) => index % 3 === 1);
  const col3 = filteredImages.filter((_, index) => index % 3 === 2);

  return (
    <div className="w-full mx-auto px-4 py-18">
      <div className="flex  justify-center text-center mb-20">
        <div className="text-md flex gap-2 uppercase space-x-4 text-gray-600">
          {["All", "App", "Web", "UX Design", "Branding"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`hover:text-blue-500 transition-colors ${
                activeFilter === filter ? "text-blue-500 font-bold" : ""
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 px-26 md:grid-cols-3 gap-3">
        {filteredImages.map((img,index)=>(
            <div key={index} className="h-100 overflow-hidden">
                <img src={img.url} className="h-full transition cursor-pointer duration-300 hover:scale-108 w-full object-cover" alt="" />
            </div>
        ))}
      </div>
    </div>
  );
};

export default Images2;