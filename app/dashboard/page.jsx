import Image from "next/image";
import { MdPeople } from "react-icons/md";
import PieChart from "@/components/charts/piechart";
import LineChart from "@/components/charts/linechart";
import BarChartComponent from "@/components/charts/barchart";
import BarChart from "@/components/charts/stackedbar";
import Tablepatient from "@/components/tablepatient";
import { fetchRecentPatients } from "@/lib/data";
// import Informationuser from "@/components/informationuser";
const Dashboard = async () => {
  const { patients } = await fetchRecentPatients();
  const Patientsjson = JSON.parse(JSON.stringify(patients));
  return (
    <div className="dark:bg-[#121212]">
      <div>
        <h1 className="font-bold text-textSecondary text-[26px] mt-4 mb-4 dark:text-white">
          Welcome to KidneyDoc!
        </h1>
        {/* <Informationuser /> */}
      </div>
      <div className="wrapperdash">
        <div className="maindash">
          <div className="cards">
            <div className="dark:bg-[#333] bg-[#F9FAFA] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
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
                <div className=" dark:text-[#A3AED0] text-textPrimary font-bold text-[13px] ">
                  Total Patients
                </div>
                <div className="text-violettitle font-bold dark:text-white">
                  300
                </div>
              </div>
              {/* <div>
                <Image
                  src={"/assets/icons/Graph.png"}
                  alt="Icon"
                  width="58"
                  height="28"
                />
              </div> */}
            </div>

            <div className="dark:bg-[#333] bg-[#F9FAFA] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
              <div>
                <div className="dark:text-[#A3AED0]  text-textPrimary font-bold  text-[14px]">
                  Spent this month
                </div>
                <div className="dark:text-white text-violettitles font-bold text-[18px]">
                  $682.5
                </div>
              </div>
              {/* <div>
                <Image
                  src={"/assets/icons/Icontrait.png"}
                  alt="Icon"
                  width="46"
                  height="10"
                />
              </div> */}
            </div>
            <div className="dark:bg-[#333] bg-[#F9FAFA] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
              <div className="relative">
                <Image
                  src={"/assets/icons/Shadow2.png"}
                  alt="Background Image"
                  width="40"
                  height="40"
                />
                {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src={"/assets/icons/Icon.png"}
                    alt="Icon"
                    width="40"
                    height="40"
                  />
                </div> */}
              </div>
              <div>
                <div className="dark:text-[ #718096] text-textPrimary font-bold  text-[14px]">
                  Earnings
                </div>
                <div className="dark:text-white text-violettitle font-bold text-[18px]">
                  $350.5
                </div>
              </div>
            </div>
            <div className="bg-[#EEEFF2] p-[10px] rounded-[15px] flex gap-[20px] w-[25%] justify-center items-center shadow-lg dark:shadow-lg">
              <div>
                <div className="text-textPrimary font-bold  text-[14px]">
                  Activity
                </div>
                <div className="text-violettitle font-bold text-[18px]">
                  $540.5
                </div>
              </div>
              {/* <div>
                <Image
                  src={"/assets/icons/Chart.png"}
                  alt="Icon"
                  width="58"
                  height="28"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-[1%]">
        <div className="col-span-8 rounded-lg shadow-lg dark:shadow-lg px-4 py-4  bg-[#F9FAFA] dark:bg-[#333]">
          <BarChartComponent />
        </div>
        <div className="col-span-4 rounded-lg shadow-lg dark:shadow-lg px-4 py-4  bg-[#F9FAFA] dark:bg-[#333]">
          <PieChart />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-[1%]">
        <div className="col-span-8 rounded-lg shadow-lg dark:shadow-lg px-4 py-4  bg-[#F9FAFA] dark:bg-[#333]">
          <LineChart />
        </div>
        <div className="col-span-4 rounded-lg shadow-lg dark:shadow-lg px-4 py-4  bg-[#F9FAFA] dark:bg-[#333]">
          <BarChart />
        </div>
      </div>
      <Tablepatient patients={Patientsjson} />
    </div>
  );
};
export default Dashboard;
