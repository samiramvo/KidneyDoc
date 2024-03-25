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
            <div className="containersingleuser  shadow-lg">

                <div className="formContaineruser">
                    <form action={updatePatient} className='formIduser'>
                        <input type="hidden" name="id" value={patient.id} />
                        <div className="flex flex-row w-[100%]">
                            <div className="flex">
                                <div className="flex flex-col mr-[30px] ">
                                    <label htmlFor='name_patient'>Last name</label>
                                    <input type="text" id='name_patient' name="name_patient" placeholder={patient.name_patient} className='w-[260px]' />
                                </div>
                                <div className="flex flex-col ">
                                    <label htmlFor='prenom_patient'>First Name</label>
                                    <input type="text" id='prenom_patient' name="prenom_patient" placeholder={patient.prenom_patient} className='w-[260px]' />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[100%]">
                            <div className="flex flex-col w-[100%] ">
                                <label htmlFor='idpatient'>Id</label>
                                <input type="text" id='idpatient' name="idpatient" placeholder={patient.id} readOnly />
                            </div>
                        </div>
                        <div className=" flex flex-row w-[100%]">
                            <div className="flex">
                                <div className="flex flex-col mr-[30px]">
                                    <label htmlFor='genderpatient'>Gender</label>
                                    <select name="genderpatient" id="genderpatient" className="w-[260px]">
                                        <option value="Male" selected={patient.gender}>Male</option>
                                        <option value="Female" selected={patient.gender}>Female</option>
                                    </select>
                                </div>
                                <div className="flex flex-col ">
                                    <label htmlFor='agepatient'>Age</label>
                                    <input type="number" name="agepatient" id="agepatient" className="w-[260px]" placeholder={patient.agepatient} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[100%]">
                            <div className="flex flex-col w-[100%]">
                                <label htmlFor='phone_patient'>Phone</label>
                                <input type="text" id="phone_patient" name="phone_patient" placeholder={patient.phone_patient} />
                            </div>
                        </div>
                        <div className="flex flex-row w-[100%]">
                            <div className="flex flex-col w-[100%] ">
                                <label htmlFor='addresspatient'>Address</label>
                                <textarea type="text" id="addresspatient" name="addresspatient" placeholder={patient.addresspatient} />
                            </div>
                        </div>
                        <button>Update</button>
                    </form>
                </div >
                <div className="separator">
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
