// import Image from "next/image";
// import { MdPeople } from "react-icons/md";
// import { Calendar } from "iconsax-react";
// import { RiCustomerService2Fill } from "react-icons/ri";
// import PieChart from "@/components/charts/piechart";
// import LineChart from "@/components/charts/linechart";
// import BarChartComponent from "@/components/charts/barchart";
// import BarChart from "@/components/charts/stackedbar";
// import Tablepatient from "@/components/tablepatient";
// import { fetchRecentPatients } from "@/lib/data";
// // import Informationuser from "@/components/informationuser";
// const Dashboard = async () => {
//   const { patients } = await fetchRecentPatients();
//   const Patientsjson = JSON.parse(JSON.stringify(patients));
//   return (
//     <div className="dark:bg-[#121212]">
//       <div>
//         <h1 className="font-bold text-textSecondary text-[26px] mt-4 mb-4 dark:text-white">
//           Welcome to KidneyDoc!
//         </h1>
//         {/* <Informationuser /> */}
//       </div>
//       <div className="wrapperdash">
//         <div className="maindash">
//           <div className="cards">
//             <div className=" bg-[#F9FAFA] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
//               <div className="relative">
//                 <Image
//                   src={"/assets/icons/Shadow.png"}
//                   alt="Background Image"
//                   width="40"
//                   height="40"
//                 />
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                   <MdPeople className="text-white" size={20} />
//                 </div>
//               </div>

//               <div>
//                 <div className=" dark:text-[#A3AED0] text-textPrimary font-bold text-[13px] ">
//                   Total Patients
//                 </div>
//                 <div className="text-violettitle font-bold dark:text-white">
//                   300
//                 </div>
//               </div>
//               {/* <div>
//                 <Image
//                   src={"/assets/icons/Graph.png"}
//                   alt="Icon"
//                   width="58"
//                   height="28"
//                 />
//               </div> */}
//             </div>

//             <div className="dark:bg-[#333] bg-[#F9FAFA] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
//               <div className="relative">
//                 <Image
//                   src={"/assets/icons/Shadow.png"}
//                   alt="Background Image"
//                   width="40"
//                   height="40"
//                 />
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                   <Calendar className="text-white" size={20} />
//                 </div>
//               </div>
//               <div>
//                 <div className="dark:text-[#A3AED0]  text-textPrimary font-bold  text-[14px]">
//                   New Patients This Month
//                 </div>
//                 <div className="dark:text-white text-violettitles font-bold text-[18px]">
//                   45
//                 </div>
//               </div>
//             </div>
//             <div className="dark:bg-[#333] bg-[#F9FAFA] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
//               <div className="relative">
//                 <Image
//                   src={"/assets/icons/Shadow.png"}
//                   alt="Background Image"
//                   width="40"
//                   height="40"
//                 />
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                   <RiCustomerService2Fill className="text-white" size={20} />
//                 </div>
//               </div>
//               <div>
//                 <div className="dark:text-[ #718096] text-textPrimary font-bold  text-[14px]">
//                   Total Services Provided
//                 </div>
//                 <div className="dark:text-white text-violettitle font-bold text-[18px]">
//                   150
//                 </div>
//               </div>
//             </div>
//             <div className="bg-[#EEEFF2] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
//               <div>
//                 <div className="text-textPrimary font-bold  text-[14px]">
//                   Average Patient Spend
//                 </div>
//                 <div className="text-violettitle font-bold text-[18px]">
//                   $90.00
//                 </div>
//               </div>
//               <div>
//                 <Image
//                   src={"/assets/icons/Chart.png"}
//                   alt="Icon"
//                   width="76"
//                   height="32"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="grid grid-cols-12 gap-4 mt-[1%]">
//         <div className="col-span-8 rounded-lg shadow-lg dark:shadow-lg px-4 py-4  bg-[#F9FAFA] dark:bg-[#333]">
//           <BarChartComponent />
//         </div>
//         <div className="col-span-4 rounded-lg shadow-lg dark:shadow-lg px-4 py-4  bg-[#F9FAFA] dark:bg-[#333]">
//           <PieChart />
//         </div>
//       </div>
//       <div className="grid grid-cols-12 gap-4 mt-[1%]">
//         <div className="col-span-8 rounded-lg shadow-lg dark:shadow-lg px-4 py-4  bg-[#F9FAFA] dark:bg-[#333]">
//           <LineChart />
//         </div>
//         <div className="col-span-4 rounded-lg shadow-lg dark:shadow-lg px-4 py-4  bg-[#F9FAFA] dark:bg-[#333]">
//           <BarChart />
//         </div>
//       </div>
//       <Tablepatient patients={Patientsjson} />
//     </div>
//   );
// };
// export default Dashboard;

import Image from "next/image";
import { MdPeople } from "react-icons/md";
import { Calendar } from "iconsax-react";
import { RiCustomerService2Fill } from "react-icons/ri";
import PieChart from "@/components/charts/piechart";
import LineChart from "@/components/charts/linechart";
import BarChartComponent from "@/components/charts/barchart";
import BarChart from "@/components/charts/stackedbar";
import Tablepatient from "@/components/tablepatient";
import TranslatedContent from "@/components/TranslateContent";
import {
  fetchRecentPatients,
  fetchChartData,
  fetchDashboardStats,
} from "@/lib/data";

const Dashboard = async () => {
  const { patients } = await fetchRecentPatients();
  const Patientsjson = JSON.parse(JSON.stringify(patients));
  const chartData = await fetchChartData();
  const stats = await fetchDashboardStats();


  return (
    <div className="dark:bg-darkbackground">
      <div>
        <h1 className="font-bold text-textSecondary text-[26px] mt-4 mb-4 dark:text-white">
          <TranslatedContent translationKey="welcome" />
        </h1>
      </div>
      <div className="wrapperdash">
        <div className="maindash">
          <div className="cards">
            <div className="dark:bg-darkgris bg-[#F9FAFA] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
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
                <div className="dark:text-[#A3AED0] text-textPrimary font-bold text-[13px]">
                <TranslatedContent translationKey="totalPatients" />
                </div>
                <div className="text-violettitle font-bold dark:text-white">
                  {stats.totalPatients}
                </div>
              </div>
            </div>

            <div className="dark:bg-darkgris bg-[#F9FAFA] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
              <div className="relative">
                <Image
                  src={"/assets/icons/Shadow.png"}
                  alt="Background Image"
                  width="40"
                  height="40"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Calendar className="text-white" size={20} />
                </div>
              </div>
              <div>
                <div className="dark:text-[#A3AED0] text-textPrimary font-bold text-[14px]">
                <TranslatedContent translationKey="newPatientsThisMonth" />
                </div>
                <div className="dark:text-white text-violettitles font-bold text-[18px]">
                  {stats.newPatientsThisMonth}
                </div>
              </div>
            </div>

            <div className="dark:bg-darkgris bg-[#F9FAFA] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
              <div className="relative">
                <Image
                  src={"/assets/icons/Shadow.png"}
                  alt="Background Image"
                  width="40"
                  height="40"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <RiCustomerService2Fill className="text-white" size={20} />
                </div>
              </div>
              <div>
                <div className="dark:text-[#718096] text-textPrimary font-bold text-[14px]">
                <TranslatedContent translationKey="totalConsultations" />
                </div>
                <div className="dark:text-white text-violettitle font-bold text-[18px]">
                  {stats.totalConsultations}
                </div>
              </div>
            </div>

            <div className=" bg-[#EEEFF2] dark:bg-darkviolet p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
              <div>
                <div className="text-textPrimary font-bold text-[14px] dark:text-white">
                <TranslatedContent translationKey="averageConsultations" />
                </div>
                <div className="text-violettitle font-bold text-[18px] dark:text-white">
                  {stats.averageConsultations * 100} %
                </div>
              </div>
              <div>
                <Image
                  src={"/assets/icons/Chart.png"}
                  alt="Icon"
                  width="40"
                  height="32"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-[1%]">
        <div className="col-span-8 rounded-lg shadow-lg dark:shadow-lg px-4 py-4 bg-[#F9FAFA] dark:bg-darkgris">
          <BarChartComponent data={chartData.patientsByMonth} />
        </div>
        <div className="col-span-4 rounded-lg shadow-lg dark:shadow-lg px-4 py-4 bg-[#F9FAFA] dark:bg-darkgris">
          <PieChart data={chartData.genderDistribution} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-[1%]">
        <div className="col-span-8 rounded-lg shadow-lg dark:shadow-lg px-4 py-4 bg-[#F9FAFA] dark:bg-darkgris">
          <LineChart
            consultationData={chartData.consultationsByMonth}
            patientData={chartData.patientsByMonth}
          />
        </div>
        <div className="col-span-4 rounded-lg shadow-lg dark:shadow-lg px-4 py-4 bg-[#F9FAFA] dark:bg-darkgris">
          <BarChart data={chartData.ageGroups} />
        </div>
      </div>

      <Tablepatient patients={Patientsjson} />
    </div>
  );
};

export default Dashboard;
