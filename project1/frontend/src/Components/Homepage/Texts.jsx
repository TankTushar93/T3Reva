import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/Sidebarcontext';
import { lighten } from 'polished';
const Texts = () => {
  const { background,pageStripeVisible } = useSidebar();
  const [section, setSection] = useState(null);
  const navigate = useNavigate();
  const col = localStorage.getItem('color');
  const pcol = localStorage.getItem('pcolor');
   const gcol = localStorage.getItem('gcolor');
   const tcol = localStorage.getItem('tcolor');
   const terocol = localStorage.getItem('tercolor');


  useEffect(() => {
    fetch('https://t3-reva.t3planet.de/')
      .then(res => res.json())
      .then(data => {
        const colPos0 = data?.content?.colPos0 || [];

        let target = null;
        for (const block of colPos0) {
          const items = block?.content?.items || [];
          for (const item of items) {
            const elements = item?.contentElements || [];
            for (const element of elements) {
              if (element?.content?.bodytext?.includes('8+ Pre-Built')) {
                target = element?.content?.bodytext;
                break;
              }
            }
            if (target) break;
          }
          if (target) break;
        }
        if (!target) return;

        const headingMatch = target.match(/<h2[^>]*>(.*?)<\/h2>/i);
        const headingText = headingMatch ? headingMatch[1].replace(/<[^>]+>/g, '') : '';

        const pMatch = target.match(/<p[^>]*>(.*?)<\/p>/i);
        const paragraph = pMatch
          ? pMatch[1]
              .replace(/<br\s*\/?>/gi, ' ')
              .replace(/&nbsp;/gi, ' ')
              .replace(/<[^>]+>/g, '')
              .trim()
          : '';

        const buttonMatch = target.match(/<a[^>]*>(.*?)<\/a>/i);
        const buttonText = buttonMatch ? buttonMatch[1] : '';

        setSection({ headingText, paragraph, buttonText });
      })
      .catch(err => console.log(err));
  }, []);

  // If no data, render nothing
  if (!section) {
  return (
    <div className={`px-4 relative flex flex-col ${
      background === 'Light' ? 'bg-white' : 'bg-[#61DCDF]'
    } justify-center items-center text-center py-22`}></div>
  );
}

  return (
    <div style={{backgroundColor:background === 'Light' ? '#fff' : col}}
      className={`px-4 relative z-10 flex flex-col  justify-center items-center text-center py-22`}
    >
      {pageStripeVisible && background === "Light" &&
      <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-[-1]">
        <div className="absolute top-0 bottom-0 -left-10 w-px bg-gray-200 -z-10"></div>
        <div className="absolute top-0 bottom-0 left-110 w-px bg-gray-200 z-0"></div>
        <div className="absolute top-0 bottom-0 right-91 w-[0.5px] bg-gray-200 z-0"></div>
      </div> }
      

      <h1
        style={{ color: background === 'Dark' ? '#fff' : col }}
        className="text-[38px] font-extrabold"
      >
        {section.headingText.substring(0, 13)}{" "}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          {section.headingText.substring(13)}
        </span>
      </h1>

      <p style={{color:background === 'Light' ? tcol : '#fff'}}
        className={`mt-3 max-w-140 font-mono leading-relaxed tracking-wide  text-lg`}
      >
        {section.paragraph}
      </p>

      <button style={{backgroundColor : pcol,
        borderColor:pcol
      }}
        className="mt-12 px-10 py-4 relative cursor-pointer overflow-hidden border border-blue-600  text-white font-medium text-md group"
        onClick={() => navigate('/contact-us')}
      >
        <span className="relative z-10 transition-colors duration-500 group-hover:text-blue-600">
          {section.buttonText}
        </span>
        <span style={{backgroundColor:background === 'Light' ? '#fff' : col}}
          className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0`}
        ></span>
      </button>
    </div>
  );
};

export default Texts;
