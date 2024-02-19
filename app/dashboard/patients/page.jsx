import '@/styles/globals.css';
import Image from 'next/image';
import Search from "@/components/search";
import Pagination from '@/components/pagination';
import Link from 'next/link';
import { fetchPatients } from '@/lib/data';

const Patients = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const { count, patients } = await fetchPatients(q, page);
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className="font-bold text-[#2B3674] text-[26px] mb-8">Patient Data</h1>
                </div>
                <div className='mt-[50px] '>
                    <Link href="/dashboard/patients/add" >
                        <button className=" bg-[#6AD2FF] w-[150px] p-[8px] text-[15px] text-white border-none cursor-pointer rounded-[5px] flex">
                            <Image
                                src={"/assets/icons/Vector.png"}
                                alt="Icon"
                                width="17"
                                height="17"
                                className='mr-[14px] mt-[2px]'
                            />
                            New patient</button>
                    </Link>
                </div>
            </div>

            <div className="containerpatient">
                <div className='mb-6'>
                    <Search placeholder="Search for a patient..." />
                </div>

                <table className="table">
                    <thead>
                        <tr className='text-[#605BFF]'>
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
                            <tr key={patient.id}>
                                <td>
                                    <div className='bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[32px] h-[32px]  flex items-center justify-center'>
                                        1
                                    </div>
                                </td>
                                <td>
                                    <div className="namepatient">
                                        <span>{patient.name_patient}</span> <span>{patient.prenom_patient}</span>
                                    </div>

                                </td>
                                <td>{patient.doctor}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.agepatient}</td>
                                <td>{patient.phone_patient}</td>
                                <td>{patient.createdAt?.toString().slice(4, 24)}</td>
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
                <Pagination count={count} />
            </div>
        </div >

    )
}

export default Patients