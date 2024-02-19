"use client"
import Image from "next/image";
import Link from "next/link";
import "@/styles/globals.css"
import Typewriter from 'typewriter-effect';


const Login = () => {
    return (
        <div>

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
                <div className=" md:w-[50%]">

                    <form action="/login" method="post">

                        <div className="mt-[10%] ml-[15%]">
                            <h1 className="text-[25px] font-bold font-dm_sans text-violettitle">Log In</h1>
                            <p className='desc'>
                                Enter your email and password to log in!
                            </p>
                            <div className="mt-[30px]">
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-[15px] text-violettitle font-medium mb-[5px]">Email
                                        <span className="text-violetpur text-[18px]">*</span>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='mail@simple.com'
                                        required
                                        className='form_input'
                                    />
                                </div>
                                <div className="mt-[30px]">
                                    <div className="flex flex-col">
                                        <label htmlFor="password" className="text-[15px] text-violettitle  font-medium mb-[5px]">Password
                                            <span className="text-violetpur text-[18px]">*</span>
                                        </label>
                                        <div className="password_input">
                                            <input
                                                type='password'
                                                placeholder='Min. 8 characters'
                                                required
                                                className='form_input password_input'
                                            />
                                            <div >
                                                <Image
                                                    className="cursor-pointer"
                                                    src={"/assets/icons/remove_red_eye.png"}
                                                    alt="Eye icon"
                                                    width="32"
                                                    height="22"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="checkbox-wrapper mt-[30px] font-dm_sans">
                                    <input
                                        type='checkbox'
                                        id="checkbox"
                                    />
                                    <label className="font-regular text-violettitle text-[16px] ml-2">Keep me logged in</label>
                                    <Link className="font-medium text-violetpur text-[16px] ml-[25%]" href="#">Forget password?</Link>
                                </div>
                                <div className="mt-[30px]">
                                    <Link href="/loginfacial">
                                        <button type="submit" className="font-dm_sans buttonlog text-white text-center text-[15px] font-bold">Log In</button>
                                    </Link>
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