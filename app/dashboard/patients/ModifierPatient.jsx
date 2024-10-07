"use client";
import { useState, useRef, useEffect } from "react";
import "@/styles/globals.css";
import "@/styles/globalelements.css";
import { updatePatient } from "@/lib/actions";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import Modal from "@/components/modalform";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { UserEdit } from "iconsax-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const UpdatePatientPage = ({ patient, isOpen, onClose }) => {
  const formRef = useRef(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name_patient: z.string().min(1, "Le nom du patient est requis").optional(),
    prenom_patient: z
      .string()
      .min(1, "Le prénom du patient est requis")
      .optional(),
    gender: z.enum(["Male", "Female"], "Le genre est requis").optional(),
    agepatient: z
      .number()
      .min(0, "L'âge doit être un nombre positif")
      .optional(),
    addresspatient: z.string().min(1, "L'adresse est requise").optional(),
    phone_patient: z
      .string()
      .refine((value) => isPossiblePhoneNumber(value), {
        message: "Le numéro de téléphone est invalide",
      })
      .refine((value) => isValidPhoneNumber(value), {
        message: "Le numéro de téléphone n'est pas valide dans ce pays",
      })
      .optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_patient: "",
      prenom_patient: "",
      gender: "",
      agepatient: "",
      addresspatient: "",
      phone_patient: "",
    },
  });
  const { control, handleSubmit, reset, setValue } = form;
  useEffect(() => {
    if (patient) {
      setValue("name_patient", patient.name_patient || "");
      setValue("prenom_patient", patient.prenom_patient || "");
      setValue(
        "gender",
        patient.gender !== undefined ? String(patient.gender) : ""
      );
      setValue("agepatient", patient.agepatient || "");
      setValue("addresspatient", patient.addresspatient || "");
      setValue("phone_patient", patient.phone_patient || "");
    }
  }, [patient, setValue]);
  async function handleFormupdateSubmit(values) {
    const formData = new FormData();
    formData.append("id", patient._id);
    formData.append("name_patient", values.name_patient);
    formData.append("prenom_patient", values.prenom_patient);
    formData.append("gender", values.gender);
    formData.append("agepatient", values.agepatient);
    formData.append("addresspatient", values.addresspatient);
    formData.append("phone_patient", values.phone_patient);
    setIsSubmitting(true);
    try {
      const response = await updatePatient(formData);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Patient is successfully updated!", {
          position: "top-right",
          theme: "light",
          bodyClassName: "custom-toast-body",
          style: {
            fontFamily: "DM Sans, sans-serif",
          },
        });
        setTimeout(() => {
          router.refresh();
        }, 3000);
        reset();
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(
        "An error occurred while updating the patient. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="modal-form-container max-h-screens">
          <div className="modal-form-header flex gap-2 mb-4">
            <div className="modal-form-logo">
              <span>
                <UserEdit size={28} className="text-violettitle" />
              </span>
            </div>
            <div className="modal-form-role flex flex-align-item-center  pb-4">
              <p className="text-lg text-violettitle font-bold">
                Modification du patient {patient?.name_patient}{" "}
                {patient?.prenom_patient}
              </p>
            </div>
          </div>
          <div className="modal-form-body">
            <div className=" dark:bg-[#333]  ">
              <Form {...form}>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit(handleFormupdateSubmit)}
                  className="form-layout"
                >
                  <input type="hidden" name="id" value={patient?._id} />
                  <div className="form-row w-[100%] mb-4">
                    <div className="w-[48%]">
                      <FormField
                        control={form.control}
                        name="name_patient"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Last name
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder={patient?.name_patient}
                                value={field.value || ""}
                                onChange={field.onChange}
                                name="name_patient"
                                id="name_patient"
                                className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1 "
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-[48%]">
                      <FormField
                        control={form.control}
                        name="prenom_patient"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              First Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder={patient?.prenom_patient}
                                value={field.value || ""}
                                onChange={field.onChange}
                                id="prenom_patient"
                                name="prenom_patient"
                                className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="form-row  w-[100%] mb-4">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="idpatient"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              ID
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder={patient?._id}
                                value={field.value || ""}
                                onChange={field.onChange}
                                readOnly
                                id="idpatient"
                                name="idpatient"
                                className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className=" form-row w-[100%] ">
                    <div className="w-[48%]">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Gender
                            </FormLabel>
                            <FormControl>
                              <div>
                                <select
                                  {...field}
                                  name="gender"
                                  id="gender"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
                                >
                                  <option disabled value="">
                                    Sexe
                                  </option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-[48%] ">
                      <FormField
                        control={form.control}
                        name="agepatient"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Age
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={patient?.agepatient}
                                value={field.value || ""}
                                onChange={field.onChange}
                                name="agepatient"
                                id="agepatient"
                                className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="form-row w-[100%] mb-4">
                    <div className="w-full">
                      <Controller
                        control={control}
                        name="phone_patient"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <PhoneInput
                                international
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder={patient?.phone_patient}
                                className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
                              />
                            </FormControl>
                            {fieldState.error && (
                              <FormMessage className="text-red-400 font-medium">
                                {fieldState.error.message}
                              </FormMessage>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="form-row w-[100%] mb-4">
                    <div className="flex flex-col w-[100%] ">
                      <FormField
                        control={form.control}
                        name="addresspatient"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Address
                            </FormLabel>
                            <FormControl>
                              <textarea
                                name="addresspatient"
                                id="addresspatient"
                                placeholder={patient?.addresspatient}
                                className="resize-none rounded-md p-2 w-[100%] border border-input"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className={`w-[30%] rounded-[20px] px-2 py-2 text-[15px]   bg-violettitle text-white ${
                      isSubmitting
                        ? "opacity-85 cursor-not-allowed"
                        : "bg-violettitle hover:bg-violettitle"
                    }`}
                  >
                    {isSubmitting ? (
                      <LoaderCircle size={30} className="animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default UpdatePatientPage;
