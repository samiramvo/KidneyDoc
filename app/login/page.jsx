"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "@/styles/globals.css"
import Typewriter from 'typewriter-effect';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ThemeSwitcher from "../ThemeSwitcher";
import { authenticate } from "@/lib/actions";
import toast from "react-hot-toast";

const PasswordInput = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="mt-[30px] relative">
            <label htmlFor="password" className="text-[15px] text-violettitle font-medium mb-[5px] dark:text-white">
                Password
                <span className="text-violetpur text-[18px]">*</span>
            </label>
            <div className="relative password_input">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className="form_input password_input pl-[40px]"
                    value={password}
                    onChange={handlePasswordChange}
                    name="passworduser"
                />
                <div className="absolute inset-y-0 left-[68%] flex items-center">
                    <div onClick={togglePasswordVisibility}>
                        {showPassword ? (
                            <FaEyeSlash className="cursor-pointer" size={23} color="#A3AED0" />
                        ) : (
                            <FaEye className="cursor-pointer" size={23} color="#A3AED0" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Login = () => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    async function connexion(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            const response = await authenticate(formData);
            if (response?.error) {
                toast.error(response.error);
            } else {
                toast.success('Successful connection'
                );
            }
        } catch (error) {
            console.error("An error occurred:", error);
            toast.error("Wrong credentials");
        }
    }

    return (
        <div className="dark:bg-[#121212]">
            <div className="theme-switcher-wrapper">
                <ThemeSwitcher />
            </div>

            <div className="flex h-screen w-full font-dm_sans">
                <div className="md:w-[50%] rounded-bl-150% flex items-center justify-center">
                    <div className=" w-full h-full bg-cover bg-no-repeat rounded-customBlRadius " style={{ backgroundImage: `url('/assets/images/Background 5.4 (1).png')` }}>
                        <div className=" relative grid place-items-center">
                            <Image
                                className={"object-cover mt-[5%]"}
                                src={"/assets/images/kidneysansfond3-fotor-202402081532.png"}
                                alt="Login logo image"
                                width="300"
                                height="50"
                            />
                        </div>
                        <div className="flex">
                            <div className=" relative grid place-items-center ml-[5%] mt-[5%]">
                                <Image
                                    className={"object-cover mt-[5%]"}
                                    src={"/assets/images/sthetoscope-removebg-preview.png"}
                                    alt="Sthetoscope image"
                                    width="230"
                                    height="50"
                                />
                            </div>

                            <div className="relative ml-[10%] [letter-spacing:1px]">
                                <h1 className=" text-white font-dm_sans font-medium mt-40 text-[23px] ">
                                    <Typewriter
                                        options={{
                                            strings: [' Access patient insights,', 'simplify workflows', ' KidneyDoc is here'],
                                            autoStart: true,
                                            loop: true,
                                        }}
                                        className='text-shadow:0 0 20px 10px rgba(0, 0, 0, 0.7)'
                                    />

                                </h1>
                            </div>
                        </div>

                    </div>
                </div>
                <div className=" md:w-[50%] ">

                    <form onSubmit={connexion} >

                        <div className="mt-[10%] ml-[15%]">
                            <h1 className="text-[25px] font-bold font-dm_sans text-violettitle dark:text-violetpur">Log In</h1>
                            <p className='desc'>
                                Enter your username and password to log in!
                            </p>
                            <div className="mt-[30px]">
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-[15px] text-violettitle font-medium mb-[5px] dark:text-white">Email
                                        <span className="text-violetpur text-[18px]">*</span>
                                    </label>
                                    <input
                                        type='email'
                                        placeholder='mail@simple.com'
                                        className='form_input'
                                        name="emailuser"
                                        id="emailuser"
                                    />
                                </div>
                                <PasswordInput />

                                <div className="checkbox-wrapper mt-[30px] font-dm_sans flex items-center">
                                    <input
                                        type='checkbox'
                                        id="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}

                                    />

                                    <label htmlFor="checkbox" className="font-regular text-violettitle text-[16px] ml-2 relative dark:text-white">
                                        Keep me logged in
                                    </label>
                                    <Link className="font-medium text-violetpur text-[16px] ml-[25%]" href="#">Forget password?</Link>
                                </div>
                                <div className="mt-[30px]">

                                    <button type="submit" className="font-dm_sans buttonlog text-white text-center text-[15px] font-bold hover:shadow-xl dark:hover:shadow-xl">Log In</button>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>


            </div>


        </div>
    )
}

export default Login