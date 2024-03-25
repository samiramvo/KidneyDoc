import '@/styles/globals.css'
import '@/styles/globalelements.css'
import { FaNotesMedical } from "react-icons/fa";
import { fetchPatient } from '@/lib/data';
import { updatePatient } from '@/lib/actions';

const SinglePatientPage = async ({ params }) => {
    const { id } = params;
    const patient = await fetchPatient(id);
    return (
        <>
            <div className="containersingleuser  shadow-lg dark:bg-[#333] ">

                <div className="formContaineruser">
                    <form action={updatePatient} className='formIduser'>
                        <input type="hidden" name="id" value={patient.id} />
                        <div className="flex flex-row w-[100%]">
                            <div className="flex">
                                <div className="flex flex-col mr-[30px] ">
                                    <label htmlFor='name_patient' className="dark:text-[#A3AED0]">Last name</label>
                                    <input type="text" id='name_patient' name="name_patient" placeholder={patient.name_patient} className='w-[260px] dark:bg-[#121212] dark:opacity-[80%] dark:border-none ' />
                                </div>
                                <div className="flex flex-col ">
                                    <label htmlFor='prenom_patient' className="dark:text-[#A3AED0]">First Name</label>
                                    <input type="text" id='prenom_patient' name="prenom_patient" placeholder={patient.prenom_patient} className='w-[260px] dark:bg-[#121212] dark:opacity-[80%] dark:border-none' />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[100%]">
                            <div className="flex flex-col w-[100%] ">
                                <label htmlFor='idpatient' className="dark:text-[#A3AED0]">Id</label>
                                <input type="text" id='idpatient' name="idpatient" placeholder={patient.id} className='dark:bg-[#121212] dark:opacity-[80%] dark:border-none' readOnly />
                            </div>
                        </div>
                        <div className=" flex flex-row w-[100%]">
                            <div className="flex">
                                <div className="flex flex-col mr-[30px]">
                                    <label htmlFor='genderpatient' className="dark:text-[#A3AED0]">Gender</label>
                                    <select name="genderpatient" id="genderpatient" className="w-[260px] dark:bg-[#121212] dark:opacity-[80%] dark:border-none">
                                        <option value="Male" selected={patient.gender}>Male</option>
                                        <option value="Female" selected={patient.gender}>Female</option>
                                    </select>
                                </div>
                                <div className="flex flex-col ">
                                    <label htmlFor='agepatient' className="dark:text-[#A3AED0]">Age</label>
                                    <input type="number" name="agepatient" id="agepatient" className="w-[260px] dark:bg-[#121212]  dark:opacity-[80%] dark:border-none" placeholder={patient.agepatient} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[100%]">
                            <div className="flex flex-col w-[100%]">
                                <label htmlFor='phone_patient' className="dark:text-[#A3AED0]">Phone</label>
                                <input type="text" id="phone_patient" name="phone_patient" placeholder={patient.phone_patient} className='dark:bg-[#121212] dark:opacity-[80%] dark:border-none' />
                            </div>
                        </div>
                        <div className="flex flex-row w-[100%]">
                            <div className="flex flex-col w-[100%] ">
                                <label htmlFor='addresspatient' className="dark:text-[#A3AED0]">Address</label>
                                <textarea type="text" id="addresspatient" name="addresspatient" placeholder={patient.addresspatient} className='dark:bg-[#121212] dark:opacity-[80%] dark:border-none' />
                            </div>
                        </div>
                        <button>Update</button>
                    </form>
                </div >
                <div className="separator dark:bg-white dark:w-[0.2px]">
                </div>

                <div className='mt-[5%] '>
                    <div className='flex py-6 px-12 bg-[#F4F7FE] mb-[40%] rounded-md hover:bg-[#593DFF] text-white'>
                        <div className=" relative grid place-items-center ">
                            <FaNotesMedical className='w-[75%] h-[75%] text-[#593DFF] mr-8' />
                        </div>
                        <div className='mt-[8%] text-[#1B2559]'>Consultation</div>
                    </div>
                    <div className='flex  py-6 px-12 bg-[#F4F7FE] mb-[40%] rounded-md'>
                        <div className=" relative grid place-items-center">
                            <FaNotesMedical className='w-[75%] h-[75%] text-[#593DFF] mr-8' />
                        </div>
                        <div className='mt-[8%] text-[#1B2559]'>Observation</div>
                    </div>
                    <div className='flex py-6 px-12 bg-[#F4F7FE] rounded-md'>
                        <div className=" relative grid place-items-center">
                            <FaNotesMedical className='w-[75%] h-[75%] text-[#593DFF] mr-8' />
                        </div>
                        <div className='mt-[8%] text-[#1B2559]'>Analyse</div>
                    </div>
                </div>
            </div >

        </>
    );
};

export default SinglePatientPage;
