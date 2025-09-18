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
  ]


const Images3 = () => {
  

  return (
    <div className="w-full mx-auto px-4 py-18">
      <div className="grid grid-cols-1 px-26 md:grid-cols-3 gap-3">
        {images.map((img,index)=>(
            <div key={index} className="h-100 overflow-hidden">
                <img src={img.url} className="h-full transition cursor-pointer duration-300 hover:scale-108 w-full object-cover" alt="" />
            </div>
        ))}
      </div>
    </div>
  );
};

export default Images3;