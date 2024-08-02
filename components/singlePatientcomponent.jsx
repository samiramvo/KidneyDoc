"use client";
import { useState, useRef, useEffect } from "react";
import "@/styles/globals.css";
import "@/styles/globalelements.css";
import { FaNotesMedical } from "react-icons/fa";
import { updatePatient } from "@/lib/actions";
import Link from "next/link";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const SinglePatientComponent = ({ patient }) => {
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
        formRef.current?.reset();
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
    <>
      <div className="containersingleuser  shadow-lg dark:bg-[#333] dark:shadow-lg">
        <div className="formContaineruser">
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={handleSubmit(handleFormupdateSubmit)}
              className="formIduser"
            >
              <input type="hidden" name="id" value={patient._id} />
              <div className="flex flex-row w-[100%]">
                <div className="flex">
                  <div className="flex flex-col mr-[30px] mb-4">
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
                              placeholder={patient.name_patient}
                              value={field.value || ""}
                              onChange={field.onChange}
                              name="name_patient"
                              id="name_patient"
                              className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0 w-[260px] "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col mb-4 ">
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
                              placeholder={patient.prenom_patient}
                              value={field.value || ""}
                              onChange={field.onChange}
                              id="prenom_patient"
                              name="prenom_patient"
                              className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0 w-[260px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-[100%]">
                <div className="flex flex-col w-[100%] mb-4">
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
                            placeholder={patient._id}
                            value={field.value || ""}
                            onChange={field.onChange}
                            readOnly
                            id="idpatient"
                            name="idpatient"
                            className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 font-medium" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className=" flex flex-row w-[100%]">
                <div className="flex">
                  <div className="flex flex-col mr-[30px] mb-4">
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
                                className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674] focus-visible:ring-0 focus-visible:ring-offset-0 w-[260px]"
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
                  <div className="flex flex-col mb-4 ">
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
                              placeholder={patient.agepatient}
                              value={field.value || ""}
                              onChange={field.onChange}
                              name="agepatient"
                              id="agepatient"
                              className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0  w-[260px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-[100%]">
                <div className="flex flex-col w-[100%] mb-4">
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
                            placeholder={patient.phone_patient}
                            className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
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
              <div className="flex flex-row w-[100%]">
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
                            placeholder={patient.addresspatient}
                            className="resize-none rounded-md p-2 w-[100%] dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0"
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
                className={`font-dm_sans buttonlog text-white text-center text-[15px] font-bold hover:shadow-xl hover:bg-[#4318FF] dark:hover:shadow-xl ${
                  isSubmitting
                    ? "opacity-85 cursor-not-allowed"
                    : "bg-[#4318FF] hover:bg-[#4318FF]"
                }`}
                // disabled={isSubmitting}
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
        <div className="separator dark:bg-white dark:w-[0.2px]"></div>

        <div className="mt-[5%] ">
          <div className="flex py-6 px-12 bg-[#F4F7FE] mb-[40%] rounded-md hover:bg-[#593DFF] text-white">
            <div className=" relative grid place-items-center ">
              <FaNotesMedical className="w-[75%] h-[75%] text-[#593DFF] mr-8" />
            </div>
            <div className="mt-[8%] text-[#1B2559]">Consultation</div>
          </div>
          <Link href={`/dashboard/patients/${patient.id}/`}>
            <div className="flex  py-6 px-12 bg-[#F4F7FE] mb-[40%] rounded-md">
              <div className=" relative grid place-items-center">
                <FaNotesMedical className="w-[75%] h-[75%] text-[#593DFF] mr-8" />
              </div>
              <div className="mt-[8%] text-[#1B2559]">Observation</div>
            </div>
          </Link>
          <div className="flex py-6 px-12 bg-[#F4F7FE] rounded-md">
            <div className=" relative grid place-items-center">
              <FaNotesMedical className="w-[75%] h-[75%] text-[#593DFF] mr-8" />
            </div>
            <div className="mt-[8%] text-[#1B2559]">Analyse</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SinglePatientComponent;
