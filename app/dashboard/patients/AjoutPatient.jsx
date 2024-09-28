"use client";
import { useRef, useState, useEffect } from "react";
// import { auth } from "@/app/auth";
import { addPatient } from "@/lib/actions";
import Link from "next/link";
import "@/styles/globalelements.css";
import "@/styles/globals.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/components/modalpatient";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";

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
const AddPatientPage = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name_patient: z.string().min(1, "Le nom du patient est requis"),
    prenom_patient: z.string().min(1, "Le prénom du patient est requis"),
    gender: z.enum(["Male", "Female"], "Le genre est requis"),
    birth: z
      .string()
      .refine(
        (date) => !isNaN(new Date(date).getTime()),
        "La date de naissance doit être une date valide"
      ),

    agepatient: z.number().min(0, "L'âge doit être un nombre positif"),
    addresspatient: z.string().min(1, "L'adresse est requise"),
    phone_patient: z
      .string()
      .min(1, "Le numéro de téléphone est requis")
      .refine((value) => isPossiblePhoneNumber(value), {
        message: "Le numéro de téléphone est invalide",
      })
      .refine((value) => isValidPhoneNumber(value), {
        message: "Le numéro de téléphone n'est pas valide dans ce pays",
      }),
    doctor: z.string().min(1, "Le nom du docteur est requis"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_patient: "",
      prenom_patient: "",
      gender: "",
      birth: "",
      agepatient: "",
      addresspatient: "",
      phone_patient: "",
      doctor: "",
    },
  });

  const { control, setValue, watch, handleSubmit } = form;
  const birthDate = watch("birth");

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (birthDate) {
      const calculatedAge = calculateAge(birthDate);
      setValue("agepatient", calculatedAge);
    } else {
      setValue("agepatient", "");
    }
  }, [birthDate, setValue]);

  async function handleFormSubmit(values) {
    const formData = new FormData();
    formData.append("name_patient", values.name_patient);
    formData.append("prenom_patient", values.prenom_patient);
    formData.append("gender", values.gender);
    formData.append("birth", values.birth);
    formData.append("agepatient", values.agepatient);
    formData.append("addresspatient", values.addresspatient);
    formData.append("phone_patient", values.phone_patient);
    formData.append("doctor", values.doctor);
    setIsSubmitting(true);
    try {
      const response = await addPatient(formData);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Patient is successfully registered!", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          bodyClassName: "custom-toast-body",
          style: {
            fontFamily: "DM Sans, sans-serif",
          },
          onClose: () => {
            toast.info(
              <div>
                <div>Redirecting to Patient Details</div>
                <div className="mt-[10px]">
                  <Link href={`/dashboard/patients/${response}`}>
                    <button
                      onClick={() => toast.dismiss()}
                      className="bg-blue-500 hover:bg-blue-700 text-white p-[5px] rounded"
                    >
                      Details
                    </button>
                  </Link>
                </div>
              </div>,
              {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
              }
            );
          },
        });
        formRef.current?.reset();
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(
        "An error occurred while adding the patient. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="modal-form-container max-h-screen">
          <div className="modal-form-header">
            <div className="modal-form-logo">
              <span className="mr-2">
                <i className="iconsax" icon-name="building-2"></i>
              </span>
            </div>
            <div className="modal-form-role flex flex-align-item-center  pb-4">
              <div className="bg-violetclair border-2 mx-4" />
              <p className="paragraphe ">Ajout d'un patient</p>
            </div>
          </div>
          <div className="modal-form-body">
            <div className=" dark:bg-[#333]  ">
              <Form {...form}>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit(handleFormSubmit)}
                  className="form-layout"
                >
                  <div className="form-row w-[100%]">
                    <div className="w-[48%]">
                      <FormField
                        control={form.control}
                        name="name_patient"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Last Name
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder=""
                                name="name_patient"
                                id="name_patient"
                                className="form-input2"
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
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder=""
                                name="prenom_patient"
                                id="prenom_patient"
                                className="form-input2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="form-row w-[100%]">
                    <div className="w-[48%]">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Gender
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <div>
                                <select
                                  {...field}
                                  name="gender"
                                  id="gender"
                                  className="form-input2"
                                  value={field.value || "default"}
                                >
                                  <option disabled value="default">
                                    Select Gender
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
                    <div className="w-[48%]">
                      <Controller
                        control={control}
                        name="birth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Date of birth
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                name="birth"
                                id="birth"
                                className="form-input2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="form-row w-[100%]">
                    <div className="w-[48%]">
                      <Controller
                        control={control}
                        name="agepatient"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Age
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder=""
                                name="agepatient"
                                id="agepatient"
                                readOnly
                                className="form-input2"
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
                        name="addresspatient"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Address
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder=""
                                name="addresspatient"
                                id="addresspatient"
                                className="form-input2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="form-row w-[100%]">
                    <div className="w-[48%]">
                      <Controller
                        control={control}
                        name="phone_patient"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>
                              Phone Number
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <PhoneInput
                                international
                                defaultCountry="BJ"
                                value={field.value}
                                onChange={field.onChange}
                                className="form-input2"
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
                    <div className="w-[48%]">
                      {/* <input
                  type="text"
                  placeholder="Name of doctor"
                  name="doctor"
                  id="doctor"
                  // value={user.username}
                  readOnly
                  className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
                  required
                /> */}

                      <FormField
                        control={form.control}
                        name="doctor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Doctor Assigned
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <div>
                                <select
                                  {...field}
                                  name="doctor"
                                  id="doctor"
                                  className="form-input2"
                                  value={field.value || "default"}
                                >
                                  <option disabled value="default">
                                    Select Doctor
                                  </option>
                                  <option value="Dr VIGAN">Dr VIGAN</option>
                                  <option value="Dr Pascal">Dr Pascal</option>
                                </select>
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className={`w-[30%] rounded-[20px] px-2 py-2 text-[15px] ml-4  bg-violettitle text-white ${
                      isSubmitting
                        ? "opacity-85 cursor-not-allowed"
                        : "bg-violettitle hover:bg-violettitle"
                    }`}
                    // disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoaderCircle size={30} className="animate-spin" />
                    ) : (
                      "Submit"
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

export default AddPatientPage;
