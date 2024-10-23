// // components/NewPatientConsultation.js
// import React from "react";
// import SophisticatedForm from "./forms/consultationform";
// import ProgressBar from "./progressbar";

// const NewPatientConsultation = ({ patientId, currentStep, setCurrentStep }) => {
//   const steps = [
//     { name: "Motif d'hospitalisation", subSteps: 1 },
//     { name: "Antécédents personnels et familiaux", subSteps: 2 },
//     { name: "Habitudes sociales", subSteps: 1 },
//     { name: "Examen clinique", subSteps: 2 },
//     { name: "Traitement et évolution", subSteps: 1 },
//   ];

//   const totalSteps = steps.length;

//   const handleNextStep = () => {
//     if (currentStep < totalSteps - 1) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const handlePreviousStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   const progress = ((currentStep + 1) / totalSteps) * 100;

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-bold mb-4">New Patient Consultation</h2>

//       <ProgressBar progress={progress} />
//       <SophisticatedForm
//         patientId={patientId}
//         step={steps[currentStep]}
//         onNext={handleNextStep}
//         onPrevious={handlePreviousStep}
//         isLastStep={currentStep === totalSteps - 1}
//       />
//     </div>
//   );
// };

// export default NewPatientConsultation;

import React from "react";
import SophisticatedForm from "./forms/consultationform";
import ProgressBar from "./progressbar";

const NewPatientConsultation = ({ patientId, currentStep, setCurrentStep }) => {
  const steps = [
    { name: "Reason for hospitalization", subSteps: 1 },
    { name: "Personal and family history", subSteps: 2 },
    { name: "Social habits", subSteps: 1 },
    { name: "Clinical examination", subSteps: 4 }, // updated for new schema
    { name: "Complementary exams", subSteps: 1 }, // added complementary exams step
    { name: "Treatment and evolution", subSteps: 1 },
  ];

  const totalSteps = steps.length;

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">New Patient Consultation</h2>

      <ProgressBar progress={progress} />
      <SophisticatedForm
        patientId={patientId}
        step={steps[currentStep]}
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        isLastStep={currentStep === totalSteps - 1}
      />
    </div>
  );
};

export default NewPatientConsultation;
