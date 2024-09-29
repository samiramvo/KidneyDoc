"use client";
import NewPatientConsultation from "@/components/NewPatientConsultation";
import PatientSummary from "@/components/PatientSummary";
import Steps from "@/components/stepsList";
import { useState } from "react";

const steps = [
  { name: "Chief Complaints", subSteps: 2 },
  { name: "Associate Complaints", subSteps: 3 },
  { name: "Examination", subSteps: 1 },
  { name: "Investigation", subSteps: 2 },
  { name: "Probable Diagnosis", subSteps: 2 },
  { name: "Treatment Management Plan", subSteps: 1 },
  { name: "Case Taking", subSteps: 1 },
];

const PatientConsultationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <PatientSummary />
          <Steps steps={steps} currentStep={currentStep} />
        </div>
        <div className="col-span-2">
          <NewPatientConsultation
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientConsultationPage;
