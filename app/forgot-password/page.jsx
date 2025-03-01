// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const res = await fetch("/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ emailuser: email }),
//       });
      
//       const data = await res.json();
//       setMessage(data.message);
      
//       if (res.ok) {
//         router.push(`/reset-password?email=${encodeURIComponent(email)}`);
//       }
//     } catch (error) {
//       setMessage("Une erreur est survenue");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl mb-4">Mot de passe oublié</h1>
//       <form onSubmit={handleSubmit} className="max-w-md">
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Votre email"
//           className="w-full p-2 border rounded mb-4"
//           required
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
//         >
//           {isLoading ? "Envoi en cours..." : "Envoyer le code"}
//         </button>
//       </form>
//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/styles/globals.css";
import Typewriter from "typewriter-effect";
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

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    emailuser: z.string().email("Veuillez entrer un email correct").min(1),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailuser: values.emailuser }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(data.message);
        router.push(`/reset-password?email=${encodeURIComponent(values.emailuser)}`);
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
        {/* Partie gauche avec l'image de fond */}
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
                        "Récupérez votre accès,",
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

        {/* Partie droite avec le formulaire */}
        <div className="md:w-[50%]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="mt-[10%] ml-[15%]"
            >
              <h1 className="text-[25px] font-bold font-dm_sans text-violettitle dark:text-violetpur">
                Mot de passe oublié
              </h1>
              <p className="desc text-gray-600 dark:text-gray-300">
                Entrez votre email pour recevoir un code de réinitialisation
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
                              placeholder="votre@email.com"
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
                      "Envoyer le code"
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