"use client";
import { useState, useRef, useEffect } from "react";
import "@/styles/globals.css";
import "@/styles/globalelements.css";
import Image from "next/image";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
const SingleUserComponent = ({ user }) => {
  const formRef = useRef(null);
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
    isActive: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      passworduser: "",
      emailuser: "",
      phoneuser: "",
      isAdmin: "",
      isActive: "",
      useraddress: "",
    },
  });
  const { control, handleSubmit, reset, setValue } = form;

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
      setValue(
        "isActive",
        user.isActive !== undefined ? String(user.isActive) : ""
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
    formData.append("isActive", values.isActive);
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

        setTimeout(() => {
          router.push("/dashboard/administration");
          router.refresh();
        }, 3000);

        formRef.current?.reset();
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
    <div className="containersingleuser shadow-lg dark:bg-[#333]">
      <div className="formContaineruser">
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={handleSubmit(handleFormupdateSubmit)}
            className="formIduser"
          >
            <input type="hidden" name="id" value={user._id} />
            <div className="flex flex-row w-[100%]">
              <div className="flex flex-col w-[100%] mb-4">
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
                          placeholder={user.username}
                          value={field.value || ""}
                          onChange={field.onChange}
                          name="username"
                          id="username"
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
            <div className="flex flex-row w-[100%]">
              <div className="flex flex-col w-[100%] mb-4 ">
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
                          placeholder={user.emailuser}
                          value={field.value || ""}
                          onChange={field.onChange}
                          name="emailuser"
                          id="emailuser"
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
                <div className="flex flex-col mr-[30px] mb-4 w-[100%] relative">
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
                            className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0 w-[260px]"
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

                  <div className="absolute right-2 top-[60%] transform -translate-y-[50%]">
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
                <div className="flex flex-col mb-4 w-[100%]">
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
                            placeholder={user.phoneuser}
                            className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0 w-[260px]"
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
            </div>
            <div className=" flex flex-row w-[100%]">
              <div className="flex">
                <div className="flex flex-col mr-[30px] mb-4 w-[100%]">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-[#A3AED0]">
                          Is Active?
                        </FormLabel>
                        <FormControl>
                          <div>
                            <select
                              {...field}
                              name="isActive"
                              id="isActive"
                              value={field.value}
                              onChange={field.onChange}
                              className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674] focus-visible:ring-0 focus-visible:ring-offset-0 w-[260px]"
                            >
                              <option disabled value="">
                                Is Active?
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
                <div className="flex flex-col mb-4 w-[100%]">
                  <FormField
                    control={form.control}
                    name="isAdmin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-[#A3AED0]">
                          Is Admin?
                        </FormLabel>
                        <FormControl>
                          <div>
                            <select
                              {...field}
                              name="isAdmin"
                              id="isAdmin"
                              value={field.value}
                              onChange={field.onChange}
                              className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674] focus-visible:ring-0 focus-visible:ring-offset-0 w-[260px]"
                            >
                              <option disabled value="">
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
              </div>
            </div>

            <div className="flex flex-row w-[100%]">
              <div className="flex flex-col w-[100%] mb-4">
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
                          placeholder={user.useraddress}
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
      <div className="infoContaineruser">
        <div className="imguserContainer">
          <Image
            src={user.img || "/assets/images/upload.png"}
            alt=""
            width={200}
            height={200}
          />
        </div>

        <h1 className="font-bold text-[#2B3674] text-[17px] mb-8 dark:text-white">
          {user.username}
        </h1>
      </div>
    </div>
  );
};

export default SingleUserComponent;
