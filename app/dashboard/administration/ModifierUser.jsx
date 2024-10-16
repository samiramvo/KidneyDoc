"use client";
import { useState, useEffect } from "react";
import "@/styles/globals.css";
import "@/styles/globalelements.css";

import { updateUser } from "@/lib/actions";
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
import { UserEdit } from "iconsax-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendEmail } from "@/lib/resend";
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
const UpdateUserPage = ({ user, isOpen, onClose }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const formSchema = z.object({
    username: z.string().optional(),
    emailuser: z.string().email("L'adresse e-mail est invalide").optional(),
    passworduser: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .refine((value) => value === undefined || /[A-Z]/.test(value), {
        message: "Le mot de passe doit contenir au moins une lettre majuscule",
      })
      .refine((value) => value === undefined || /[a-z]/.test(value), {
        message: "Le mot de passe doit contenir au moins une lettre minuscule",
      })
      .refine((value) => value === undefined || /\d/.test(value), {
        message: "Le mot de passe doit contenir au moins un chiffre",
      })
      .refine((value) => value === undefined || /[@$!%*?&]/.test(value), {
        message:
          "Le mot de passe doit contenir au moins un caractère spécial @$!%*?&.",
      })
      .optional(),

    phoneuser: z
      .string()
      .refine((value) => value === undefined || isPossiblePhoneNumber(value), {
        message: "Le numéro de téléphone est invalide",
      })
      .refine((value) => value === undefined || isValidPhoneNumber(value), {
        message: "Le numéro de téléphone n'est pas valide dans ce pays",
      })
      .optional(),
    useraddress: z.string().optional(),
    isAdmin: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      passworduser: "",
      emailuser: "",
      phoneuser: "",
      isAdmin: "",
      useraddress: "",
    },
  });
  const { control, handleSubmit, setValue } = form;

  useEffect(() => {
    if (user) {
      setValue("username", user.username || "");
      setValue("emailuser", user.emailuser || "");
      setValue("phoneuser", user.phoneuser || "");
      const password = generateStrongPassword();
      setValue("passworduser", password);
      setValue(
        "isAdmin",
        user.isAdmin !== undefined ? String(user.isAdmin) : ""
      );
      setValue("useraddress", user.useraddress || "");
    }
  }, [user, setValue]);
  async function handleFormupdateSubmit(values) {
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("username", values.username);
    formData.append("emailuser", values.emailuser);
    formData.append("passworduser", values.passworduser);
    formData.append("phoneuser", values.phoneuser);
    formData.append("isAdmin", values.isAdmin);
    formData.append("useraddress", values.useraddress);
    setIsSubmitting(true);
    try {
      const response = await updateUser(formData);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("User is successfully updated!", {
          position: "top-right",
          theme: "light",
          bodyClassName: "custom-toast-body",
          style: {
            fontFamily: "DM Sans, sans-serif",
          },
        });

        // Send email with user update information
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
        setTimeout(() => {
          router.push("/dashboard/administration");
          router.refresh();
        }, 3000);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(
        "An error occurred while updating the user. Please try again."
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
                Modification de l&apos;Utilisateur {user?.username}
              </p>
            </div>
          </div>
          <div className="modal-form-body">
            <div className=" dark:bg-[#333]  ">
              <Form {...form}>
                <form
                  onSubmit={handleSubmit(handleFormupdateSubmit)}
                  className="form-layout"
                >
                  <input type="hidden" name="id" value={user?._id} />
                  <div className="form-row w-[100%] mb-4">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Username
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder={user?.username}
                                value={field.value || ""}
                                onChange={field.onChange}
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
                  </div>
                  <div className="form-row w-[100%]  mb-4">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="emailuser"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={user?.emailuser}
                                value={field.value || ""}
                                onChange={field.onChange}
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
                  <div className="form-row w-[100%] mb-4 ">
                    <div className="w-[48%] relative">
                      {/* <label htmlFor="passworduser" className="dark:text-[#A3AED0]">
                        Password
                      </label>
                      <input
                        type="password"
                        id="passworduser"
                        name="passworduser"
                        // placeholder={user.passworduser}
                        className="w-[260px]  dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
                      /> */}

                      <Controller
                        control={control}
                        name="passworduser"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                name="passworduser"
                                id="passworduser"
                                value={field.value || ""}
                                onChange={field.onChange}
                                className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
                                {...field}
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
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <PhoneInput
                                international
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder={user?.phoneuser}
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
                  <div className="form-row w-[100%] mb-4 ">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="useraddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#A3AED0]">
                              Address
                            </FormLabel>
                            <FormControl>
                              <textarea
                                name="useraddress"
                                id="useraddress"
                                placeholder={user?.useraddress}
                                className="resize-none rounded-md p-2 w-[100%] border border-input "
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

export default UpdateUserPage;
