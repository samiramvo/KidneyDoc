// "use client";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function ResetPassword() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const email = searchParams.get("email");
  
//   const [code, setCode] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const res = await fetch("/api/auth/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           emailuser: email,
//           code,
//           newPassword,
//         }),
//       });
      
//       const data = await res.json();
//       setMessage(data.message);
      
//       if (res.ok) {
//         setTimeout(() => {
//           router.push("/login");
//         }, 2000);
//       }
//     } catch (error) {
//       setMessage("Une erreur est survenue");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl mb-4">Réinitialisation du mot de passe</h1>
//       <form onSubmit={handleSubmit} className="max-w-md">
//         <input
//           type="text"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           placeholder="Code de réinitialisation"
//           className="w-full p-2 border rounded mb-4"
//           required
//         />
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           placeholder="Nouveau mot de passe"
//           className="w-full p-2 border rounded mb-4"
//           required
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
//         >
//           {isLoading ? "Traitement..." : "Réinitialiser le mot de passe"}
//         </button>
//       </form>
//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "@/styles/globals.css";
import Typewriter from "typewriter-effect";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ThemeSwitcher from "../ThemeSwitcher";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PasswordInput = ({ form, name, label, placeholder, showPassword, setShowPassword }) => {
  return (
    <div className="w-[70%]">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="mt-[30px] relative">
            <FormLabel className="text-[15px] text-violettitle font-medium mb-[5px] dark:text-white">
              {label}
              <span className="text-red-500 text-[18px]">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
                {...field}
              />
            </FormControl>
            <div className="absolute right-3 top-[65%] transform -translate-y-1/2 cursor-pointer">
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaEyeSlash className="cursor-pointer" size={24} color="#A3AED0" />
                ) : (
                  <FaEye className="cursor-pointer" size={24} color="#A3AED0" />
                )}
              </div>
            </div>
            <FormMessage className="text-red-400 font-medium" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    code: z.string().min(6, "Le code doit contenir 6 caractères").max(6),
    newPassword: z
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
        "Le mot de passe doit contenir au moins un caractère spécial @$!%*?&"
      ),
    confirmPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailuser: email,
          code: values.code,
          newPassword: values.newPassword,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Mot de passe réinitialisé avec succès");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark:bg-[#121212]">
      <div className="theme-switcher-wrapper">
        <ThemeSwitcher />
      </div>

      <div className="flex h-screen w-full font-dm_sans">
        <div className="md:w-[50%] rounded-bl-150% flex items-center justify-center">
          <div
            className="w-full h-full bg-cover bg-no-repeat rounded-customBlRadius"
            style={{
              backgroundImage: `url('/assets/images/Background 5.4 (1).png')`,
            }}
          >
            <div className="relative grid place-items-center">
              <Image
                className={"object-cover mt-[5%]"}
                src={"/assets/images/kidneysansfond3-fotor-202402081532.png"}
                alt="Login logo image"
                width="300"
                height="50"
              />
            </div>
            <div className="flex">
              <div className="relative grid place-items-center ml-[5%] mt-[5%]">
                <Image
                  className={"object-cover mt-[5%]"}
                  src={"/assets/images/sthetoscope-removebg-preview.png"}
                  alt="Sthetoscope image"
                  width="230"
                  height="50"
                />
              </div>

              <div className="relative ml-[10%] [letter-spacing:1px]">
                <h1 className="text-white font-dm_sans font-medium mt-40 text-[23px]">
                  <Typewriter
                    options={{
                      strings: [
                        "Réinitialisez votre mot de passe,",
                        "en toute sécurité",
                        "avec KidneyDoc",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                    className="text-shadow:0 0 20px 10px rgba(0, 0, 0, 0.7)"
                  />
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[50%]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="mt-[10%] ml-[15%]"
            >
              <h1 className="text-[25px] font-bold font-dm_sans text-violettitle dark:text-violetpur">
                Réinitialisation du mot de passe
              </h1>
              <p className="desc text-gray-600 dark:text-gray-300">
                Entrez le code reçu et votre nouveau mot de passe
              </p>

              <div className="mt-[30px]">
                <div className="w-[70%]">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[15px] text-violettitle font-medium mb-[5px] dark:text-white">
                          Code de réinitialisation
                          <span className="text-red-500 text-[18px]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Entrez le code reçu"
                            className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 font-medium" />
                      </FormItem>
                    )}
                  />
                </div>

                <PasswordInput
                  form={form}
                  name="newPassword"
                  label="Nouveau mot de passe"
                  placeholder="Min. 8 caractères"
                  showPassword={showNewPassword}
                  setShowPassword={setShowNewPassword}
                />

                <PasswordInput
                  form={form}
                  name="confirmPassword"
                  label="Confirmer le mot de passe"
                  placeholder="Confirmer le mot de passe"
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                />

                <div className="mt-[30px]">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`font-dm_sans buttonlog text-white text-center text-[15px] font-bold hover:shadow-xl hover:bg-[#4318FF] dark:hover:shadow-xl ${
                      isLoading
                        ? "opacity-85 cursor-not-allowed"
                        : "bg-[#4318FF] hover:bg-[#4318FF]"
                    }`}
                  >
                    {isLoading ? (
                      <LoaderCircle size={30} className="animate-spin" />
                    ) : (
                      "Réinitialiser le mot de passe"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}