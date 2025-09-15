import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { NavLink, Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useSidebar } from '../context/Sidebarcontext';
import Topbar from './Topbar';

const Navbar = () => {

    const { languageVisible, searchVisible, background, headerMenu } = useSidebar();
    const col = localStorage.getItem('color');
    const pcol = localStorage.getItem('pcolor');
    const gcol = localStorage.getItem('gcolor');
    const [navitems, setNavitems] = useState([]);
    const [hoveredChild, setHoveredChild] = useState(null);
    const [isopen, setIsopen] = useState(false);
    const [isopenf, setIsopenf] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openmobilesearch, setOpenmobilesearch] = useState(false);
    const [cross, setCross] = useState(false);

    useEffect(() => {
        fetch("https://t3-reva.t3planet.de/")
            .then((res) => res.json())
            .then((data) => {
                setNavitems(data.page.mainNavigation || []);
            })
            .catch((err) => console.log(err));
    }, []);
    const renderSubMenu = (children) => {
        return (
            <div className="ml-2 mt-3 flex flex-col gap-3">
                {children.map((child) => (
                    <div key={child.data.uid} className="flex flex-col">
                        <Link style={{ color: child.title === 'Basic elements' || child.title === 'Infographic elements' || child.title === 'Content elements' || child.title === 'Advanced elements' ? pcol : gcol }}
                            to={child.data.slug || child.link}
                            className={`${child.title === 'Basic elements' || child.title}  hover:text-black`}
                        >
                            {child.title}
                        </Link>

                        {child.children?.length > 0 && renderSubMenu(child.children)}
                    </div>
                ))}
            </div>
        );
    };


    return (

        <>
            {headerMenu !== 'Without Topbar' && headerMenu !== 'Full Width Without Topbar' &&
                <div className={`${headerMenu === 'Full Width' || headerMenu === 'Full Width Transparent' ? 'px-0' : 'px-26'} ${background === 'Dark' ? ' text-white' : headerMenu === 'Transparent' || headerMenu === 'Full Width Transparent' ? 'bg-[#61DCDF] ' : 'bg-white '} `}>
                    <Topbar />
                </div>}

            <nav style={{
                backgroundColor: background === 'Dark' ? col : headerMenu === 'Default' || headerMenu === 'Without Topbar' || headerMenu === 'Full Width' || headerMenu === 'Full Width Without Topbar' ? '#fff' : col,
                color: background === 'Dark' ? '#fff' : headerMenu === 'Default' || headerMenu === 'Without Topbar' || headerMenu === 'Full Width' || headerMenu === 'Full Width Without Topbar' ? 'black' : '#fff'

            }}
                className={`fixed top-0 left-0 w-full z-[9999] px-3 ${headerMenu === 'Full Width' || headerMenu === 'Full Width Without Topbar' || headerMenu === 'Full Width Transparent' ? 'px-0' : 'lg:px-21'} border-b border-white py-[29px] font-sans flex justify-between items-center hover:text-gray-800`}>

                <img src="https://t3-reva.t3planet.com/fileadmin/t3-reva/Logo/T3_Reva_Final_Logo.svg" className='cursor-pointer' alt="logo" />

                <div className=' hidden lg:flex gap-9 mr-4 justify-center items-center'>
                    {navitems.map((item) => (
                        <div key={item.data.uid} style={{
                            backgroundColor: background === 'Dark' ? col : headerMenu === 'Default' || headerMenu === 'Without Topbar' || headerMenu === 'Full Width' || headerMenu === 'Full Width Without Topbar' ? '#fff' : col,
                            color: background === 'Dark' ? '#fff' : headerMenu === 'Default' || headerMenu === 'Without Topbar' || headerMenu === 'Full Width' || headerMenu === 'Full Width Without Topbar' ? 'gray' : '#fff'
                        }}
                            className={`relative flex group gap-2 justify-center items-center   hover:text-black cursor-pointer `}>
                            <NavLink to={item.data.slug} className='cursor-pointer hover:text-black  font-normal'>
                                {item.title}
                            </NavLink>

                            {item.children && item.children.length > 0 && (
                                <p className='cursor-pointer flex justify-center items-center mt-[3px] transition group-hover:rotate-180 duration-500'>
                                    <IoIosArrowDown />
                                </p>
                            )}

                            {item.children && item.children.length > 0 && (
                                <div style={{
                                    backgroundColor: background === 'Light' ? '#fff' : col,
                                    color: background === 'Light' ? 'gray' : '#fff'
                                }}
                                    className={`absolute top-full hidden mr-14  group-hover:flex  z-50`}>
                                    {/*---------- {Check If ELements then w-full} -------------*/}
                                    {item.title === "Elements" ? (
                                        <div className={`mt-[33px]  border-t ${background === 'Light' ? 'border-gray-200 ' : 'border-t text-white border-white'}  w-[99.1vw]  shadow-md px-24 py-16 grid grid-cols-5 gap-9`}>
                                            {item.children.map((child) => (
                                                <div key={child.data.uid} className='flex flex-col  gap-3'>
                                                    <Link className='text-blue-400 font-bold' to={child.data.slug}>
                                                        {child.title}
                                                    </Link>
                                                    <div className='flex flex-col gap-3'>
                                                        {child.children?.map((sub) => (
                                                            <NavLink 
                                                                key={sub.data.uid}
                                                                to={sub.data.slug}
                                                                className={`relative inline-block ${background === 'Light' ? 'text-gray-500' : 'text-white'}  after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-500 after:w-0 after:origin-left after:transition-all after:duration-300 hover:after:w-25 hover:after:origin-right`}
                                                            >
                                                                {sub.title}
                                                            </NavLink>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className={`mt-[33px]  group ${background === 'Light' ? 'border-t border-gray-200' : 'border border-white'}  shadow-md px-6 w-48 py-6 flex flex-col gap-3`}>
                                            {item.children.map((child) => (
                                                <div
                                                    key={child.data.uid}
                                                    onMouseEnter={() => (child.title === 'Header' || child.title === 'Footer') && setHoveredChild(child.title)}
                                                    onMouseLeave={() => (child.title === 'Header' || child.title === 'Footer') && setHoveredChild(null)}
                                                    className='relative'
                                                >
                                                    <div className='flex group justify-between items-center'>
                                                        <Link
                                                            to={child.data.slug}
                                                            className={`relative inline-block ${background === 'Light' ? 'text-gray-500' : 'text-white'} after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-500 after:w-0 after:origin-left after:transition-all after:duration-300 hover:after:w-25 hover:after:origin-right`}
                                                        >
                                                            {child.title}
                                                        </Link>
                                                        {(child.title === 'Header' || child.title === 'Footer') && (
                                                            <MdKeyboardArrowRight className='w-5 group h-5 mt-[4px]' />
                                                        )}
                                                    </div>
                                                    {(hoveredChild === child.title && child.children?.length > 0) && (
                                                        <div style={{
                                                            backgroundColor: background === 'Light' ? '#fff' : col,
                                                            color: background === 'Light' ? 'black' : '#fff'
                                                        }}
                                                            className={`absolute   left-full top-0 mt-0  shadow-md  w-71  flex flex-col gap-3 p-4`}>
                                                            {child.children.map((sub) => (
                                                                <div className='' key={sub.data.uid}>
                                                                    <Link
                                                                        to={sub.data.slug}
                                                                        className={`relative inline-block ${background === 'Light' ? 'text-gray-500' : 'text-white'}  after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-500 after:w-0 after:origin-left after:transition-all after:duration-300 hover:after:w-25 hover:after:origin-right`}
                                                                    >
                                                                        <p className=''>{sub.title}</p>
                                                                    </Link>
                                                                </div>

                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className='flex gap-8'>

                        {searchVisible &&
                            <div className='flex relative justify-center items-center mt-1'>
                                {isopen ? <MdOutlineCancel onClick={() => setIsopen(!isopen)} className='h-[19px] cursor-pointer w-[19px]' /> : <FiSearch onClick={() => setIsopen(!isopen)} className='h-[19px] cursor-pointer w-[19px]' />}

                                {isopen &&
                                    <div className='absolute border border-gray-100 px-2 py-[7px] h-12  w-48 -left-40 bg-white  top-[52px]'>
                                        <div className='flex  justify-between items-center'>
                                            <input type="text" placeholder='Search...' className='px-2 py-1 text-black outline-none w-36 rounded bg-gray-100' />
                                            <FiSearch className='h-[20px] cursor-pointer w-[20px]' />
                                        </div>
                                    </div>
                                }
                            </div>
                        }


                        {languageVisible &&
                            <div className='flex relative justify-center items-center mt-1'>
                                <img onClick={() => setIsopenf(!isopenf)} src="https://t3-reva.vercel.app/_next/static/media/US.89d51ae2.png" className='h-5 w-5 cursor-pointer' alt="lang" />

                                {isopenf &&
                                    <div className='absolute border-t border-gray-200 w-11  px-2 py-[17px] h-24 shadow-sm bg-white  top-[52px]'>
                                        <div className='flex flex-col gap-5 justify-between items-center'>
                                            <img src="https://t3-reva.vercel.app/_next/static/media/US.89d51ae2.png" className='h-5 w-5 cursor-pointer' alt="lang" />
                                            <img src="https://t3-reva.vercel.app/_next/static/media/DE.e6358f84.png" className='h-5 w-5 cursor-pointer' alt="lang" />
                                        </div>
                                    </div>
                                }
                            </div>
                        }



                    </div>
                </div>

                {/*------------------- MObile menus ---------------------*/}
                <div className='flex  lg:hidden'>
                    <div className='flex relative justify-center items-center gap-3'>
                        {openmobilesearch ? <MdOutlineCancel onClick={() => setOpenmobilesearch(!openmobilesearch)} className='h-[20px] cursor-pointer w-[20px]' /> : <FiSearch onClick={() => setOpenmobilesearch(!openmobilesearch)} className='h-[19px] cursor-pointer w-[19px]' />}
                        {openmobilesearch &&
                            <div className='absolute border border-gray-100 px-2 py-[7px] h-12 w-65 -left-60 bg-white  top-[55px]'>
                                <div className='flex justify-between items-center'>
                                    <input type="text" placeholder='Search...' className='px-2 py-1 outline-none text-black w-70 rounded bg-gray-100' />
                                    <FiSearch className='h-[20px] cursor-pointer w-[20px]' />
                                </div>
                            </div>
                        }
                        {cross ? <RxCross2 onClick={() => { setMobileMenu(!mobileMenu); setCross(!cross) }} className='h-[23px] w-[23px] cursor-pointer 
                        transition-all duration-200 ease-in-out 
                        transform   rotate-90 scale-110' /> : <AiOutlineMenu onClick={() => { setMobileMenu(!mobileMenu); setCross(!cross) }} className='h-[23px]  cursor-pointer w-[23px]' />}
                    </div>
                </div>
            </nav>


            {/*----------------- Mobile View ------------------*/}
            <div
                className={`fixed z-[9999] block w-full lg:hidden top-[89px] left-0 h-74 overflow-y-auto bg-white shadow-sm transform transition-transform duration-300 ${mobileMenu ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Menu Items */}
                <ul className="flex flex-col px-6 py-3 gap-4">
                    {navitems.map((item) => (
                        <li key={item.data.uid} className="flex flex-col">
                            <div
                                className="flex w-full justify-between items-center cursor-pointer text-gray-600 hover:text-black"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === item.title ? null : item.title)
                                }
                            >
                                <span className=''>{item.title}</span>
                                {item.children?.length > 0 && (
                                    <IoIosArrowDown
                                        className={`transition-transform ${openDropdown === item.title ? "rotate-180" : ""
                                            }`}
                                    />
                                )}
                            </div>

                            {/*---------------- Dropdown -----------------*/}
                            {openDropdown === item.title &&
                                item.children?.length > 0 &&
                                renderSubMenu(item.children)}
                        </li>
                    ))}

                    {/* Language Switcher */}
                    <img
                        src="https://t3-reva.vercel.app/_next/static/media/US.89d51ae2.png"
                        className="h-5 w-5 cursor-pointer"
                        alt="lang"
                    />
                </ul>
            </div>

        </>
    )
}

export default Navbar;
