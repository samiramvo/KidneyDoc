"use client"
import { useRef } from "react";
import { addPatient } from "@/lib/actions";
import Link from "next/link";
import "@/styles/globalelements.css"
import "@/styles/globals.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPatientPage = () => {
    const formRef = useRef(null);
    async function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            const response = await addPatient(formData);
            if (response?.error) {
                toast.error(response.error);
            } else {
                toast.success('Patient is successfully registered!', {
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
                                <div>
                                    Redirecting to Patient Details
                                </div>
                                <div className="mt-[10px]">
                                    <Link href={`/dashboard/patients/${response}`}>
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
            toast.error("An error occurred while adding the patient. Please try again.");
        }
    }

    return (
        <div>
            <div>
                <h1 className="font-bold text-[#2B3674] text-[26px] mb-8">New Patient</h1>
            </div>
            <div className="containeraddpatient shadow-lg ">
                <div>
                    <h1 className="font-medium text-[#2B3674] text-[17px] mt-4 mb-8">Basic Information</h1>
                </div>
                <form ref={formRef} onSubmit={handleFormSubmit} className="formaddpatient">
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="name_patient">Last Name</label>
                            <input type="text" placeholder="Nom patient" name="name_patient" id="name_patient" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="prenom_patient">First Name</label>
                            <input type="text" placeholder="Prenom patient" name="prenom_patient" id="prenom_patient" required />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender" required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="birth">Date of birth</label>
                            <input type="date" name="birth" id="birth" required />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="agepatient">Age</label>
                            <input type="number" placeholder="Age patient" name="agepatient" id="agepatient" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="addresspatient">Address</label>
                            <input type="text" placeholder="Adress patient" name="addresspatient" id="addresspatient" required />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="phone_patient">Phone Number</label>
                            <input type="tel" placeholder="Phone number patient" name="phone_patient" id="phone_patient" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="doctor">Doctor Assigned</label>
                            <select name="doctor" id="doctor" required>
                                <option>Dr VIGAN</option>
                                <option>Dr Pascal</option>
                            </select>
                        </div>
                    </div>
                    <button>Submit</button>

                </form>

            </div>
        </div>

    );
};

export default AddPatientPage;
