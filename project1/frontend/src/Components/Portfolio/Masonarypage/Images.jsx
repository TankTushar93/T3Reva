import React, { useState } from "react";

const initialGalleryData = {
  images: [
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
    {
      url: "https://t3-reva.t3planet.de/fileadmin/ns_theme_t3reva/Portfolio/coffee-tropical.jpg",
      category: "Branding",
    },
   
  ],
};

const Images = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredImages = initialGalleryData.images.filter(
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
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          {col1.map((image, index) => (
            <div key={index} className="relative overflow-hidden group">
              <img
                src={image.url}
                alt={image.category}
                className="w-full h-auto cursor-pointer object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3">
          {col2.map((image, index) => (
            <div key={index} className="relative overflow-hidden group">
              <img
                src={image.url}
                alt={image.category}
                className="w-full h-auto cursor-pointer object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3">
          {col3.map((image, index) => (
            <div key={index} className="relative overflow-hidden group">
              <img
                src={image.url}
                alt={image.category}
                className="w-full h-auto cursor-pointer object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Images;