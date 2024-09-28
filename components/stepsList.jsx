import React from "react";

const Steps = ({ steps, currentStep }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-4">
      <ul>
        {steps.map((step, index) => (
          <li
            key={index}
            className={`pl-2 py-2 text-gray-600 ${
              index === currentStep
                ? "border-l-4 border-[#593DFF] font-semibold text-black"
                : ""
            }`}
          >
            {step.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Steps;
