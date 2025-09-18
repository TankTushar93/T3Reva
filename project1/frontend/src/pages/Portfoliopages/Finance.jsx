import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/Sidebarcontext';
import { lighten } from 'polished';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Sidebar from '../../Components/Sidebar/Sidebar';
const Finance = () => {
    const { background, pageStripeVisible } = useSidebar();
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
            <div className={`px-4 relative flex flex-col ${background === 'Light' ? 'bg-white' : 'bg-[#61DCDF]'
                } justify-center items-center text-center py-22`}></div>
        );
    }

    return (

        <>
            <Navbar />
            <Sidebar />

            <div style={{ backgroundColor: background === 'Light' ? '#fff' : col }}
                className={`px-28 text-left relative z-10 flex flex-col  justify-center  py-22`}
            >
                {pageStripeVisible && background === "Light" &&
                    <div className="pointer-events-none hidden lg:block absolute inset-0 mx-auto w-full max-w-7xl z-[-1]">
                        <div className="absolute top-0 bottom-0 -left-10 w-px bg-gray-200 -z-10"></div>
                        <div className="absolute top-0 bottom-0 left-110 w-px bg-gray-200 z-0"></div>
                        <div className="absolute top-0 bottom-0 right-91 w-[0.5px] bg-gray-200 z-0"></div>
                    </div>}


                <h1
                    style={{ color: background === 'Dark' ? '#fff' : col }}
                    className="text-[64px] font-extrabold"
                >
                    How Buy Now, Pay Later Could Transform Traditional B2B Trade Finance Models
                </h1>

                <div className="flex  items-center  text-gray-500 text-sm mb-5">
                    <span className="flex justify-center gap-1 text-md items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Last updated on December 5, 2023
                    </span>
                    <span className="flex items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className=''> Admin</p>
                    </span>

                </div>

                <img className='mt-12 w-full h-full' src="https://t3-reva.t3planet.de/fileadmin/_processed_/1/2/csm_Corporate_7_efb1272534.jpg" alt="" />

                <div className='flex gap-3 mt-20'>
                    <span className="text-blue-500 text-center bg-gray-100 py-1 px-3 text-md cursor-pointer hover:bg-blue-500 hover:text-white  mb-10">
                        information
                    </span>
                    <span className="text-blue-500 text-center bg-gray-100  px-3 text-md py-1 cursor-pointer hover:bg-blue-500 hover:text-white mb-10">
                        computer
                    </span>
                    <span className="text-blue-500 text-center bg-gray-100 px-3 text-md py-1 cursor-pointer hover:bg-blue-500 hover:text-white mb-10">
                        galext
                    </span>
                </div>


                <p className='text-gray-500 text-lg'>Globally incubate standards compliant channels before scalable benefits. Quickly disseminate superior deliverables whereas web-enabled applications. Quickly drive clicks-and-mortar catalysts for change before vertical architectures. Credibly reintermediate backend ideas for cross-platform models. Holistically foster superior methodologies without market-driven best practices.</p>

                <div className='mt-4 '>
                    <span className='text-2xl text-cyan-400 '>The subtle tricks</span>
                    <p className='text-gray-500 text-lg mt-4'>Progressively maintain extensive infomediaries via extensible niches. Dramatically disseminate standardized metrics after resource-leveling processes. Objectively pursue diverse catalysts for change for interoperable meta-services. Distinctively re-engineer revolutionary meta-services and premium architectures. Intrinsically incubate intuitive opportunities and real-time potentialities. Appropriately communicate one-to-one technology.</p>
                    <p className='text-gray-500 text-lg mt-2'>Dynamically reinvent market-driven opportunities and ubiquitous interfaces. Energistically fabricate an expanded array of niche markets through robust products. Appropriately implement visionary e-services vis-a-vis strategic web-readiness.</p>
                </div>

                <div className='mt-4 '>
                    <span className='text-2xl text-cyan-400 '>The best option</span>
                    <p className='text-gray-500 text-lg mt-4'>Objectively pursue diverse catalysts for change for interoperable meta-services. Distinctively re-engineer revolutionary meta-services and premium architectures. Intrinsically incubate intuitive opportunities and real-time potentialities. Appropriately communicate one-to-one technology.</p>
                    <p className='text-gray-500 text-lg mt-2'>Quickly drive clicks-and-mortar catalysts for change before vertical architectures. Credibly reintermediate backend ideas for cross-platform models. Holistically foster superior methodologies without market-driven best practices.</p>
                </div>

                <div className="flex justify-center items-center py-6 px-4 md:px-0">
                    <div className="w-full p-10 bg-white  border-l-2 border-l-blue-500">
                        <blockquote className="relative italic text-left font-serif text-lg text-gray-500">
                            <span className="absolute left-0 -top-1 text-5xl text-blue-500 font-extrabold -ml-4">"</span>
                            <p className="ml-8 text-xl">
                                Life is like a box of chocolates. You never know what you're going to get.
                                <br />
                                Forrest Gump
                            </p>
                        </blockquote>
                    </div>
                </div>

                <div className='mt-4 '>
                    <span className='text-2xl text-cyan-400 '>Definition of success</span>
                    <p className='text-gray-500 text-lg mt-4'>Dynamically reinvent market-driven opportunities and ubiquitous interfaces. Energistically fabricate an expanded array of niche markets through robust products. Appropriately implement visionary e-services vis-a-vis strategic web-readiness.</p>
                    <p className='text-gray-500 text-lg mt-2'>Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.</p>
                </div>

                <div className='mt-4 '>
                    <span className='text-2xl text-cyan-400 '>Make it easy</span>
                    <p className='text-gray-500 text-lg mt-4'>Progressively maintain extensive infomediaries via extensible niches. Dramatically disseminate standardized metrics after resource-leveling processes. Objectively pursue diverse catalysts for change for interoperable meta-services. Distinctively re-engineer revolutionary meta-services and premium architectures. Intrinsically incubate intuitive opportunities and real-time potentialities. Appropriately communicate one-to-one technology.</p>
                    <p className='text-gray-500 text-lg mt-2'>Dynamically reinvent market-driven opportunities and ubiquitous interfaces. Energistically fabricate an expanded array of niche markets through robust products. Appropriately implement visionary e-services vis-a-vis strategic web-readiness.</p>
                </div>

                <div className='mt-4 '>
                    <span className='text-2xl text-cyan-400 '>Impress your audience</span>
                    <p className='text-gray-500 text-lg mt-4'>Dynamically reinvent market-driven opportunities and ubiquitous interfaces. Energistically fabricate an expanded array of niche markets through robust products. Appropriately implement visionary e-services vis-a-vis strategic web-readiness.</p>
                    <p className='text-gray-500 text-lg mt-2'>Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.</p>
                </div>

                <div className='mt-4 '>
                    <span className='text-2xl text-cyan-400 '>Match your brand</span>
                    <p className='text-gray-500 text-lg mt-4'>Globally incubate standards compliant channels before scalable benefits. Quickly disseminate superior deliverables whereas web-enabled applications. Quickly drive clicks-and-mortar catalysts for change before vertical architectures. Credibly reintermediate backend ideas for cross-platform models. Holistically foster superior methodologies without market-driven best practices.</p>
                    <p className='text-gray-500 text-lg mt-2'>Objectively integrate enterprise-wide strategic theme areas with functionalized infrastructures. Interactively productize premium technologies whereas interdependent quality vectors. Rapaciously utilize enterprise experiences via 24/7 markets. Uniquely matrix economically sound value through cooperative technology. Competently parallel task fully researched data and enterprise process improvements.</p>
                    <p className='text-gray-500 text-lg mt-2'>Progressively maintain extensive infomediaries via extensible niches. Dramatically disseminate standardized metrics after resource-leveling processes. Objectively pursue diverse catalysts for change for interoperable meta-services. Distinctively re-engineer revolutionary meta-services and premium architectures. Intrinsically incubate intuitive opportunities and real-time potentialities. Appropriately communicate one-to-one technology.</p>
                </div>


                <div className="flex justify-center items-center py-6 px-4 md:px-0">
                    <div className="w-full p-10 bg-white  border-l-2 border-l-blue-500">
                        <blockquote className="relative italic text-left font-serif text-lg text-gray-500">
                            <span className="absolute left-0 -top-1 text-5xl text-blue-500 font-extrabold -ml-4">"</span>
                            <p className="ml-8 text-xl">
                                That’s one small step for a man, one giant leap for mankind.
                                <br />
                                Neil Armstrong
                            </p>
                        </blockquote>
                    </div>
                </div>

                <div className='mt-4 '>
                    <span className='text-2xl text-cyan-400 '>Create the site you want</span>
                    <p className='text-gray-500 text-lg mt-4'>Objectively pursue diverse catalysts for change for interoperable meta-services. Distinctively re-engineer revolutionary meta-services and premium architectures. Intrinsically incubate intuitive opportunities and real-time potentialities. Appropriately communicate one-to-one technology.</p>
                    <p className='text-gray-500 text-lg mt-2'>Quickly drive clicks-and-mortar catalysts for change before vertical architectures. Credibly reintermediate backend ideas for cross-platform models. Holistically foster superior methodologies without market-driven best practices.</p>
                </div>

                <div className='mt-4 '>
                    <span className='text-2xl text-cyan-400 '>Solve any issue</span>
                    <p className='text-gray-500 text-lg mt-4'>Dynamically reinvent market-driven opportunities and ubiquitous interfaces. Energistically fabricate an expanded array of niche markets through robust products. Appropriately implement visionary e-services vis-a-vis strategic web-readiness.</p>
                    <p className='text-gray-500 text-lg mt-2'>Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.</p>
                    <p className='text-gray-500 text-lg mt-2'>Objectively integrate enterprise-wide strategic theme areas with functionalized infrastructures. Interactively productize premium technologies whereas interdependent quality vectors. Rapaciously utilize enterprise experiences via 24/7 markets. Uniquely matrix economically sound value through cooperative technology. Competently parallel task fully researched data and enterprise process improvements.</p>
                    <p className='text-gray-500 text-lg mt-2'>Progressively maintain extensive infomediaries via extensible niches. Dramatically disseminate standardized metrics after resource-leveling processes. Objectively pursue diverse catalysts for change for interoperable meta-services. Distinctively re-engineer revolutionary meta-services and premium architectures. Intrinsically incubate intuitive opportunities and real-time potentialities. Appropriately communicate one-to-one technology.</p>
                </div>


                 <form className='ml-160 mt-30'>
          <h3 style={{ color: background === 'Dark' ? '#fff' : col }} className={`font-bold  mb-4`}>
            
          </h3>

          
              <div className="flex flex-col sm:flex-row border p-1 bg-white border-gray-200 overflow-hidden w-full ">
                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Enter your email"
                  
                  value=""
                  required
                  style={{color: tcol }}
                  className="flex-1 px-4  py-3 outline-none text-sm sm:text-base w-full"
                />

                {/* Submit Button */}
                <button style={{backgroundColor: pcol,
                  borderColor:pcol
                }}
                  className="w-full sm:w-auto px-5 py-3 text-center relative cursor-pointer overflow-hidden border hover:text-blue-500 text-white font-medium text-sm sm:text-base group"
                  type="submit"
                >
                  Subscribe
                  <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-out hover:text-blue-500 group-hover:translate-y-0"></span>
                </button>
              </div>


              <label className="mt-3 flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1" required />
                <span style={{color:background === "Light" ? tcol : "#fff"}} className={` font-medium `}>
                 I agree to my email being stored and used to receive the newsletter.
                </span>
              </label>
            
        </form>

            </div>

            <Footer />
        </>
    );
};

export default Finance;
