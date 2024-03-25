"use client"
import { useRef } from "react";
import { addUser } from "@/lib/actions";
import Link from "next/link";
import "@/styles/globalelements.css"
import "@/styles/globals.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUserPage = () => {
    const formRef = useRef(null);
    async function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            const response = await addUser(formData);
            if (response?.error) {
                toast.error(response.error);
            } else {
                toast.success('User is successfully registered!', {
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
                                        <button onClick={() => toast.dismiss()} className="bg-blue-500 hover:bg-blue-700 text-white p-[5px] rounded">Details</button>
                                    </Link>
                                </div>
                            </div>,
                            {
                                position: "top-right",
                                autoClose: 5000,
                                theme: "light"
                            }
                        );

                    }
                });
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
                <h1 className="font-bold text-[#2B3674] text-[26px] mb-8">New User</h1>
            </div>
            <div className="containeraddpatient  shadow-lg ">
                <form ref={formRef} onSubmit={handleFormSubmit} className="formaddpatient">
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="username">Name</label>
                            <input type="text" placeholder="username" name="username" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="emailuser">Email</label>
                            <input type="email" placeholder="email" name="emailuser" id="emailuser" required />
                        </div>
                    </div>
                    <div className="flex flex-row">

                        <div className="flex flex-col">
                            <label htmlFor="passworduser">Password</label>
                            <input
                                type="password"
                                placeholder="password"
                                name="passworduser"
                                id="passworduser"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phoneuser">Phone</label>
                            <input type="phone" placeholder="phone" name="phoneuser" id="phoneuser" />
                        </div>
                    </div>
                    <div className="flex flex-row">

                        <div className="flex flex-col">
                            <label htmlFor="admin">Admin or not</label>
                            <select name="isAdmin" id="isAdmin">
                                <option value={false}>
                                    Is Admin?
                                </option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="active">Active or not</label>
                            <select name="isActive" id="isActive">
                                <option value={true}>
                                    Is Active?
                                </option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>

                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="useraddress">Address</label>
                            <textarea
                                name="useraddress"
                                id="useraddress"
                                placeholder="Address"
                                className=" resize-none rounded-md p-2 w-[100%]"
                            ></textarea>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>

            </div>
        </div>

    );
};

export default AddUserPage;
