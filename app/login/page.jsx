// "use client"
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import "@/styles/globals.css"
// import Typewriter from 'typewriter-effect';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import ThemeSwitcher from "../ThemeSwitcher";
// import { authenticate } from "@/lib/actions";
// import toast from "react-hot-toast";

// const PasswordInput = () => {
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     return (
//         <div className="mt-[30px] relative">
//             <label htmlFor="password" className="text-[15px] text-violettitle font-medium mb-[5px] dark:text-white">
//                 Password
//                 <span className="text-violetpur text-[18px]">*</span>
//             </label>
//             <div className="relative password_input">
//                 <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Min. 8 characters"
//                     className="form_input password_input pl-[40px]"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     name="passworduser"
//                 />
//                 <div className="absolute inset-y-0 left-[68%] flex items-center">
//                     <div onClick={togglePasswordVisibility}>
//                         {showPassword ? (
//                             <FaEyeSlash className="cursor-pointer" size={23} color="#A3AED0" />
//                         ) : (
//                             <FaEye className="cursor-pointer" size={23} color="#A3AED0" />
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Login = () => {
//     const [isChecked, setIsChecked] = useState(false);
//     const handleCheckboxChange = () => {
//         setIsChecked(!isChecked);
//     };

//     async function connexion(event) {
//         event.preventDefault();
//         const formData = new FormData(event.currentTarget);

//         try {
//             const response = await authenticate(formData);
//             if (response?.error) {
//                 toast.error(response.error);
//             } else {
//                 toast.success('Successful connection'
//                 );
//             }
//         } catch (error) {
//             console.error("An error occurred:", error);
//             toast.error("Wrong credentials");
//         }
//     }

//     return (
//         <div className="dark:bg-[#121212]">
//             <div className="theme-switcher-wrapper">
//                 <ThemeSwitcher />
//             </div>

//             <div className="flex h-screen w-full font-dm_sans">
//                 <div className="md:w-[50%] rounded-bl-150% flex items-center justify-center">
//                     <div className=" w-full h-full bg-cover bg-no-repeat rounded-customBlRadius " style={{ backgroundImage: `url('/assets/images/Background 5.4 (1).png')` }}>
//                         <div className=" relative grid place-items-center">
//                             <Image
//                                 className={"object-cover mt-[5%]"}
//                                 src={"/assets/images/kidneysansfond3-fotor-202402081532.png"}
//                                 alt="Login logo image"
//                                 width="300"
//                                 height="50"
//                             />
//                         </div>
//                         <div className="flex">
//                             <div className=" relative grid place-items-center ml-[5%] mt-[5%]">
//                                 <Image
//                                     className={"object-cover mt-[5%]"}
//                                     src={"/assets/images/sthetoscope-removebg-preview.png"}
//                                     alt="Sthetoscope image"
//                                     width="230"
//                                     height="50"
//                                 />
//                             </div>

//                             <div className="relative ml-[10%] [letter-spacing:1px]">
//                                 <h1 className=" text-white font-dm_sans font-medium mt-40 text-[23px] ">
//                                     <Typewriter
//                                         options={{
//                                             strings: [' Access patient insights,', 'simplify workflows', ' KidneyDoc is here'],
//                                             autoStart: true,
//                                             loop: true,
//                                         }}
//                                         className='text-shadow:0 0 20px 10px rgba(0, 0, 0, 0.7)'
//                                     />

//                                 </h1>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//                 <div className=" md:w-[50%] ">

//                     <form onSubmit={connexion} >

//                         <div className="mt-[10%] ml-[15%]">
//                             <h1 className="text-[25px] font-bold font-dm_sans text-violettitle dark:text-violetpur">Log In</h1>
//                             <p className='desc'>
//                                 Enter your username and password to log in!
//                             </p>
//                             <div className="mt-[30px]">
//                                 <div className="flex flex-col">
//                                     <label htmlFor="email" className="text-[15px] text-violettitle font-medium mb-[5px] dark:text-white">Email
//                                         <span className="text-violetpur text-[18px]">*</span>
//                                     </label>
//                                     <input
//                                         type='email'
//                                         placeholder='mail@simple.com'
//                                         className='form_input'
//                                         name="emailuser"
//                                         id="emailuser"
//                                     />
//                                 </div>
//                                 <PasswordInput />

//                                 <div className="checkbox-wrapper mt-[30px] font-dm_sans flex items-center">
//                                     <input
//                                         type='checkbox'
//                                         id="checkbox"
//                                         checked={isChecked}
//                                         onChange={handleCheckboxChange}

//                                     />

//                                     <label htmlFor="checkbox" className="font-regular text-violettitle text-[16px] ml-2 relative dark:text-white">
//                                         Keep me logged in
//                                     </label>
//                                     <Link className="font-medium text-violetpur text-[16px] ml-[25%]" href="#">Forget password?</Link>
//                                 </div>
//                                 <div className="mt-[30px]">

//                                     <button type="submit" className="font-dm_sans buttonlog text-white text-center text-[15px] font-bold hover:shadow-xl dark:hover:shadow-xl">Log In</button>

//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                 </div>

//             </div>

//         </div>
//     )
// }

// export default Login

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
import { zodResolver } from "@hookform/resolvers/zod";

const PasswordInput = ({ form, showPassword, setShowPassword }) => {
  return (
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
              className="form_input password_input pl-[40px] focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0"
              {...field}
            />
          </FormControl>
          <div className="absolute right-2 top-[60%] transform -translate-y-[50%] left-[68%]">
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
  );
};

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // const formSchema = z.object({
  //   emailuser: z.string().email("Veuillez entrer un email correct").min(1),
  //   passworduser: z.string().min(8, "Veuillez entrer un mot de passe correct"),
  // });

  // const form = useForm({
  //   resolver: zodResolver(formSchema),
  // });

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
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Successful connection");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Wrong credentials");
    } finally {
      setIsSubmitting(false);
    }
  }

  // async function sendOtp(email) {
  //   const response = await fetch("/api/send-otp", {
  //     method: "POST",
  //     body: JSON.stringify({ email }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to send OTP");
  //   }
  // }

  // async function handleOtpSubmit(e) {
  //   e.preventDefault();

  //   const response = await verifyOtp(otp); // Vérification de l'OTP
  //   if (response.success) {
  //     toast.success("OTP vérifié avec succès !");
  //     router.push("/dashboard"); // Rediriger vers le tableau de bord
  //   } else {
  //     toast.error("OTP incorrect");
  //   }
  // }

  // async function verifyOtp(otp) {
  //   const response = await fetch("/api/verify-otp", {
  //     method: "POST",
  //     body: JSON.stringify({ otp }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   return await response.json();
  // }

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
                            className="form_input focus:border-[#2B3674] focus:ring-7 focus:ring-[#2B3674]   focus-visible:ring-0 focus-visible:ring-offset-0"
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
                      isSubmitting
                        ? "opacity-85 cursor-not-allowed"
                        : "bg-[#4318FF] hover:bg-[#4318FF]"
                    }`}
                    // disabled={isSubmitting}
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
        {/* {showOtpForm && (
          <form onSubmit={handleOtpSubmit} className="mt-4">
            <h2 className="text-lg font-bold">Entrez votre OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form_input mt-2"
              placeholder="Votre OTP"
              required
            />
            <button type="submit" className="mt-4 buttonlog">
              Vérifier OTP
            </button>
          </form>
        )} */}
      </div>
    </div>
  );
};

export default Login;
