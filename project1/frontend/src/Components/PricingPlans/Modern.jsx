import React, { useEffect, useState } from "react";
import { useSidebar } from "../../context/Sidebarcontext";
import { FaArrowRight } from "react-icons/fa";
const Modern = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/infographic-elements/pricing-plans")
      .then((res) => res.json())
      .then((data) => {
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

        const pricingData = findById(data, 155);

        if (pricingData) {
          setTitle(pricingData.content?.header || "Modern pricing plans");

          setPlans(pricingData.content?.pricingPlans || []);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pricing plans:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-[400px] bg-white w-full flex justify-center items-center"></div>
    );
  }

  return (
    <div
      style={{ backgroundColor: background === "Light" ? "#fff" : col }}
      className="w-full flex flex-col items-center justify-center px-4 lg:mx-auto pt-12 pb-34"
    >
      {/* Title */}
      <h1
        style={{ color: background === "Dark" ? "#fff" : col }}
        className="text-[38px] text-center mt-10 font-extrabold"
      >
        {title}
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-1 items-center justify-center w-full  gap-29 lg:gap-4 xl:gap-10 px-4 lg:px-2 xl:px-24 py-12">
        {plans.map((plan, index) => (
          <div key={index} className="relative flex items-center w-full lg:w-80 xl:w-full justify-center">
            <div className="h-auto w-92 relative px-10 py-10 z-10 bg-white border border-gray-300">
              
              <p style={{ color: col }} className="text-4xl inline font-bold">
                ${plan.price}
              </p>
              <span className="text-lg text-gray-500 inline ">/{plan.period}</span>
             
              <h1 style={{ color: col }} className="mt-5 font-extrabold text-2xl">
                {plan.title}
              </h1>
             
              <p className="mt-5 text-lg text-gray-500">{plan.description}</p>

              <hr className="mt-6 text-gray-200" />

              <div className="pt-4">
                {plan.addItem?.map((item, idx) => (
                  <div key={idx} className="mt-2 flex gap-3 items-center">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      className="h-5 text-green-600 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                    </svg>
                    <p className="text-lg text-gray-500">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`absolute flex justify-center items-center z-0 w-77.5 sm:w-92  min-[773px]:w-75 min-[817px]:w-79 min-[868px]:w-86 min-[917px]:w-92 min-[1002px]:w-92 lg:w-80 xl:w-85  lg:left-0 xl:left-18  ${
                plan.title === "Professional" ? "top-14 h-114" : "top-10 h-108"
              } bg-gray-100`}
            >
              {plan.buttonLabel && (
                <a
                  href={plan.buttonLink?.href || "#"}
                  className={` ${plan.title === "Professional" ? 'mt-99' : 'mt-94'} items-center justify-canter  gap-3 group ml-32 flex text-blue-500 text-right py-2 px-4 cursor-pointer `}
                >
                  {plan.buttonLabel}  <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2   " />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modern;
