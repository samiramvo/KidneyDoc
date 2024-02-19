import '@/styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from "@/components/pagination"
const Tablepatient = () => {
    return (
        <div className="containerpatient">
            <div className='flex '>
                <h2 className="titlepatient ml-[10px]">Patient Data</h2>
                <Link href={"/dashboard/patients"} className="ml-auto">
                    <h2 className="titlepatient "> View All</h2>
                </Link >

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
                        <td>Details</td>
                    </tr>
                </thead>
                <tbody className=' font-medium text-[#1B2559]  text-[15px]'>
                    <tr>
                        <td>
                            <div className='bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[32px] h-[32px]  flex items-center justify-center'>
                                1
                            </div>
                        </td>
                        <td>
                            <div className="namepatient">
                                John Doe
                            </div>
                        </td>
                        <td>Dr John VIGAN</td>
                        <td>Male</td>
                        <td>30</td>
                        <td>97535344</td>
                        <td>
                            <div className='relative bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[42px] h-[32px]  flex items-center justify-center'>
                                <Image
                                    src={"/assets/icons/more_horiz.png"}
                                    alt="Icon"
                                    width="20"
                                    height="20"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className='bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[32px] h-[32px]  flex items-center justify-center'>
                                1
                            </div>
                        </td>
                        <td>
                            <div className="namepatient">
                                John Doe
                            </div>
                        </td>
                        <td>Dr John VIGAN</td>
                        <td>Male</td>
                        <td>30</td>
                        <td>97535344</td>
                        <td>
                            <div className='relative bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[42px] h-[32px]  flex items-center justify-center'>
                                <Image
                                    src={"/assets/icons/more_horiz.png"}
                                    alt="Icon"
                                    width="20"
                                    height="20"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className='bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[32px] h-[32px]  flex items-center justify-center'>
                                1
                            </div>
                        </td>
                        <td>
                            <div className="namepatient">
                                John Doe
                            </div>
                        </td>
                        <td>Dr John VIGAN</td>
                        <td>Male</td>
                        <td>30</td>
                        <td>97535344</td>
                        <td>
                            <div className='relative bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[42px] h-[32px]  flex items-center justify-center'>
                                <Image
                                    src={"/assets/icons/more_horiz.png"}
                                    alt="Icon"
                                    width="20"
                                    height="20"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className='bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[32px] h-[32px]  flex items-center justify-center'>
                                1
                            </div>
                        </td>
                        <td>
                            <div className="namepatient">
                                John Doe
                            </div>
                        </td>
                        <td>Dr John VIGAN</td>
                        <td>Male</td>
                        <td>30</td>
                        <td>97535344</td>
                        <td>
                            <div className='relative bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[42px] h-[32px]  flex items-center justify-center'>
                                <Image
                                    src={"/assets/icons/more_horiz.png"}
                                    alt="Icon"
                                    width="20"
                                    height="20"
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Tablepatient