"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRef, useState, useEffect } from "react";
import { addUser } from "@/lib/actions";
import Link from "next/link";
import "@/styles/globalelements.css";
import "@/styles/globals.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import nodemailer from "nodemailer";

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
const AddUserPage = () => {
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  // // Fonction pour envoyer l'e-mail en appelant l'API dédiée
  // const sendEmail = async (email, password) => {
  //   try {
  //     const response = await fetch("/api/sendemail", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to send email");
  //     }
  //     const data = await response.json();
  //     toast.success("Email envoyé avec succès !");
  //   } catch (error) {
  //     console.error("An error occurred while sending email:", error);
  //     toast.error(
  //       "Une erreur s'est produite lors de l'envoi de l'e-mail. Veuillez réessayer."
  //     );
  //   }
  // };
  useEffect(() => {
    setGeneratedPassword(generateStrongPassword());
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await addUser(formData);

      if (response?.error) {
        toast.error(response.error);
      } else {
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
        // sendEmail(formData.get("emailuser"), generatedPassword);
        formRef.current?.reset();
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while adding the user. Please try again.");
    }
  }

  return (
    <div>
      <div>
        <h1 className="font-bold text-[#2B3674] text-[26px] mb-2 dark:text-white">
          New User
        </h1>
      </div>
      <div className="containeraddpatient  shadow-lg dark:bg-[#333] dark:shadow-lg">
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="formaddpatient"
        >
          <div className="flex flex-row">
            <div className="flex flex-col">
              <label htmlFor="username" className="dark:text-[#A3AED0]">
                Name
                <span className="text-violetpur text-[18px]">*</span>
              </label>
              <input
                type="text"
                placeholder="username"
                name="username"
                className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="emailuser" className="dark:text-[#A3AED0]">
                Email
                <span className="text-violetpur text-[18px]">*</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="emailuser"
                id="emailuser"
                className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
                required
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col relative">
              <label htmlFor="passworduser" className="dark:text-[#A3AED0]">
                Password
                <span className="text-violetpur text-[18px]">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="passworduser"
                id="passworduser"
                value={generatedPassword}
                onChange={(e) => setGeneratedPassword(e.target.value)}
                required
                className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
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
            <div className="flex flex-col">
              <label htmlFor="phoneuser" className="dark:text-[#A3AED0]">
                Phone
                <span className="text-violetpur text-[18px]">*</span>
              </label>
              <PhoneInput
                international
                defaultCountry="BJ"
                name="phoneuser"
                value={phoneNumber}
                onChange={setPhoneNumber}
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
          <div className="flex flex-row">
            <div className="flex flex-col">
              <label htmlFor="admin" className="dark:text-[#A3AED0]">
                Admin or not
                <span className="text-violetpur text-[18px]">*</span>
              </label>
              <select
                name="isAdmin"
                id="isAdmin"
                className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
              >
                <option value={false}>Is Admin?</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="active" className="dark:text-[#A3AED0]">
                Active or not
                <span className="text-violetpur text-[18px]">*</span>
              </label>
              <select
                name="isActive"
                id="isActive"
                className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
              >
                <option value={true}>Is Active?</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <label htmlFor="useraddress" className="dark:text-[#A3AED0]">
                Address
                <span className="text-violetpur text-[18px]">*</span>
              </label>
              <textarea
                name="useraddress"
                id="useraddress"
                placeholder="Address"
                className=" resize-none rounded-md p-2 w-[100%] dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
              ></textarea>
            </div>
          </div>
          <button type="submit" className="hover:shadow-xl">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;
