import '@/styles/globals.css'
import '@/styles/globalelements.css'
import { FaNotesMedical } from "react-icons/fa";
const SinglePatientPage = async () => {

    return (
        <>
            <div className="containersingleuser">

                <div className="formContaineruser">
                    <form className='formIduser'>
                        <input type="hidden" name="id" value="102" />
                        <div className="flex flex-row w-[100%]">
                            <div className="flex flex-col w-[100%] ">
                                <label htmlFor='fullname'>Full Name</label>
                                <input type="text" id='fullname' name="fullname" placeholder="John Doe" />
                            </div>

                        </div>
                        <div className="flex flex-row w-[100%]">
                            <div className="flex flex-col w-[100%] ">
                                <label htmlFor='idpatient'>Id</label>
                                <input type="text" id='idpatient' name="idpatient" placeholder="1" />
                            </div>
                        </div>
                        <div className=" flex flex-row w-[100%]">
                            <div className="flex">
                                <div className="flex flex-col mr-[30px]">
                                    <label htmlFor='genderpatient'>Gender</label>
                                    <select name="genderpatient" id="genderpatient" className="w-[260px]">
                                        <option value="male">Homme</option>
                                        <option value="Female" >Femme</option>
                                    </select>
                                </div>
                                <div className="flex flex-col ">
                                    <label htmlFor='agepatient'>Age</label>
                                    <input type="number" name="agepatient" id="agepatient" className="w-[260px]" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[100%]">
                            <div className="flex flex-col w-[100%]">
                                <label htmlFor='phonepatient'>Phone</label>
                                <input type="text" id="phonepatient" name="phonepatient" placeholder="+229 97535344" />
                            </div>
                        </div>
                        <div className="flex flex-row w-[100%]">
                            <div className="flex flex-col w-[100%] ">
                                <label htmlFor='addresspatient'>Address</label>
                                <textarea type="text" id="addresspatient" name="addresspatient" placeholder="Calavi Tokpa" />
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
