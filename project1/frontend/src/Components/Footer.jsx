import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { useSidebar } from "../context/Sidebarcontext";

const Footer = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem('color')
  const [email, setEmail] = useState("");
  const [footeritems, setFooteritems] = useState([]);
  const [section, setSection] = useState(null);
  const [aboutMenu, setAboutMenu] = useState({ header: "", menu: [] });
  const [resourcesMenu, setResourcesMenu] = useState({ header: "", menu: [] });
  const [newsletter, setNewsletter] = useState({
    header: "",
    submitLabel: "Subscribe",
    elements: [],
    link: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/")
      .then((res) => res.json())
      .then((data) => {
        setFooteritems(data.page.footerNavigation || []);

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

        // ✅ Logo + Text
        const headingData = findById(data, 2289);
        const logo =
          headingData?.content?.gallery?.rows[1]?.columns[1]?.publicUrl;

        const title = findById(data, 2324);
        const bodytext = title?.content?.bodytext || "";
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = bodytext;
        const p = tempDiv.querySelector("p")?.innerText || "";
        setSection({ logo, p });

        // ✅ About Menu
        const aboutData = findById(data, 2326);
        setAboutMenu({
          header: aboutData?.content?.header || "About",
          menu: aboutData?.content?.menu || [],
        });

        // ✅ Resources Menu
        const resourcesData = findById(data, 2327);
        setResourcesMenu({
          header: resourcesData?.content?.header || "Resources",
          menu: resourcesData?.content?.menu || [],
        });

        // ✅ Newsletter Form
        const newsletterData = findById(data, 2328);
        setNewsletter({
          header: newsletterData?.content?.form_additional?.header || "Newsletter",
          submitLabel:
            newsletterData?.content?.form_additional?.renderingOptions
              ?.submitButtonLabel || "Subscribe",
          elements: newsletterData?.content?.form?.elements || [],
          link: newsletterData?.content?.link?.href || "",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  // Skeleton Loader Component
 if(loading){
  return (
    <div className="h-80 w-full bg-white"></div>
  )
 }
  return (
    <footer style={{backgroundColor:background === 'Light' ? '#fff' : col,
      color: background === 'Light' ?  'gray' : '#fff'
    }} className={`  px-6 md:px-16 lg:px-18 xl:px-24 pt-8`}>
      {/* Top Links */}
      <div className="grid grid-cols-1 lg:flex flex-wrap justify-between items-center lg:border-b border-gray-200 lg:pb-6 text-sm gap-2 lg:gap-4">
        <div className="grid grid-cols-1 gap-3 lg:flex lg:gap-6">
          { footeritems.map((item) => (
              <NavLink
                to={item?.data?.slug}
                key={item?.data?.uid}
                className={`grid grid-cols-1 cursor-pointer ${background === 'Light' ? 'text-gray-500' : 'text-white'}  md:flex leading-relaxed tracking-wide text-[15px] flex-wrap gap-4 lg:gap-6 cursor-pointer relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-500 after:w-0 after:origin-left after:transition-all after:duration-300 hover:after:w-16 hover:after:origin-right`}
              >
                {item?.title}
              </NavLink>
            ))}
        </div>

        <div className={`flex gap-8 lg:gap-6 mt-5 md:mt-3 ${background === 'Light' ? 'text-black' : 'text-white '} text-lg`}>
          <Link target="blank" to="https://twitter.com/">
            <FaXTwitter className="hover:text-blue-500" />
          </Link>
          <Link target="blank" to="https://facebook.com/">
             <FaFacebookF className="hover:text-blue-500" />
          </Link>
          <Link target="blank" to="https://linkedin.com/">
            <FaLinkedinIn className="hover:text-blue-500" />
          </Link>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_2.5fr] gap-10 py-7 lg:py-20">
        {/* Logo & Text */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
             <img src={section?.logo} alt="" />
          </h2>
          
            <p className={`${background === 'Light' ? 'text-gray-500' : 'text-white'} leading-relaxed tracking-wide text-[18px]`}>
              {section?.p}
            </p>
          
        </div>

        {/* About */}
        <div>
          <h3 style={{ color: background === 'Dark' ? '#fff' : col }} className={`font-bold  mb-4`}>
            { aboutMenu.header}
          </h3>
          <ul className="space-y-4">
            {aboutMenu.menu.map((item, i) => (
                <li key={i}>
                  <a href={item.link} className="cursor-pointer relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-500 after:w-0 after:origin-left after:transition-all after:duration-300 hover:after:w-25 hover:after:origin-right">
                    {item.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 style={{ color: background === 'Dark' ? '#fff' : col }} className={`font-bold  mb-4`}>
            { resourcesMenu.header}
          </h3>
          <ul className="space-y-4">
            {resourcesMenu.menu.map((item, i) => (
                <li key={i}>
                  <a href={item.link} className="cursor-pointer relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-500 after:w-0 after:origin-left after:transition-all after:duration-300 hover:after:w-25 hover:after:origin-right">
                    {item.title}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        {/* Newsletter */}
        <form onSubmit={handleSubmit}>
          <h3 style={{ color: background === 'Dark' ? '#fff' : col }} className={`font-bold  mb-4`}>
            { newsletter.header}
          </h3>

          
              <div className="flex flex-col sm:flex-row border p-1 bg-white border-gray-200 overflow-hidden w-full max-w-md mx-auto">
                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="flex-1 px-4 text-gray-600 py-3 outline-none text-sm sm:text-base w-full"
                />

                {/* Submit Button */}
                <button
                  className="w-full sm:w-auto px-5 py-3 text-center relative cursor-pointer overflow-hidden border border-blue-500 bg-blue-500 text-white font-medium text-sm sm:text-base group"
                  type="submit"
                >
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-blue-600">
                    {newsletter.submitLabel}
                  </span>
                  <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
                </button>
              </div>


              <label className="mt-3 flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1" required />
                <span className={`${background === 'Light' ? 'text-gray-500' : 'text-white'} font-medium `}>
                  {newsletter.elements.find((el) => el.type === "Checkbox")?.label}
                </span>
              </label>
            
        </form>
      </div>

      {/* Bottom Bar */}
      
        <div className="border-t border-gray-200 py-6 text-center text-sm">
          © {new Date().getFullYear()} T3 - Reva by T3Planet with Love. All Rights Reserved.
        </div>

    </footer>
  );
};

export default Footer;
