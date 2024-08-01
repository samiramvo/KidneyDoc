import Image from 'next/image';
import Link from 'next/link';
import { fetchPatientable } from '@/lib/data';
const Tablepatient = async () => {
    const q = "";
    const page = 1;
    const { patients } = await fetchPatientable(q, page);

    return (
        <div>

            <div className="containerpatient shadow-lg dark:bg-[#333] dark:shadow-lg">
                <div className='flex '>
                    <h2 className="titlepatient ml-[10px] dark:text-[#605BFF]">Patient Data</h2>
                    <Link href={"/dashboard/patients"} className="ml-auto">
                        <h2 className="titlepatient dark:text-[#605BFF]"> View All</h2>
                    </Link >

                </div>

                <table className="table">
                    <thead>
                        <tr className='text-[#605BFF] dark:text-[#A3AED0]'>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Assigned Doctor</td>
                            <td>Gender</td>
                            <td>Age</td>
                            <td>Phone Number</td>
                            <td>Created At</td>
                            <td>Details</td>
                        </tr>
                    </thead>
                    <tbody className=' font-medium text-[#1B2559]  text-[15px]'>
                        {patients.map((patient) => (
                            <tr key={patient.id} className="group hover:bg-gray-100 dark:hover:bg-gray-700 ">
                                <td>
                                    <div className='bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[32px] h-[32px]  flex items-center justify-center'>
                                        1
                                    </div>
                                </td>
                                <td>
                                    <div className="namepatient dark:text-white">
                                        <span>{patient.name_patient}</span> <span>{patient.prenom_patient}</span>
                                    </div>

                                </td>
                                <td className='dark:text-white'>{patient.doctor}</td>
                                <td className='dark:text-white'>{patient.gender}</td>
                                <td className='dark:text-white'>{patient.agepatient}</td>
                                <td className='dark:text-white'>{patient.phone_patient}</td>
                                <td className='dark:text-white'>{patient.createdAt?.toString().slice(4, 24)}</td>
                                <td>
                                    <Link href={`/dashboard/patients/${patient.id}`}>
                                        <div className='relative bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[42px] h-[32px]  flex items-center justify-center'>
                                            <Image
                                                src={"/assets/icons/more_horiz.png"}
                                                alt="Icon"
                                                width="20"
                                                height="20"
                                            />
                                        </div>
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tablepatient;
