import React, { useState, useEffect } from 'react';
import { useSidebar } from '../../context/Sidebarcontext';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';

const Elegant = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem('color');

  const [galleryData, setGalleryData] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/basic-elements/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data?.breadcrumbs) {
          setBreadcrumbs(data.breadcrumbs);
        }
        function findById(obj, id) {
          let result = null;
          function search(o) {
            if (typeof o !== "object" || o === null) return;
            for (let key in o) {
              if (key === "id" && o[key] === id) {
                result = o;
                return;
              }
              if (typeof o[key] === "object") {
                search(o[key]);
                if (result) return;
              }
            }
          }
          search(obj);
          return result;
        }

        const galleryContent = findById(data, 1353);
        const bodytext = galleryContent?.content?.bodytext || "";

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodytext;
        const h1 = tempDiv.querySelector("h1")?.innerText || "";
        const p = tempDiv.querySelector("p")?.innerText || "";

        setGalleryData({ title: h1, description: p });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gallery data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-110 w-full bg-gray-100 flex justify-center items-center"> </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor:
          background === 'Light'
            ? 'oklch(96.7% 0.003 264.542)'
            : lighten(0.24, col),
      }}
      className="h-110 w-full flex flex-col justify-center items-center bg-gray-100 text-center px-4 sm:px-8 lg:px-16 py-10"
    >
      {/* Title */}
      <h1
        style={{ color: background === 'Dark' ? '#fff' : col }}
        className="text-[28px] sm:text-[34px] md:text-[39px] font-extrabold mt-14 sm:mt-14"
      >
        {galleryData?.title}
      </h1>

      {/* Description */}
      <p
        style={{ color: background === 'Dark' ? '#fff' : 'gray' }}
        className="text-gray-500 leading-relaxed tracking-wide mx-auto max-w-[700px] text-[15px] sm:text-[17px] md:text-[18px] mt-4"
      >
        {galleryData?.description}
      </p>

      {/*  Breadcrumbs */}
      <div
        className="flex flex-wrap justify-center gap-2 sm:gap-3 cursor-pointer mt-8 text-[13px] sm:text-[15px] md:text-[16px]"
        style={{ color: background === 'Dark' ? '#fff' : 'gray' }}
      >
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="flex items-center gap-2">
            <Link
              className="cursor-pointer hover:text-blue-400 transition-colors duration-300"
              to={crumb.link}
            >
              {crumb.title}
            </Link>
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Elegant;
