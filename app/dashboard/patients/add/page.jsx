"use client";
import { useRef, useState, useEffect } from "react";
// import { auth } from "@/app/auth";
import { addPatient } from "@/lib/actions";
import Link from "next/link";
import "@/styles/globalelements.css";
import "@/styles/globals.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
const AddPatientPage = () => {
  const formRef = useRef(null);
  // const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   const fetchAuth = async () => {
  //     try {
  //       const userData = await auth();
  //       setUser(userData.username);
  //     } catch (error) {
  //       console.error("Failed to fetch user data:", error);
  //     }
  //   };

  //   fetchAuth();
  // }, []);

  // const handleBirthDateChange = (event) => {
  //   const birthDate = event.target.value;
  //   setBirthDate(birthDate);
  //   const calculatedAge = calculateAge(birthDate);
  //   setAge(calculatedAge);
  // };

  // const calculateAge = (birthDate) => {
  //   const today = new Date();
  //   const birthDateObj = new Date(birthDate);
  //   let age = today.getFullYear() - birthDateObj.getFullYear();
  //   const monthDiff = today.getMonth() - birthDateObj.getMonth();
  //   if (
  //     monthDiff < 0 ||
  //     (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  //   ) {
  //     age--;
  //   }
  //   return age;
  // };

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
      .regex(/^\+?\d{10,15}$/, "Le numéro de téléphone est invalide"),
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
      <div>
        <h1 className="font-bold text-[#2B3674] text-[26px] mb-8 dark:text-white">
          New Patient
        </h1>
      </div>
      <div className="containeraddpatient shadow-lg dark:bg-[#333] dark:shadow-lg ">
        <div>
          <h1 className="font-medium text-[#2B3674] text-[17px] mt-4 mb-8 dark:text-white">
            Basic Information
          </h1>
        </div>
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={handleSubmit(handleFormSubmit)}
            className="formaddpatient"
          >
            <div className="flex flex-row">
              <div className="flex flex-col mb-4">
                <FormField
                  control={form.control}
                  name="name_patient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#A3AED0]">
                        Last Name
                        <span className="text-red-500 text-[18px]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nom patient"
                          name="name_patient"
                          id="name_patient"
                          className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-medium" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col mb-4">
                <FormField
                  control={form.control}
                  name="prenom_patient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#A3AED0]">
                        First Name
                        <span className="text-red-500 text-[18px]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Prenom patient"
                          name="prenom_patient"
                          id="prenom_patient"
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
            <div className="flex flex-row">
              <div className="flex flex-col ">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#A3AED0]">
                        Gender
                        <span className="text-red-500 text-[18px]">*</span>
                      </FormLabel>
                      <FormControl>
                        <div>
                          <select
                            {...field}
                            name="gender"
                            id="gender"
                            className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674] focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
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
              <div className="flex flex-col ">
                <Controller
                  control={control}
                  name="birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#A3AED0]">
                        Date of birth
                        <span className="text-red-500 text-[18px]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          name="birth"
                          id="birth"
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
            <div className="flex flex-row">
              <div className="flex flex-col mb-4">
                <Controller
                  control={control}
                  name="agepatient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#A3AED0]">
                        Age
                        <span className="text-red-500 text-[18px]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Age patient"
                          name="agepatient"
                          id="agepatient"
                          readOnly
                          className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-medium" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col mb-4">
                <FormField
                  control={form.control}
                  name="addresspatient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#A3AED0]">
                        Address
                        <span className="text-red-500 text-[18px]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Adress patient"
                          name="addresspatient"
                          id="addresspatient"
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
            <div className="flex flex-row">
              <div className="flex flex-col mb-4">
                <FormField
                  control={form.control}
                  name="phone_patient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#A3AED0]">
                        Phone Number
                        <span className="text-red-500 text-[18px]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone number patient"
                          name="phone_patient"
                          id="phone_patient"
                          className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-medium" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col mb-4">
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
                        <span className="text-red-500 text-[18px]">*</span>
                      </FormLabel>
                      <FormControl>
                        <div>
                          <select
                            {...field}
                            name="doctor"
                            id="doctor"
                            className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0  w-full"
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
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddPatientPage;
