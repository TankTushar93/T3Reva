// SidebarContext.js
import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {

  const DEFAULT_PRIMARY = "#4C6FFF";
  const DEFAULT_SECONDARY = "#61DCDF";
  const DEFAULT_TEXT = "#617798";
  const DEFAULT_TERTIARY = "#F43FE2";
  const DEFAULT_GRAY = "#9d9b9b";    // old color "#CDCBCB";

  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(() => localStorage.getItem("pcolor") || DEFAULT_PRIMARY);
  const [scolor, setScolor] = useState(() => localStorage.getItem("color") || DEFAULT_SECONDARY);
  const [textcolor, setTextcolor] = useState(() => localStorage.getItem("tcolor") || DEFAULT_TEXT);
  const [teriotarycolor, setTeriotarycolor] = useState(() => localStorage.getItem("tercolor") || DEFAULT_TERTIARY);
  const [graycolor, setGraycolor] = useState(() => localStorage.getItem("gcolor") || DEFAULT_GRAY);

  const [headerMenu, setHeaderMenu] = useState("Without Topbar");
  const [footerMenu, setFooterMenu] = useState("Large Footer");
  const [fontfamily, setFontfamily] = useState("Work Sans");
  const [layout, setLayout] = useState("Wide");
  const [background, setBackground] = useState("Light");

  const [searchVisible, setSearchVisible] = useState(true);
  const [languageVisible, setLanguageVisible] = useState(true);
  const [pageStripeVisible, setPageStripeVisible] = useState(true);


  useEffect(() => {
    localStorage.setItem("pcolor", color);
    localStorage.setItem("color", scolor);
    localStorage.setItem("tcolor", textcolor);
    localStorage.setItem("tercolor", teriotarycolor);
    localStorage.setItem("gcolor", graycolor);
  }, [color, scolor, textcolor, teriotarycolor, graycolor]);

  useEffect(() => {
    if (!localStorage.getItem("pcolor")) localStorage.setItem("pcolor", DEFAULT_PRIMARY);
    if (!localStorage.getItem("color")) localStorage.setItem("color", DEFAULT_SECONDARY);
    if (!localStorage.getItem("tcolor")) localStorage.setItem("tcolor", DEFAULT_TEXT);
    if (!localStorage.getItem("tercolor")) localStorage.setItem("tercolor", DEFAULT_TERTIARY);
    if (!localStorage.getItem("gcolor")) localStorage.setItem("gcolor", DEFAULT_GRAY);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen, setIsOpen,
        color, setColor,
        scolor, setScolor,
        textcolor, setTextcolor,
        teriotarycolor, setTeriotarycolor,
        graycolor, setGraycolor,
        headerMenu, setHeaderMenu,
        footerMenu, setFooterMenu,
        fontfamily, setFontfamily,
        layout, setLayout,
        background, setBackground,
        searchVisible, setSearchVisible,
        languageVisible, setLanguageVisible,
        pageStripeVisible, setPageStripeVisible,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
