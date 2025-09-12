import React, { useState, useEffect } from 'react';
import { useSidebar } from '../../context/Sidebarcontext';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';

const Video = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem('color');

  const [content, setContent] = useState({ title: '', description: '' });
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/business-elements/video-modal")
      .then((res) => res.json())
      .then((data) => {
        // === Helper function to find an object by ID ===
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

        // === Fetch block by ID 751 ===
        const contentBlock = findById(data, 751);

        if (contentBlock) {
          // Parse HTML bodytext to extract <h1> and <p>
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = contentBlock.content?.bodytext || "";

          const h1 = tempDiv.querySelector("h1")?.innerText || "";
          const p = tempDiv.querySelector("p")?.innerText || "";

          setContent({ title: h1, description: p });
        }

        // Set breadcrumbs from response
        setBreadcrumbs(data?.breadcrumbs || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video modal data:", error);
        setLoading(false);
      });
  }, []);

  // === Loader State ===
  if (loading) {
    return (
      <div className="h-[440px] bg-gray-100 flex justify-center items-center text-gray-500">
        Loading Video Modal...
      </div>
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
      className="min-h-[440px] w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 text-center"
    >
      {/* === Dynamic Title === */}
      <h1
        style={{ color: background === 'Dark' ? '#fff' : col }}
        className="text-[28px] sm:text-[32px] md:text-[39px] mt-10 md:mt-14 font-extrabold leading-tight"
      >
        {content.title}
      </h1>

      {/* === Dynamic Description === */}
      <p
        style={{ color: background === 'Dark' ? '#fff' : 'gray' }}
        className="text-gray-500 leading-relaxed tracking-wide mx-auto max-w-[740px] text-[15px] sm:text-[16px] md:text-[18px] mt-3 sm:mt-4 px-3"
      >
        {content.description}
      </p>

      {/* === Dynamic Breadcrumbs === */}
      <div
        style={{ color: background === 'Dark' ? '#fff' : 'gray' }}
        className="flex flex-wrap justify-center gap-1 text-sm sm:text-base cursor-pointer mt-6 sm:mt-8 md:mt-11"
      >
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <Link to={crumb.link} className="hover:text-blue-400">
              {crumb.title}
            </Link>
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Video;
