// Topbar.jsx
// import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail, FiClock } from "react-icons/fi";
import { useSidebar } from "../context/Sidebarcontext";

const Topbar = () => {
    const {headerMenu,background} = useSidebar();
    const col = localStorage.getItem('color');
    const pcol = localStorage.getItem('pcolor');
    const gcol = localStorage.getItem('gcolor');
     const tcol = localStorage.getItem('tcolor');
  return (
    <div style={{backgroundColor: background === 'Dark' ? col  : headerMenu === 'Transparent' || headerMenu === 'Full Width Transparent' ? col : '#fff',
      color: background === 'Dark' ? '#fff' : headerMenu === 'Transparent' || headerMenu === 'Full Width Transparent' ?  '#fff' : tcol
    }} className={`  border-b border-gray-200 text-gray-400 text-sm`}>
      <div className={`${headerMenu === 'Full Width' || headerMenu === 'Full Width Transparent' ? 'mx-7' : 'container mx-auto'}  flex flex-col md:flex-row justify-between items-center  py-2`}>
        
        {/* Left Social Icons */}
        <div className="flex gap-4 mb-2 md:mb-0">
          <a href="https://twitter.com" className="hover:text-blue-500">
          <FaXTwitter/>
          </a>
          <a href="https://facebook.com" className="hover:text-blue-600">
            <FaFacebookF/>
          </a>
          <a href="https://linkedin.com" className="hover:text-blue-700">
            <FaLinkedinIn/>
          </a>
        </div>

        {/* Right Info Section */}
        <div style={{backgroundColor:background === 'Dark' && col ,
          color: background === 'Dark' ? '#fff' : headerMenu === 'Transparent' || headerMenu === 'Full Width Transparent' ? '#fff' : tcol,}} className={`flex flex-wrap justify-center gap-6 `}>
          <div className="flex items-center gap-2">
            <FiPhone style={{backgroundColor:background === 'Dark' && col ,
          color: background === 'Dark' ? '#fff' : headerMenu === 'Transparent' || headerMenu === 'Full Width Transparent' ? '#fff' : tcol,}} className={` cursor-pointer hover:text-[#61DCDF] text-lg`} />
            <span className="leading-relaxed cursor-pointer hover:text-[#61DCDF] tracking-wide">910278256818123</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMail style={{backgroundColor:background === 'Dark' && col ,
          color: background === 'Dark' ? '#fff' : headerMenu === 'Transparent' || headerMenu === 'Full Width Transparent' ? '#fff' : tcol,}} className={` cursor-pointer hover:text-[#61DCDF] text-lg`} />
            <span className="leading-relaxed cursor-pointer hover:text-[#61DCDF] tracking-wide">test@testmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock style={{backgroundColor:background === 'Dark' && col ,
          color: background === 'Dark' ? '#fff' : headerMenu === 'Transparent' || headerMenu === 'Full Width Transparent' ? '#fff' : tcol,}} className={`text-md`} />
            <span className="leading-relaxed tracking-wide">Mon - Friday :: 10:00 AM - 7:30 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
