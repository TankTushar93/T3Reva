import React, { useEffect, useState } from "react";
import { useSidebar } from "../../context/Sidebarcontext";
import { lighten } from "polished";

const Classicplan = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

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

        const pricingData = findById(data, 354);
        if (pricingData) {
          setPlans(pricingData.content?.pricingPlans || []);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pricing plans:", error);
        setLoading(false);
      });
  }, []);

  const showTooltip = (e, text) => {
    if (!text) return;
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      text,
      x: rect.left + rect.width / 2,
      y: rect.top - 40,
    });
  };

  const hideTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  if (loading) {
    return (
      <div className="h-[400px] w-full flex justify-center items-center bg-gray-500"></div>
    );
  }

  return (
    <div
      style={{
        backgroundColor:
          background === "Light" ? "oklch(96.7% 0.003 264.542)" : lighten(0.24, col),
      }}
      className="w-full flex flex-col items-center justify-center mx-auto px-4 py-24 pt-10 relative"
    >
      {/* Title */}
      <h1
        style={{ color: background === "Dark" ? "#fff" : col }}
        className="text-[38px] text-center mt-12 font-extrabold"
      >
        Classic pricing plans on 3 columns
      </h1>

      {/* Plans */}
      <div className="flex flex-col lg:flex-row lg:justify-center mt-14 gap-6 lg:gap-0 w-full px-4 sm:px-6 lg:px-30">
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              backgroundColor: plan.title === "Extended" ? col : "#fff",
            }}
            className={`relative flex-1 min-w-[280px] sm:min-w-[300px] md:min-w-[320px] 
        max-w-md mx-auto py-18 text-center border border-gray-200 
        transition-all duration-300 cursor-pointer
        ${plan.heighlightColor === "1"
                ? "lg:scale-108 z-10"
                : "hover:scale-105"
              }
        ${plan.title === "Extended" ? "px-8 sm:px-10" : "px-4 sm:px-6"}
      `}
          >
            {/* Plan Name */}
            <h2
              style={{ color: plan.heighlightColor === "1" ? "#fff" : col }}
              className="text-2xl sm:text-3xl font-bold mb-8"
            >
              {plan.title}
            </h2>

            {/* Price */}
            <div className="flex items-center justify-center mb-4 flex-wrap">
              {plan.discount === "1" && (
                <span
                  className="text-2xl sm:text-3xl font-bold relative mr-2"
                  style={{
                    color: plan.heighlightColor === "1" ? "#fff" : col,
                  }}
                >
                  <span className="absolute left-0 right-0 top-1/2 border-t-2 border-blue-500 transform -rotate-6"></span>
                  ${plan.price}
                </span>
              )}
              <span
                className="text-3xl sm:text-4xl leading-relaxed tracking-wide font-bold"
                style={{ color: plan.heighlightColor === "1" ? "#fff" : col }}
              >
                ${plan.discount === "1" ? plan.discountPrice : plan.price}
              </span>
              <span
                style={{ color: plan.heighlightColor === "1" ? "#fff" : col }}
                className="text-lg mt-1 sm:mt-3 ml-1"
              >
                /{plan.period}
              </span>
            </div>

            {/* Description */}
            <p
              className={`mt-2 text-base sm:text-lg ${plan.heighlightColor === "1" ? "text-white" : "text-gray-500"
                }`}
            >
              {plan.description}
            </p>

            {/* Features */}
            <ul
              style={{ color: plan.heighlightColor === "1" ? "#fff" : col }}
              className="mt-6 space-y-2 text-base sm:text-lg"
            >
              {plan.addItem.map((feature, idx) => (
                <li
                  key={idx}
                  className={`relative cursor-pointer ${feature.tooltipText
                      ? "underline underline-offset-4 decoration-dotted decoration-gray-400"
                      : ""
                    }`}
                  onMouseEnter={(e) => showTooltip(e, feature.tooltipText)}
                  onMouseLeave={hideTooltip}
                >
                  {feature.title}
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={`mt-8 w-full sm:w-auto px-6 py-2.5 cursor-pointer font-medium rounded transition-colors duration-300
          ${plan.heighlightColor === "1"
                  ? "bg-indigo-500 text-white hover:bg-pink-400"
                  : "border border-blue-500 text-blue-500 hover:border-pink-400 hover:bg-pink-400 hover:text-white"
                }`}
            >
              {plan.buttonLabel}
            </button>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-md shadow-lg"
          style={{
            top: tooltip.y,
            left: tooltip.x,
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            zIndex: 50,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default Classicplan;
