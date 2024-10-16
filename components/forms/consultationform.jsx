import React from "react";
import { useForm } from "react-hook-form";
import { addConsultation } from "@/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const SophisticatedForm = ({
  step,
  onNext,
  onPrevious,
  isLastStep,
  patientId,
}) => {
  const formData = {
    reasonForHospitalization: "",
    medicalHistory: {
      personal: "",
      surgical: "",
      family: {
        father: "",
        mother: "",
        siblings: 0,
        children: 0,
      },
    },
    socialSurvey: {
      alcohol: "",
      tobacco: "",
      traditionalPhytotherapy: "",
      spice: "",
      administrativeCoverage: "",
    },
    clinicalExamination: {
      temperature: 0,
      bloodPressure: "",
      pulse: 0,
      respiratoryRate: 0,
      observations: "",
    },
    treatment: "",
    evolution: "",
    conclusion: "",
  };

  const form = useForm({
    defaultValues: formData,
  });
  const router = useRouter();
  const { handleSubmit, control, setValue, reset } = form;

  const onSubmit = async (data) => {
    try {
      const consultationData = {
        patientId,
        ...data,
      };
      const consultationId = await addConsultation(consultationData);
      toast.success(`Consultation ajoutée avec succès : ${consultationId}`);
      router.push(`/dashboard/patients/${patientId}/consultations`);
      reset(formData);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la consultation :", error);
      toast.error("Erreur lors de l'ajout de la consultation");
    }
  };

  const renderSubStepForm = () => {
    switch (step.name) {
      case "Motif d'hospitalisation":
        return (
          <div className="mb-4">
            <label className="block text-gray-700">
              Motif d&apos;hospitalisation
            </label>
            <input
              className="border rounded p-2 w-full"
              placeholder="Motif d'hospitalisation"
              {...control.register("reasonForHospitalization")}
              onChange={(e) =>
                setValue("reasonForHospitalization", e.target.value)
              }
            />
          </div>
        );

      case "Antécédents personnels et familiaux":
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">
                Antécédents personnels
              </label>
              <input
                className="border rounded p-2 w-full"
                placeholder="Antécédents personnels"
                {...control.register("medicalHistory.personal")}
                onChange={(e) =>
                  setValue("medicalHistory.personal", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Antécédents chirurgicaux
              </label>
              <input
                className="border rounded p-2 w-full"
                placeholder="Antécédents chirurgicaux"
                {...control.register("medicalHistory.surgical")}
                onChange={(e) =>
                  setValue("medicalHistory.surgical", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Antécédents du père</label>
              <input
                className="border rounded p-2 w-full"
                placeholder="Antécédents du père"
                {...control.register("medicalHistory.family.father")}
                onChange={(e) =>
                  setValue("medicalHistory.family.father", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Antécédents de la mère
              </label>
              <input
                className="border rounded p-2 w-full"
                placeholder="Antécédents de la mère"
                {...control.register("medicalHistory.family.mother")}
                onChange={(e) =>
                  setValue("medicalHistory.family.mother", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Nombre de frères/soeurs
              </label>
              <input
                className="border rounded p-2 w-full"
                type="number"
                placeholder="Nombre de frères/soeurs"
                {...control.register("medicalHistory.family.siblings")}
                onChange={(e) =>
                  setValue("medicalHistory.family.siblings", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Nombre d&apos;enfants
              </label>
              <input
                className="border rounded p-2 w-full"
                type="number"
                placeholder="Nombre d'enfants"
                {...control.register("medicalHistory.family.children")}
                onChange={(e) =>
                  setValue("medicalHistory.family.children", e.target.value)
                }
              />
            </div>
          </>
        );

      case "Habitudes sociales":
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">
                Consommation d&apos;alcool
              </label>
              <select
                className="border rounded p-2 w-full"
                {...control.register("socialSurvey.alcohol")}
                onChange={(e) =>
                  setValue("socialSurvey.alcohol", e.target.value === "true")
                }
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Consommation de tabac
              </label>
              <select
                className="border rounded p-2 w-full"
                {...control.register("socialSurvey.tobacco")}
                onChange={(e) =>
                  setValue("socialSurvey.tobacco", e.target.value === "true")
                }
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Phytothérapie traditionnelle
              </label>
              <select
                className="border rounded p-2 w-full"
                {...control.register("socialSurvey.traditionalPhytotherapy")}
                onChange={(e) =>
                  setValue(
                    "socialSurvey.traditionalPhytotherapy",
                    e.target.value === "true"
                  )
                }
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Usage d&apos;épices</label>
              <select
                className="border rounded p-2 w-full"
                {...control.register("socialSurvey.spice")}
                onChange={(e) =>
                  setValue("socialSurvey.spice", e.target.value === "true")
                }
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Couverture administrative
              </label>
              <select
                className="border rounded p-2 w-full"
                {...control.register("socialSurvey.administrativeCoverage")}
                onChange={(e) =>
                  setValue(
                    "socialSurvey.administrativeCoverage",
                    e.target.value === "true"
                  )
                }
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </>
        );

      case "Examen clinique":
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Température</label>
              <input
                className="border rounded p-2 w-full"
                type="number"
                placeholder="Température"
                {...control.register("clinicalExamination.temperature")}
                onChange={(e) =>
                  setValue("clinicalExamination.temperature", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tension artérielle</label>
              <input
                className="border rounded p-2 w-full"
                placeholder="Tension artérielle"
                {...control.register("clinicalExamination.bloodPressure")}
                onChange={(e) =>
                  setValue("clinicalExamination.bloodPressure", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Pouls</label>
              <input
                className="border rounded p-2 w-full"
                type="number"
                placeholder="Pouls"
                {...control.register("clinicalExamination.pulse")}
                onChange={(e) =>
                  setValue("clinicalExamination.pulse", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Fréquence respiratoire
              </label>
              <input
                className="border rounded p-2 w-full"
                type="number"
                placeholder="Fréquence respiratoire"
                {...control.register("clinicalExamination.respiratoryRate")}
                onChange={(e) =>
                  setValue(
                    "clinicalExamination.respiratoryRate",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Observations cliniques
              </label>
              <input
                className="border rounded p-2 w-full"
                placeholder="Observations cliniques"
                {...control.register("clinicalExamination.observations")}
                onChange={(e) =>
                  setValue("clinicalExamination.observations", e.target.value)
                }
              />
            </div>
          </>
        );

      case "Traitement et évolution":
        return (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Traitement</label>
              <input
                className="border rounded p-2 w-full"
                placeholder="Traitement"
                {...control.register("treatment")}
                onChange={(e) => setValue("treatment", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Évolution</label>
              <input
                className="border rounded p-2 w-full"
                placeholder="Évolution"
                {...control.register("evolution")}
                onChange={(e) => setValue("evolution", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Conclusion</label>
              <input
                className="border rounded p-2 w-full"
                placeholder="Conclusion"
                {...control.register("conclusion")}
                onChange={(e) => setValue("conclusion", e.target.value)}
              />
            </div>
          </>
        );

      default:
        return <p>Form content goes here.</p>;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-lg font-medium mb-4">{step.name}</h3>
      {renderSubStepForm()}

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onPrevious} className="buttonpagination">
          Previous
        </button>

        {isLastStep && step.name === "Traitement et évolution" ? (
          <button type="submit" className="buttonpagination">
            Submit
          </button>
        ) : (
          <button type="button" onClick={onNext} className="buttonpagination">
            Next
          </button>
        )}
      </div>
    </form>
  );
};

export default SophisticatedForm;
