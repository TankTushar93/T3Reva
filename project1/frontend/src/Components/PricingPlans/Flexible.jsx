import React, { useState, useEffect } from 'react';
import { useSidebar } from '../../context/Sidebarcontext';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';

const Flexible = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem('color');

  const [content, setContent] = useState({ title: '', description: '' });
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/infographic-elements/pricing-plans")
      .then((res) => res.json())
      .then((data) => {
        // 1️⃣ Extract dynamic content
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

        // Replace with correct ID from API
        const contentData = findById(data, 1466);

        // Parse HTML to extract <h2> and <p>
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = contentData?.content?.bodytext || "";

        const h2 = tempDiv.querySelector("h2")?.innerText || "";
        const p = tempDiv.querySelector("p")?.innerText || "";

        setContent({ title: h2, description: p });

        // 2️⃣ Extract breadcrumbs
        setBreadcrumbs(data?.breadcrumbs || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-[440px] bg-gray-100 flex justify-center items-center">
        
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
      {/* Dynamic Heading */}
      <h1
        style={{ color: background === 'Dark' ? '#fff' : col }}
        className="text-[28px] sm:text-[32px] md:text-[39px] mt-10 md:mt-14 font-extrabold leading-tight"
      >
        {content.title}
      </h1>

      {/* Dynamic Description */}
      <p
        style={{ color: background === 'Dark' ? '#fff' : 'gray' }}
        className="text-gray-500 leading-relaxed tracking-wide mx-auto max-w-[740px] text-[15px] sm:text-[16px] md:text-[18px] mt-3 sm:mt-4 px-3"
      >
        {content.description}
      </p>

      {/* Dynamic Breadcrumbs */}
      <div
        style={{ color: background === 'Dark' ? '#fff' : 'gray' }}
        className="flex flex-wrap justify-center gap-1 text-sm sm:text-base cursor-pointer mt-6 sm:mt-8 md:mt-11"
      >
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <Link to={crumb.link} className='hover:text-blue-400'>{crumb.title}</Link>
            {index < breadcrumbs.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Flexible;
