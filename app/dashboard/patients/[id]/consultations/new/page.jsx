"use client";
import NewPatientConsultation from "@/components/NewPatientConsultation";
import Steps from "@/components/stepsList";
import { useState } from "react";

const steps = [
  { name: "Motif d'hospitalisation", subSteps: 1 },
  { name: "Antécédents personnels et familiaux", subSteps: 2 },
  { name: "Habitudes sociales", subSteps: 1 },
  { name: "Examen clinique", subSteps: 2 },
  { name: "Traitement et évolution", subSteps: 1 },
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
