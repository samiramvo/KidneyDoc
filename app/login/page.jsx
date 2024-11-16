"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "@/styles/globals.css";
import Typewriter from "typewriter-effect";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ThemeSwitcher from "../ThemeSwitcher";
import { authenticate } from "@/lib/actions";
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
// import TwoFactorModal from "./OTP";
import { zodResolver } from "@hookform/resolvers/zod";

const PasswordInput = ({ form, showPassword, setShowPassword }) => {
  return (
    <div className="w-[70%]">
      <FormField
        control={form.control}
        name="passworduser"
        render={({ field }) => (
          <FormItem className="mt-[30px] relative">
            <FormLabel className="text-[15px] text-violettitle font-medium mb-[5px] dark:text-white">
              Password
              <span className="text-red-500 text-[18px]">*</span>
            </FormLabel>
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
                {...field}
              />
            </FormControl>
            <div className="absolute right-3 top-[65%] transform -translate-y-1/2 cursor-pointer">
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaEyeSlash
                    className="cursor-pointer"
                    size={24}
                    color="#A3AED0"
                  />
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

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(null);

  const [isBlocked, setIsBlocked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const formSchema = z.object({
    emailuser: z.string().email("Veuillez entrer un email correct").min(1),
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
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function connexion(values) {
    const formData = new FormData();
    formData.append("emailuser", values.emailuser);
    formData.append("passworduser", values.passworduser);
    setIsSubmitting(true);

    try {
      const response = await authenticate(formData);
      console.log("Réponse du serveur:", response);

      if (response?.error) {
        console.log("Erreur reçue:", response.error);
        if (response.error.includes("bloqué")) {
          setIsBlocked(true);
          toast.error(
            "Utilisateur bloqué. Veuillez réessayer après 5 minutes."
          );
        } else {
          const matches = response.error.match(
            /Il vous reste (\d+) tentatives/
          );
          if (matches) {
            const attemptsLeft = parseInt(matches[1], 10);
            toast.error(
              `Identifiants incorrects ! Il vous reste ${attemptsLeft} tentatives.`
            );
          }
        }
      } else {
        toast.success("Connexion réussie");
        setIsBlocked(false);
      }
    } catch (error) {
      console.error("Une erreur s'est produite:", error);
      toast.error("Une erreur s'est produite lors de la connexion.");
    } finally {
      setIsSubmitting(false);
    }
  }
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
                        " Access patient insights,",
                        "simplify workflows",
                        " KidneyDoc is here",
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
              onSubmit={form.handleSubmit(connexion)}
              className="mt-[10%] ml-[15%]"
            >
              <h1 className="text-[25px] font-bold font-dm_sans text-violettitle dark:text-violetpur">
                Log In
              </h1>
              <p className="desc">
                Enter your username and password to log in!
              </p>
              <div className="mt-[30px]">
                <div className="flex flex-col">
                  <div className="w-[70%]">
                    <FormField
                      control={form.control}
                      name="emailuser"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[15px] text-violettitle font-medium mb-[5px] dark:text-white">
                            Email
                            <span className="text-red-500 text-[18px]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="mail@simple.com"
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
                <PasswordInput
                  form={form}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <div className="checkbox-wrapper mt-[30px] font-dm_sans flex items-center">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="checkbox"
                    className="font-regular text-violettitle text-[16px] ml-2 relative dark:text-white"
                  >
                    Keep me logged in
                  </label>
                  <Link
                    className="font-medium text-violetpur text-[16px] ml-[25%]"
                    href="#"
                  >
                    Forget password?
                  </Link>
                </div>
                <div className="mt-[30px]">
                  <Button
                    type="submit"
                    className={`font-dm_sans buttonlog text-white text-center text-[15px] font-bold hover:shadow-xl hover:bg-[#4318FF] dark:hover:shadow-xl ${
                      isSubmitting || isBlocked
                        ? "opacity-85 cursor-not-allowed"
                        : "bg-[#4318FF] hover:bg-[#4318FF]"
                    }`}
                  >
                    {isSubmitting ? (
                      <LoaderCircle size={30} className="animate-spin" />
                    ) : (
                      "Log In"
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
};

export default Login;

// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import "@/styles/globals.css";
// import Typewriter from "typewriter-effect";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import ThemeSwitcher from "../ThemeSwitcher";
// import { authenticate } from "@/lib/actions";
// import toast from "react-hot-toast";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { LoaderCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// // import TwoFactorModal from "./OTP";
// import { zodResolver } from "@hookform/resolvers/zod";

// const PasswordInput = ({ form, showPassword, setShowPassword }) => {
//   return (
//     <div className="w-[70%]">
//       <FormField
//         control={form.control}
//         name="passworduser"
//         render={({ field }) => (
//           <FormItem className="mt-[30px] relative">
//             <FormLabel className="text-[15px] text-violettitle font-medium mb-[5px] dark:text-white">
//               Password
//               <span className="text-red-500 text-[18px]">*</span>
//             </FormLabel>
//             <FormControl>
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Min. 8 characters"
//                 className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
//                 {...field}
//               />
//             </FormControl>
//             <div className="absolute right-3 top-[65%] transform -translate-y-1/2 cursor-pointer">
//               <div onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? (
//                   <FaEyeSlash
//                     className="cursor-pointer"
//                     size={24}
//                     color="#A3AED0"
//                   />
//                 ) : (
//                   <FaEye className="cursor-pointer" size={24} color="#A3AED0" />
//                 )}
//               </div>
//             </div>
//             <FormMessage className="text-red-400 font-medium" />
//           </FormItem>
//         )}
//       />
//     </div>
//   );
// };

// const Login = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showOtpForm, setShowOtpForm] = useState(false);
//   const [otpToken, setOtpToken] = useState("");
//   const [qrSecret, setQrSecret] = useState("");
//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   const formSchema = z.object({
//     emailuser: z.string().email("Veuillez entrer un email correct").min(1),
//     passworduser: z
//       .string()
//       .min(8, "Le mot de passe doit contenir au moins 8 caractères")
//       .regex(
//         /[A-Z]/,
//         "Le mot de passe doit contenir au moins une lettre majuscule"
//       )
//       .regex(
//         /[a-z]/,
//         "Le mot de passe doit contenir au moins une lettre minuscule"
//       )
//       .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre")
//       .regex(
//         /[@$!%*?&]/,
//         "Le mot de passe doit contenir au moins un caractère spécial @$!%*?&."
//       ),
//   });

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//   });
//   // Fonction pour récupérer le QR code et le secret 2FA
//   const fetchQrCode = async () => {
//     try {
//       const qrResponse = await fetch("/api/2fa/qrcode");
//       const qrData = await qrResponse.json();
//       setQrSecret(qrData.secret);
//     } catch (error) {
//       console.error("Erreur lors de la récupération du QR code:", error);
//     }
//   };

//   const handleOtpVerification = async () => {
//     try {
//       const response = await fetch(
//         `/api/2fa/verify?secret=${qrSecret}&token=${otpToken}`
//       );
//       const data = await response.json();
//       if (data.verified) {
//         // Mettre à jour l'état pour indiquer que l'OTP est vérifié
//         setIsOtpVerified(true);
//         toast.success("OTP vérifié avec succès");
//       } else {
//         toast.error("Invalid OTP");
//       }
//     } catch (error) {
//       console.error("Erreur lors de la vérification de l'OTP:", error);
//     }
//   };
//   async function connexion(values) {
//     const formData = new FormData();
//     formData.append("emailuser", values.emailuser);
//     formData.append("passworduser", values.passworduser);
//     setIsSubmitting(true);

//     try {
//       console.log("Tentative de connexion avec:", values);
//       const response = await authenticate(formData);
//       console.log("Réponse de l'authentification:", response);

//       if (response?.error) {
//         toast.error(response.error);
//       } else {
//         toast.success("Successful connection");
//         // Récupérer le secret 2FA et afficher le formulaire OTP
//         await fetchQrCode();
//         setShowOtpForm(true);
//       }
//     } catch (error) {
//       console.error("Une erreur s'est produite:", error);
//       toast.error("Wrong credentials");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }
//   return (
//     <div className="dark:bg-[#121212]">
//       <div className="theme-switcher-wrapper">
//         <ThemeSwitcher />
//       </div>

//       <div className="flex h-screen w-full font-dm_sans">
//         <div className="md:w-[50%] rounded-bl-150% flex items-center justify-center">
//           <div
//             className="w-full h-full bg-cover bg-no-repeat rounded-customBlRadius"
//             style={{
//               backgroundImage: `url('/assets/images/Background 5.4 (1).png')`,
//             }}
//           >
//             <div className="relative grid place-items-center">
//               <Image
//                 className={"object-cover mt-[5%]"}
//                 src={"/assets/images/kidneysansfond3-fotor-202402081532.png"}
//                 alt="Login logo image"
//                 width="300"
//                 height="50"
//               />
//             </div>
//             <div className="flex">
//               <div className="relative grid place-items-center ml-[5%] mt-[5%]">
//                 <Image
//                   className={"object-cover mt-[5%]"}
//                   src={"/assets/images/sthetoscope-removebg-preview.png"}
//                   alt="Sthetoscope image"
//                   width="230"
//                   height="50"
//                 />
//               </div>

//               <div className="relative ml-[10%] [letter-spacing:1px]">
//                 <h1 className="text-white font-dm_sans font-medium mt-40 text-[23px]">
//                   <Typewriter
//                     options={{
//                       strings: [
//                         " Access patient insights,",
//                         "simplify workflows",
//                         " KidneyDoc is here",
//                       ],
//                       autoStart: true,
//                       loop: true,
//                     }}
//                     className="text-shadow:0 0 20px 10px rgba(0, 0, 0, 0.7)"
//                   />
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="md:w-[50%]">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(connexion)}
//               className="mt-[10%] ml-[15%]"
//             >
//               <h1 className="text-[25px] font-bold font-dm_sans text-violettitle dark:text-violetpur">
//                 Log In
//               </h1>
//               <p className="desc">
//                 Enter your username and password to log in!
//               </p>
//               <div className="mt-[30px]">
//                 <div className="flex flex-col">
//                   <div className="w-[70%]">
//                     <FormField
//                       control={form.control}
//                       name="emailuser"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-[15px] text-violettitle font-medium mb-[5px] dark:text-white">
//                             Email
//                             <span className="text-red-500 text-[18px]">*</span>
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               type="email"
//                               placeholder="mail@simple.com"
//                               className="form-input2 bg-white focus-visible:ring-background focus-visible:ring-1"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage className="text-red-400 font-medium" />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>
//                 <PasswordInput
//                   form={form}
//                   showPassword={showPassword}
//                   setShowPassword={setShowPassword}
//                 />
//                 <div className="checkbox-wrapper mt-[30px] font-dm_sans flex items-center">
//                   <input
//                     type="checkbox"
//                     id="checkbox"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label
//                     htmlFor="checkbox"
//                     className="font-regular text-violettitle text-[16px] ml-2 relative dark:text-white"
//                   >
//                     Keep me logged in
//                   </label>
//                   <Link
//                     className="font-medium text-violetpur text-[16px] ml-[25%]"
//                     href="#"
//                   >
//                     Forget password?
//                   </Link>
//                 </div>
//                 <div className="mt-[30px]">
//                   <Button
//                     type="submit"
//                     className={`font-dm_sans buttonlog text-white text-center text-[15px] font-bold hover:shadow-xl hover:bg-[#4318FF] dark:hover:shadow-xl ${
//                       isSubmitting
//                         ? "opacity-85 cursor-not-allowed"
//                         : "bg-[#4318FF] hover:bg-[#4318FF]"
//                     }`}
//                     // disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <LoaderCircle size={30} className="animate-spin" />
//                     ) : (
//                       "Log In"
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </Form>
//         </div>
//         {showOtpForm && (
//           <div className="otp-form">
//             <h2>Scan the QR Code with Google Authenticator</h2>
//             <img src={`/api/2fa/qrcode?secret=${qrSecret}`} alt="QR Code" />
//             <input
//               type="text"
//               value={otpToken}
//               onChange={(e) => setOtpToken(e.target.value)}
//               placeholder="Enter OTP"
//             />
//             <Button onClick={handleOtpVerification}>Verify OTP</Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
