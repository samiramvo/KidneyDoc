"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";

import "react-phone-number-input/style.css";
import { useState, useEffect } from "react";
import { addUser } from "@/lib/actions";
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
import { UserAdd } from "iconsax-react";
import { z } from "zod";
import { sendEmail } from "@/lib/resend";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/modalform";
function generateStrongPassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "@$!%*?&";
  const all = upper + lower + numbers + special;

  const getRandom = (str) => str[Math.floor(Math.random() * str.length)];

  let password = "";
  password += getRandom(upper);
  password += getRandom(lower);
  password += getRandom(numbers);
  password += getRandom(special);

  for (let i = 4; i < 12; i++) {
    password += getRandom(all);
  }

  return password;
}
const AddUserPage = ({ isOpen, onClose, user }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formSchema = z.object({
    username: z.string().min(1, "Le nom d'utilisateur est requis"),
    emailuser: z
      .string()
      .email("L'adresse e-mail est invalide")
      .min(1, "L'adresse e-mail est requise"),
    passworduser: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une lettre majuscule"
      )
      .regex(
        /[a-z]/,
        "Le mot de passe doit contenir au moins une lettre minuscule"
      )
      .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre")
      .regex(
        /[@$!%*?&]/,
        "Le mot de passe doit contenir au moins un caractère spécial @$!%*?&."
      ),
    phoneuser: z
      .string()
      .min(1, "Le numéro de téléphone est requis")
      .refine((value) => isPossiblePhoneNumber(value), {
        message: "Le numéro de téléphone est invalide",
      })
      .refine((value) => isValidPhoneNumber(value), {
        message: "Le numéro de téléphone n'est pas valide dans ce pays",
      }),
    useraddress: z.string().min(1, "L'adresse est requise"),
    isAdmin: z.string().min(1, "Le nom de l'admin est requis"),
    createdby: z.string().min(1, "Le nom du créateur est requis"),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      passworduser: "",
      emailuser: "",
      phoneuser: "",
      isAdmin: "",
      createdby: `Dr ${user.username}`,
      useraddress: "",
    },
  });
  const { control, handleSubmit, setValue } = form;

  useEffect(() => {
    const password = generateStrongPassword();
    setValue("passworduser", password);
  }, [setValue]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleFormSubmit(values) {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("emailuser", values.emailuser);
    formData.append("passworduser", values.passworduser);
    formData.append("phoneuser", values.phoneuser);
    formData.append("isAdmin", values.isAdmin);
    formData.append("createdby", values.createdby);
    formData.append("useraddress", values.useraddress);
    setIsSubmitting(true);
    try {
      const response = await addUser(formData);

      if (response?.error) {
        toast.error(response.error);
      } else {
        form.reset();
        toast.success("User is successfully registered!", {
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
                <div>Redirecting to User Details</div>
                <div className="mt-[10px]">
                  <Link href={`/dashboard/administration/${response}`}>
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

        // Send email with user information
        const emailResponse = await sendEmail(
          values.emailuser,
          values.username,
          values.passworduser,
          values.isAdmin
        );
        if (emailResponse.success) {
          toast.success("Email sent successfully !");
        } else {
          toast.error(emailResponse.error);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while adding the user. Please try again.");
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
                <UserAdd size={28} className="text-violettitle" />
              </span>
            </div>
            <div className="modal-form-role flex flex-align-item-center  pb-4">
              <p className="text-lg text-violettitle font-bold">
                Ajout d&apos;un nouveau Utilisateur
              </p>
            </div>
          </div>
          <div className="modal-form-body">
            <div className=" dark:bg-[#333]  ">
              <Form {...form}>
                <form
                  onSubmit={handleSubmit(handleFormSubmit)}
                  className="form-layout"
                >
                  <div className="form-row w-[100%] mb-4">
                    <div className="w-[48%]">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Name
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder=""
                                name="username"
                                id="username"
                                className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
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
                        name="emailuser"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Email
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder=""
                                name="emailuser"
                                id="emailuser"
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
                    <div className="w-[48%] relative">
                      <Controller
                        control={control}
                        name="passworduser"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Password
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder=""
                                name="passworduser"
                                id="passworduser"
                                className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />

                      <div className="absolute right-3 top-[65%] transform -translate-y-1/2 cursor-pointer">
                        <div onClick={togglePasswordVisibility}>
                          {showPassword ? (
                            <FaEyeSlash
                              className="cursor-pointer"
                              size={22}
                              color="#A3AED0"
                            />
                          ) : (
                            <FaEye
                              className="cursor-pointer"
                              size={22}
                              color="#A3AED0"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-[48%]">
                      <Controller
                        control={control}
                        name="phoneuser"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>
                              Phone
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
                      {/* <input
                type="phone"
                placeholder="phone"
                name="phoneuser"
                id="phoneuser"
                className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
              /> */}
                    </div>
                  </div>
                  <div className="form-row w-[100%] ">
                    <div className="w-[48%]">
                      <FormField
                        control={form.control}
                        name="isAdmin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Admin or not
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <div>
                                <select
                                  {...field}
                                  name="isAdmin"
                                  id="isAdmin"
                                  className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
                                  value={field.value || "default"}
                                >
                                  <option disabled value="default">
                                    Is Admin?
                                  </option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </select>
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-400 font-medium" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-[48%]">
                      <FormField
                        control={form.control}
                        name="createdby"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Created By
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                readOnly
                                value={`Dr ${user?.username}`}
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
                  <div className="form-row w-[100%]  mb-8">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="useraddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Address
                              <span className="text-red-500 text-[18px]">
                                *
                              </span>
                            </FormLabel>
                            <FormControl>
                              <textarea
                                name="useraddress"
                                id="useraddress"
                                placeholder=""
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
                      "Create"
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

export default AddUserPage;
