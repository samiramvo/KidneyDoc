"use client";
import NewPatientConsultation from "@/components/NewPatientConsultation";
import Steps from "@/components/stepsList";
import { useState } from "react";

const steps = [
  { name: "Reason for hospitalization", subSteps: 1 },
  { name: "Personal and family history", subSteps: 2 },
  { name: "Social habits", subSteps: 1 },
  { name: "Clinical examination", subSteps: 4 }, // updated for new schema
  { name: "Complementary exams", subSteps: 1 }, // added complementary exams step
  { name: "Treatment and evolution", subSteps: 1 },
];

const PatientConsultationPage = ({ params }) => {
  const { id: patientId } = params;
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <Steps steps={steps} currentStep={currentStep} />
        </div>
        <div className="col-span-2">
          <NewPatientConsultation
            patientId={patientId}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientConsultationPage;
