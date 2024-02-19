'use client'
import Image from "next/image";
import {
    MdPeople,
} from "react-icons/md";


import Tablepatient from "@/components/tablepatient";



const Dashboard = async () => {
    return (
        <div>
            <div>
                <h1 className="font-bold text-[#2B3674] text-[26px] mb-8">Welcome to KidneyDoc!</h1>
            </div>
            <div className="wrapperdash">

                <div className="maindash">
                    <div className="cards">
                        <div className="bg-white p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center">
                            <div className="relative">
                                <Image
                                    src={"/assets/icons/Shadow.png"}
                                    alt="Background Image"
                                    width="40"
                                    height="40"
                                />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <MdPeople className="text-white" size={20} />
                                </div>
                            </div>

                            <div>
                                <div className="text-[#A3AED0] font-bold text-[13px] ">Total Patients</div>
                                <div className="text-[#1B2559] font-bold">300</div>
                            </div>
                            <div>
                                <Image
                                    src={"/assets/icons/Graph.png"}
                                    alt="Icon"
                                    width="58"
                                    height="28"
                                />
                            </div>
                        </div>

                        <div className="bg-white p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center">
                            <div>
                                <div className="text-[#A3AED0] font-bold  text-[14px]">Spent this month</div>
                                <div className="text-[#1B2559] font-bold text-[18px]">$682.5</div>
                            </div>
                            <div>
                                <Image
                                    src={"/assets/icons/Icontrait.png"}
                                    alt="Icon"
                                    width="46"
                                    height="10"
                                />
                            </div>
                        </div>
                        <div className="bg-white p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center">
                            <div className="relative">
                                <Image
                                    src={"/assets/icons/Shadow2.png"}
                                    alt="Background Image"
                                    width="40"
                                    height="40"
                                />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <Image
                                        src={"/assets/icons/Icon.png"}
                                        alt="Icon"
                                        width="40"
                                        height="40"
                                    />

                                </div>
                            </div>
                            <div>
                                <div className="text-[#A3AED0] font-bold  text-[14px]">Earnings</div>
                                <div className="text-[#1B2559] font-bold text-[18px]">$350.5</div>
                            </div>

                        </div>
                        <div className="bg-[#624aff] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center">
                            <div>
                                <div className="text-white font-bold  text-[14px]">Activity</div>
                                <div className="text-white font-bold text-[18px]">$540.5</div>
                            </div>
                            <div>
                                <Image
                                    src={"/assets/icons/Chart.png"}
                                    alt="Icon"
                                    width="58"
                                    height="28"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Tablepatient />
        </div>


    )
}

export default Dashboard