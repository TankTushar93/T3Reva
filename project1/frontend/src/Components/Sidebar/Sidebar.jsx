import { useSidebar } from "../../context/Sidebarcontext";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { HexColorPicker } from "react-colorful";
const Sidebar = () => {

    const 
    {
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
    } = useSidebar();
    const col = localStorage.getItem('color')
    // const [color, setColor] = useState('#4C6FFF');
    // const [scolor, setScolor] = useState('#61DCDF');
    // const [textcolor, setTextcolor] = useState('#617798');
    // const [teriotarycolor, setTeriotarycolor] = useState('#F43FE2');
    // const [graycolor, setGraycolor] = useState('#CDCBCB');
    // const [headerMenu, setHeaderMenu] = useState('Without Topbar');
    // const [footerMenu, setFooterMenu] = useState('Large Footer');
    // const [fontfamily, setFontfamily] = useState('Work Sans');

    // const [layout, setLayout] = useState('Wide');
    // const [background, setBackground] = useState('Light');
    // const [searchVisible, setSearchVisible] = useState(true);
    // const [languageVisible, setLanguageVisible] = useState(true);
    // const [pageStripeVisible, setPageStripeVisible] = useState(true);

   

    const buttonStyle = (active) =>
        `px-3 py-1.5 rounded text-sm cursor-pointer font-light ${!active ? 'bg-black text-white' : 'bg-white text-black'
        }`;

        


    const onReset = () =>{
        setColor('#4C6FFF');
        setScolor('#61DCDF');
        setTextcolor('#617798');
        setTeriotarycolor('#F43FE2');
        setGraycolor('#CDCBCB');
        setHeaderMenu('Without Topbar');
        setFooterMenu('Large Footer');
        setFontfamily('Work Sans');
        setLayout('Wide');
        setBackground('Light');
        setSearchVisible(true);
        setLanguageVisible(true);
        setPageStripeVisible(true);
    }
    
    
    // useEffect(()=>{
    //     localStorage.setItem('color',scolor);
    // },[scolor])

    const onsubmit = () => {
        setColor(color);
        setTextcolor(textcolor);
        setTeriotarycolor(teriotarycolor);
        setGraycolor(graycolor);
        setHeaderMenu(headerMenu);
        setFooterMenu(footerMenu);
        setFontfamily(fontfamily);
        setLayout(layout);
        setBackground(background);
        setSearchVisible(searchVisible);
        setLanguageVisible(languageVisible);
        setPageStripeVisible(pageStripeVisible);
        setIsOpen(!isOpen);
    }

    return (
        <div
            className={`fixed top-0 left-0 h-full hidden  md:flex z-[9999] transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-[308px]"}`}
        >
            {/* Sidebar panel */}
            <div className="w-77 bg-[#002348] shadow-lg overflow-y-scroll h-full relative">

                <div className="p-7">
                    <h2 className="text-[15px] text-white font-medium">Theme color</h2>
                    {/*---------------- colors ----------------- */}
                    <div className="mt-3 space-y-1">
                        <p className="text-[#CDCBCB] text-sm">Primary Color</p>
                        <div className="bg-white w-full   rounded shadow-sm inline-flex items-center space-x-3">
                            <div className="border-r rounded bg-gray-100 px-2 border-gray-200 pr-[5px] py-2">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-5 h-6 border-none rounded cursor-pointer"
                                />
                            </div>
                            <input type="text" onChange={(e) => setColor(e.target.value)} className="text-sm outline-none text-gray-600" value={color}></input>
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <p className="text-[#CDCBCB] text-sm">Secondary Color</p>
                        <div className="bg-white w-full   rounded shadow-sm inline-flex items-center space-x-3">
                            <div className="border-r rounded bg-gray-100 px-2 border-gray-200 pr-[5px] py-2">
                                <input
                                    type="color"
                                    value={scolor}
                                    onChange={(e)=>setScolor(e.target.value)}
                                    className="w-5 h-6 border-none rounded cursor-pointer"
                                />
                            </div>
                            <input type="text" onChange={(e) => setScolor(e.target.value)} className="text-sm outline-none text-gray-600" value={scolor}></input>
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <p className="text-[#CDCBCB] text-sm">Text Color</p>
                        <div className="bg-white w-full   rounded shadow-sm inline-flex items-center space-x-3">
                            <div className="border-r rounded bg-gray-100 px-2 border-gray-200 pr-[5px] py-2">
                                <input
                                    type="color"
                                    value={textcolor}
                                    onChange={(e) => setTextcolor(e.target.value)}
                                    className="w-5 h-6 border-none rounded cursor-pointer"
                                />
                            </div>
                            <input type="text" onChange={(e) => setTextcolor(e.target.value)} className="text-sm outline-none text-gray-600" value={textcolor}></input>
                        </div>
                    </div>

                    <div className="mt-3 space-y-1 ">
                        <p className="text-[#CDCBCB] text-sm">Teritory Color</p>
                        <div className="bg-white w-full  rounded shadow-sm inline-flex items-center space-x-3">
                            <div className="border-r rounded bg-gray-100 px-2 border-gray-200 pr-[5px] py-2">
                                <input
                                    type="color"
                                    value={teriotarycolor}
                                    onChange={(e) => setTeriotarycolor(e.target.value)}
                                    className="w-5 h-6 border-none rounded cursor-pointer"
                                />
                            </div>
                            <input type="text" onChange={(e) => setTeriotarycolor(e.target.value)} className="text-sm outline-none text-gray-600" value={teriotarycolor}></input>
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <p className="text-[#CDCBCB] text-sm">Gray Color</p>
                        <div className="bg-white w-full  rounded shadow-sm inline-flex items-center space-x-3">
                            <div className="border-r rounded bg-gray-100 px-2  border-gray-200 pr-[5px] py-2">
                                <input
                                    type="color"
                                    value={graycolor}
                                    onChange={(e) => setGraycolor(e.target.value)}
                                    className="w-5 h-6 border-none rounded cursor-pointer"
                                />
                            </div>
                            <input type="text" onChange={(e) => setGraycolor(e.target.value)} className="text-sm outline-none text-gray-600" value={graycolor}></input>
                        </div>
                    </div>

                    {/* --------------- Header Footer Font Family -------------------- */}
                    <div className="mt-3 space-y-1">
                        <p className="text-[#CDCBCB] text-sm">Header Menu</p>
                        <div className="bg-white w-full   rounded shadow-sm inline-flex items-center space-x-3">
                            <div className="  px-2 border-gray-200 pr-[4px] py-2">
                                <select onChange={(e) => setHeaderMenu(e.target.value)} value={headerMenu} className="w-54 outline-none text-sm">
                                    <option  value='Default' className="flex outline-none justify-between w-full ">Default</option>
                                    <option  value='Transparent' className="flex outline-none justify-between w-full ">Transparent</option>
                                    <option  value='Without Topbar' className="flex outline-none justify-between w-full ">Without Topbar</option>
                                    <option  value='Full Width' className="flex outline-none justify-between w-full ">Full Width</option>
                                    <option  value='Full Width Transparent' className="flex outline-none justify-between w-full ">Full Width Transparent</option>
                                    <option  value='Full Width Without Topbar' className="flex outline-none justify-between w-full ">Full Width Without Topbar</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="mt-3 space-y-1">
                        <p className="text-[#CDCBCB] text-sm">Footer Menu</p>
                        <div className="bg-white w-full rounded shadow-sm inline-flex items-center space-x-3">
                            <div className="  px-2 border-gray-200 pr-[4px] py-2">
                                <select className="w-54 outline-none text-sm" onChange={(e) => setFooterMenu(e.target.value)} value={footerMenu}>
                                    <option  className="flex outline-none justify-between w-full" value='Large Footer'>Large Footer</option>
                                    <option  value='Medium Footer' className="flex outline-none justify-between w-full ">Medium Footer</option>
                                    <option  value='Small Footer' className="flex outline-none justify-between w-full ">Small Footer</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-5">
                        {/* Font Family Selector */}
                        <div className="mt-3 space-y-1">
                            <p className="text-[#CDCBCB] text-sm">Main Font Family</p>
                            <div className="bg-white w-full rounded shadow-sm inline-flex items-center space-x-3">
                                <div className="px-2 border-gray-200 pr-[4px] py-2">
                                    <select
                                        className="w-54 outline-none text-sm"
                                        value={fontfamily}
                                        onChange={(e) => setFontfamily(e.target.value)}
                                    >
                                        <option value="Work Sans">Work Sans</option>
                                        <option value="Playfair">Playfair</option>
                                        <option value="Custome Font">Custome Font</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Google Fonts Config (only if "Custome Font" is selected) */}
                        {fontfamily === 'Custome Font' && (
                            <div className="space-y-3  rounded-md">
                                <p className="text-[#CDCBCB] text-sm">Google Font (Without `https://fonts.googleapis.com/css2`)</p>
                                <textarea rows={6}
                                    className="w-full p-2 text-[#617798] bg-[#f8f8f8] border border-[#e7e7e7] text-sm"
                                    placeholder="?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
                                />

                                <p className="text-[#CDCBCB] font-bold text-sm">CSS rules to specify families (Without `font-family:`)</p>
                                <input
                                    type="text"
                                    className="w-full p-2 text-[#617798] bg-[#f8f8f8] text-sm"
                                    placeholder="Poppins"
                                />

                                <button onClick={() => window.open('https://fonts.google.com/')} className="mt-2 px-1 items-center cursor-pointer py-2 flex text-white w-60 gap-2  text-md">
                                    Select From Google Fonts <span>
                                        <FaArrowRightLong className="h-5 w-5 text-blue-700" />
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/*------------ Toggle bars -----------------*/}

                    <div className="space-y-3 mt-3  rounded-md text-[#CDCBCB]">
                        {/* Layout Switcher */}
                        <div>
                            <p className="mb-1.5 text-sm">Layouts Switcher</p>
                            <div className="flex space-x-2">
                                <button
                                    className={buttonStyle(layout === 'Wide')}
                                    onClick={() => setLayout('Wide')}
                                >
                                    Wide
                                </button>
                                <button
                                    className={buttonStyle(layout === 'Boxed')}
                                    onClick={() => setLayout('Boxed')}
                                >
                                    Boxed
                                </button>
                            </div>
                        </div>

                        {/* Background Color */}
                        <div>
                            <p className="mb-1.5 text-sm">Background Color</p>
                            <div className="flex space-x-2">
                                <button
                                    className={buttonStyle(background === 'Light')}
                                    onClick={() => setBackground('Light')}
                                >
                                    Light
                                </button>
                                <button
                                    className={buttonStyle(background === 'Dark')}
                                    onClick={() => setBackground('Dark')}
                                >
                                    Dark
                                </button>
                            </div>
                        </div>

                        {/* Search Type */}
                        <div>
                            <p className="mb-1.5 text-sm">Search Type</p>
                            <div className="flex space-x-2">
                                <button
                                    className={buttonStyle(searchVisible)}
                                    onClick={() => setSearchVisible(true)}
                                >
                                    Show
                                </button>
                                <button
                                    className={buttonStyle(!searchVisible)}
                                    onClick={() => setSearchVisible(false)}
                                >
                                    Hide
                                </button>
                            </div>
                        </div>

                        {/* Language Type */}
                        <div>
                            <p className="mb-1.5 text-sm">Language Type</p>
                            <div className="flex space-x-2">
                                <button
                                    className={buttonStyle(languageVisible)}
                                    onClick={() => setLanguageVisible(true)}
                                >
                                    Show
                                </button>
                                <button
                                    className={buttonStyle(!languageVisible)}
                                    onClick={() => setLanguageVisible(false)}
                                >
                                    Hide
                                </button>
                            </div>
                        </div>

                        {/* Page Stripe */}
                        <div>
                            <p className="mb-1.5 text-sm">Page Stripe</p>
                            <div className="flex space-x-2">
                                <button
                                    className={buttonStyle(pageStripeVisible)}
                                    onClick={() => setPageStripeVisible(true)}
                                >
                                    Show
                                </button>
                                <button
                                    className={buttonStyle(!pageStripeVisible)}
                                    onClick={() => setPageStripeVisible(false)}
                                >
                                    Hide
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="absolute py-6 gap-2 left-0 mt-8 flex justify-center items-center border-t border-white w-full">
                        <button className=" px-3 py-1 rounded relative cursor-pointer overflow-hidden border-1 border-white bg-[#4C6FFF] text-white font-medium text-md group">
                            <span onClick={()=>onsubmit()} className="relative z-10 transition-colors font-semibold duration-500 group-hover:text-white">
                                Submit
                            </span>
                            <span className="absolute inset-0 bg-[#002348] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                        </button>
                        <button onClick={()=>onReset()} className=" px-3 py-1 rounded relative cursor-pointer overflow-hidden border-1 border-white bg-[#4C6FFF] text-white font-medium text-md group">
                            <span className="relative z-10 transition-colors font-semibold duration-500 group-hover:text-white">
                                Reset
                            </span>
                            <span className="absolute inset-0 bg-[#002348] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                        </button>
                    </div>

                </div>
            </div>

            {/* Buttons – always visible */}
            <div className="flex flex-col gap-[2px] mt-74">
                <button style={{backgroundColor: background === 'Light' ? '#002348' : '#fff',
                color:background === 'Light' ? '#fff' : col}}
                    onClick={() => setIsOpen(!isOpen)}
                    className={` cursor-pointer  px-3 py-3 w-10 rounded-r`}
                >
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                </button>

                <button style={{backgroundColor: background === 'Light' ? '#002348' : '#fff',
                color:background === 'Light' ? '#fff' : col}}
                    onClick={() => window.location.reload()}
                    className={` cursor-pointer  px-3 py-3 w-10 rounded-r`}
                >
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
