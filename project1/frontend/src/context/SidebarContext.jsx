// SidebarContext.js
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState('#4C6FFF');
    const [scolor, setScolor] = useState(() => {const savedValue = localStorage.getItem("color");return savedValue ?? "#61DCDF";});
    const [textcolor, setTextcolor] = useState('#617798');
    const [teriotarycolor, setTeriotarycolor] = useState('#F43FE2');
    const [graycolor, setGraycolor] = useState('#CDCBCB');
    const [headerMenu, setHeaderMenu] = useState('Without Topbar');
    const [footerMenu, setFooterMenu] = useState('Large Footer');
    const [fontfamily, setFontfamily] = useState('Work Sans');

    const [layout, setLayout] = useState('Wide');
    const [background, setBackground] = useState('Light');
    const [searchVisible, setSearchVisible] = useState(true);
    const [languageVisible, setLanguageVisible] = useState(true);
    const [pageStripeVisible, setPageStripeVisible] = useState(true);

     useEffect(()=>{
        localStorage.setItem('color',scolor);
    },[scolor]);

      useEffect(() => {
    if (!localStorage.getItem("color")) {
      localStorage.setItem("color", scolor);
    }
  }, []);


  return (
    <SidebarContext.Provider value={{ 
     isOpen, setIsOpen ,
     color, setColor , 
     textcolor, setTextcolor ,
     scolor, setScolor ,
     teriotarycolor, setTeriotarycolor,
     graycolor, setGraycolor ,
     headerMenu, setHeaderMenu,
     footerMenu, setFooterMenu,
     fontfamily, setFontfamily,
     layout, setLayout,
     background, setBackground,
     searchVisible, setSearchVisible,
     languageVisible, setLanguageVisible,
     pageStripeVisible, setPageStripeVisible
     }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
