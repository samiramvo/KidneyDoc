// components/forms/SophisticatedForm.js
import React, { useState } from "react";
import "@/styles/globals.css";
const SophisticatedForm = ({ step, onNext, onPrevious, isLastStep }) => {
  const [subStep, setSubStep] = useState(0);

  const handleNextSubStep = () => {
    if (subStep < step.subSteps - 1) {
      setSubStep(subStep + 1);
    } else {
      onNext();
    }
  };

  const handlePreviousSubStep = () => {
    if (subStep > 0) {
      setSubStep(subStep - 1);
    } else {
      onPrevious();
    }
  };

  const renderSubStepForm = () => {
    switch (step.name) {
      case "Chief Complaints":
        if (subStep === 0) {
          return (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  How long have you been experiencing this issue?
                </label>
                <select
                  name="duration"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select duration</option>
                  <option value="1-2 months">1-2 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Have you noticed hair thinning?
                </label>
                <select
                  name="hair-thinning"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </>
          );
        } else if (subStep === 1) {
          return (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Please rate your hair loss
                </label>
                <div className="mt-1 flex space-x-4">
                  {Array.from({ length: 7 }, (_, index) => (
                    <label key={index} className="flex flex-col items-center">
                      <input
                        type="radio"
                        name="hair-loss-grade"
                        value={`stage-${index + 1}`}
                        className="form-radio text-blue-600"
                      />
                      <span className="text-sm">Stage {index + 1}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Family history of hair loss
                </label>
                <div className="mt-1">
                  <div className="flex items-center">
                    <input
                      id="parents"
                      name="family-history"
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <label
                      htmlFor="parents"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Parents
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="siblings"
                      name="family-history"
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <label
                      htmlFor="siblings"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Siblings
                    </label>
                  </div>
                  {/* Additional checkboxes can be added here */}
                </div>
              </div>
            </>
          );
        }
        break;

      case "Associate Complaints":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Describe any associated complaints:
            </label>
            <textarea
              name="associated-complaints"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        );

      // Add more cases for other steps here

      default:
        return <p>Form content goes here.</p>;
    }
  };

  return (
    <form className="space-y-6">
      <h3 className="text-lg font-medium mb-4">{step.name}</h3>
      {renderSubStepForm()}
      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handlePreviousSubStep}
          className="buttonpagination"
          disabled={step.name === "Chief Complaints" && subStep === 0}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={handleNextSubStep}
          className="buttonpagination"
        >
          {isLastStep && subStep === step.subSteps - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default SophisticatedForm;
