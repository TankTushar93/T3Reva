import React, { useEffect, useState } from "react";
import { useSidebar } from "../../context/Sidebarcontext";

const Pay = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");

  const [headerContent, setHeaderContent] = useState({ heading: "", paragraph: "" }); // for id: 610
  const [plans, setPlans] = useState([]); // for id: 611
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch pricing data
    fetch("https://t3-reva.t3planet.de/elements/infographic-elements/pricing-plans")
      .then((res) => res.json())
      .then((data) => {
        // Helper function to find any block by id
        const findById = (obj, id) => {
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
        };

        /** === Extract Header Text (id: 610) === */
        const headerBlock = findById(data, 610);
        if (headerBlock) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = headerBlock.content.bodytext;

          const heading = tempDiv.querySelector("h2, h1")?.innerText || "";
          const paragraph = tempDiv.querySelector("p")?.innerText || "";

          setHeaderContent({ heading, paragraph });
        }

        /** === Extract Pricing Plans (id: 611) === */
        const pricingBlock = findById(data, 611);
        if (pricingBlock) {
          setPlans(pricingBlock.content?.pricingPlans || []);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pricing data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center bg-gray-500">
       
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: background === "Light" ? "#fff" : col }}
      className="w-full flex justify-between px-26 mx-auto py-24 pt-10"
    >
      {/* === Left Side - Dynamic Heading and Text === */}
      <div className="flex flex-col">
        {headerContent.heading ? (
          <>
            {/* Dynamic Heading */}
            <h1
              style={{ color: background === "Dark" ? "#fff" : col }}
              className="text-[32px] max-w-95  mt-13 font-bold"
            >
              {headerContent.heading.substring(0,20)}<br/>
              {headerContent.heading.substring(22)}
            </h1>

            {/* Dynamic Paragraph */}
            <p
              style={{ color: background === "Dark" ? "#fff" : "gray" }}
              className="text-gray-500 leading-relaxed tracking-wide max-w-95 text-[18px] mt-18"
            >
              {headerContent.paragraph.substring(0,45)}<br/>
              {headerContent.paragraph.substring(45)}
            </p>
          </>
        ) : (
          <h1 className="text-[32px] font-bold">Loading header...</h1>
        )}
      </div>

      {/* === Right Side - Dynamic Pricing Plans === */}
      <div className="flex mt-14">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`${
              plan.title === "Extended" ? "px-12" : "px-4"
            } relative w-auto py-18 h-full text-center border border-gray-200 transition-all duration-300 
              ${plan.heighlightColor === "1" ? "bg-gray-100 scale-105 z-10" : "bg-white"}
            `}
          >
            {/* Plan Name */}
            <h2 style={{ color: col }} className="text-3xl font-bold mb-8">
              {plan.title}
            </h2>

            {/* Price Section */}
            <p style={{ color: col }} className="text-4xl">
              $
              <span className="text-4xl font-bold">
                {plan.discount === "1" ? plan.discountPrice : plan.price}
              </span>
              <span className="text-lg text-gray-500">{plan.period}</span>
            </p>

            {/* Description */}
            <p className="mt-4 text-lg text-gray-500">{plan.description}</p>

            {/* Features */}
            <ul
              style={{ color: col }}
              className="mt-6 space-y-2 text-lg"
            >
              {plan.addItem.map((feature, idx) => (
                <li
                  key={idx}
                  className={
                    feature.tooltipText
                      ? "underline underline-offset-4 decoration-dotted cursor-pointer"
                      : ""
                  }
                  title={feature.tooltipText}
                >
                  {feature.title}
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={`mt-8 px-8 py-2.5 cursor-pointer font-medium transition-colors duration-300 ${
                plan.heighlightColor === "1"
                  ? "bg-indigo-500 text-white hover:bg-pink-400"
                  : "border border-blue-500 text-blue-500 hover:border-pink-400 hover:bg-pink-400 hover:text-white"
              }`}
            >
              {plan.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pay;
