import React, { useEffect, useState } from "react";
import { useSidebar } from "../../context/Sidebarcontext";
import { lighten } from "polished";

const PricingCards = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");
   const tcol = localStorage.getItem('tcolor');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

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

        const pricingData = findById(data, 353);
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
      <div className="h-[400px] w-full flex justify-center items-center bg-gray-500">
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: background === "Light" ? "#fff" : col,
      }}
      className="w-full flex flex-col items-center justify-center mx-auto px-4 py-24 pt-10 relative"
    >
      {/* Title */}
      <h1
        style={{ color: background === "Dark" ? "#fff" : col }}
        className="text-[28px] sm:text-[32px] md:text-[38px] mt-12 font-extrabold text-center"
      >
        Classic pricing plans on 3 columns
      </h1>

      <div
        className="
          flex flex-col sm:flex-row flex-wrap 
          justify-center gap-6 sm:gap-8 lg:gap-0 mt-14 w-full px-4
        "
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              backgroundColor:
                plan.title === "Extended" ? "oklch(96.7% 0.003 264.542)" : "#fff",
            }}
            className={`
              relative 
              w-full sm:w-[320px] lg:w-[360px] 
              py-10 px-6 sm:px-8 text-center border border-gray-200 
              transition-all duration-300 flex flex-col items-center
              ${
                plan.title === "Extended" ? "lg:scale-105 z-10 sm:px-12" : ""
              }
            `}
          >

            <h2 style={{ color: col }} className="text-2xl sm:text-3xl font-bold mb-6">
              {plan.title}
            </h2>

            <p style={{ color: col }} className="text-3xl sm:text-4xl">
              $
              <span className="font-bold">
                {plan.discount === "1" ? plan.discountPrice : plan.price}
              </span>
              <span   style={{color: tcol }}
            className="text-gray-500 text-lg">/{plan.period}</span>
            </p>

            <p style={{color: tcol }} className="mt-4 text-base sm:text-lg text-gray-500">{plan.description}</p>

            <ul
              style={{ color: col }}
              className="mt-6 space-y-2 text-base sm:text-lg text-gray-700"
            >
              {plan.addItem.map((feature, idx) => (
                <li
                  key={idx}
                  className={`relative cursor-pointer ${
                    feature.tooltipText
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

            <button
              className={`mt-8 w-full sm:w-auto px-6 py-2.5 cursor-pointer font-medium transition-colors duration-300 ${
                plan.title === "Extended"
                  ? "bg-blue-500 text-white hover:bg-pink-400"
                  : "border border-blue-500 text-blue-500 hover:border-pink-400 hover:bg-pink-400 hover:text-white"
              }`}
            >
              {plan.buttonLabel}
            </button>
          </div>
        ))}
      </div>

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

export default PricingCards;
