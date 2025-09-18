import React, { useEffect, useState } from "react";
import { useSidebar } from "../../context/Sidebarcontext";

const Pay = () => {
  const { background } = useSidebar();
  const col = localStorage.getItem("color");
  const tcol = localStorage.getItem('tcolor');
  const [headerContent, setHeaderContent] = useState({ heading: "", paragraph: "" });
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://t3-reva.t3planet.de/elements/infographic-elements/pricing-plans")
      .then((res) => res.json())
      .then((data) => {
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

        const headerBlock = findById(data, 610);
        if (headerBlock) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = headerBlock.content.bodytext;

          const heading = tempDiv.querySelector("h2, h1")?.innerText || "";
          const paragraph = tempDiv.querySelector("p")?.innerText || "";

          setHeaderContent({ heading, paragraph });
        }

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
      <div className="w-full h-[400px] flex justify-center items-center bg-gray-500">      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: background === "Light" ? "#fff" : col }}
      className="w-full px-6 sm:px-10 lg:px-26 mx-auto py-16 lg:py-24"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10">
        <div className="flex flex-col text-center lg:text-left">
          {headerContent.heading ? (
            <>
              <h1
                style={{ color: background === "Dark" ? "#fff" : col }}
                className="text-[28px] sm:text-[32px] max-w-[95%] font-bold leading-snug"
              >
                {headerContent.heading.substring(0, 20)} <br />
                {headerContent.heading.substring(22)}
              </h1>

              <p
                style={{ color: background === "Dark" ? "#fff" : tcol }}
                className="text-gray-500 leading-relaxed tracking-wide max-w-[95%] text-base sm:text-lg mt-4 sm:mt-6"
              >
                {headerContent.paragraph.substring(0, 45)} <br />
                {headerContent.paragraph.substring(45)}
              </p>
            </>
          ) : (
            <h1 className="text-[28px] sm:text-[32px] font-bold">Loading header...</h1>
          )}
        </div>

        {/* Plans Section */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-6 lg:gap-0 w-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative w-full h-full  flex-1 py-18 px-4 text-center border border-gray-200  transition-all duration-300
                ${plan.heighlightColor === "1" ? "bg-gray-100 xl:scale-108 z-10" : "bg-white"}
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
                <span style={{ color: tcol }}
                  className="ml-1 text-lg ">{plan.period}</span>
              </p>

              <p style={{ color: tcol }}
                className="mt-4  text-base sm:text-lg">{plan.description}</p>

              <ul
                style={{ color: col }}
                className="mt-6 space-y-2 text-base sm:text-lg"
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
      </div>
    </div>
  );
};

export default Pay;
