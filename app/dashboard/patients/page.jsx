// import Image from "next/image";
// import Pagination from "@/components/pagination";
// import Link from "next/link";
// import { fetchPatients } from "@/lib/data";
// import Search from "@/components/search";
// import FilterForm from "@/components/filterform";
// import { RiAddLine } from "react-icons/ri";
// import { format } from "date-fns";
// import { fr } from "date-fns/locale";

// const Patients = async ({ searchParams }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const formattedDate = format(date, "EEEE d MMMM yyyy 'à' HH:mm", {
//       locale: fr,
//     });
//     return capitalizeFirstLetter(formattedDate);
//   };

//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   const q = searchParams?.q || "";
//   const page = searchParams?.page || 1;
//   const { count, patients } = await fetchPatients(q, page);
//   const ITEM_PER_PAGE = 6;

//   return (
//     <div>
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="font-bold text-[#2B3674] text-[26px] mb-8 dark:text-white">
//             Patient Data
//           </h1>
//         </div>
//         <div className="mt-[50px] ">
//           <Link href="/dashboard/patients/add">
//             <button className="bg-[#2a79d7] w-[150px] p-[8px] text-[15px] text-white border-none cursor-pointer rounded-[5px] flex hover:shadow-xl transition duration-300">
//               <RiAddLine className="mr-[14px] mt-[2px]" size={20} />
//               New patient
//             </button>
//           </Link>
//         </div>
//       </div>
//       <FilterForm />
//       <div className="containerpatient rounded-lg shadow-lg dark:bg-[#333] dark:shadow-lg">
//         <div className="mb-6">
//           <Search placeholder="Search for a patient..." />
//         </div>

//         <table className="table">
//           <thead>
//             <tr className="text-[#605BFF] dark:text-[#A3AED0]">
//               <td>ID</td>
//               <td>Name</td>
//               <td>Assigned Doctor</td>
//               <td>Gender</td>
//               <td>Age</td>
//               <td>Phone Number</td>
//               <td>Created At</td>
//               <td>Details</td>
//             </tr>
//           </thead>
//           <tbody className=" font-medium text-[#1B2559]  text-[15px]">
//             {patients.map((patient, index) => (
//               <tr
//                 key={patient.id}
//                 className="group hover:bg-gray-100 dark:hover:bg-gray-700 "
//               >
//                 <td>
//                   <div className="bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[32px] h-[32px]  flex items-center justify-center">
//                     {index + 1 + ITEM_PER_PAGE * (page - 1)}
//                   </div>
//                 </td>
//                 <td>
//                   <div className="namepatient dark:text-white">
//                     <span>{patient.name_patient}</span>{" "}
//                     <span>{patient.prenom_patient}</span>
//                   </div>
//                 </td>
//                 <td className="dark:text-white">{patient.doctor}</td>
//                 <td className="dark:text-white">{patient.gender}</td>
//                 <td className="dark:text-white">{patient.agepatient}</td>
//                 <td className="dark:text-white">{patient.phone_patient}</td>
//                 <td className="dark:text-white">
//                   {formatDate(patient.createdAt)}
//                 </td>
//                 <td>
//                   <Link href={`/dashboard/patients/${patient.id}`}>
//                     {/* <div className="relative bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[42px] h-[32px]  flex items-center justify-center">
//                       <Image
//                         src={"/assets/icons/more_horiz.png"}
//                         alt="Icon"
//                         width="20"
//                         height="20"
//                       />
//                     </div> */}
//                     <button className="buttonuser buttonview text-[13px]">
//                       View
//                     </button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <Pagination count={count} ITEM_PER_PAGE={6} />
//       </div>
//     </div>
//   );
// };

// export default Patients;

import { fetchPatients } from "@/lib/data";
import PatientClient from "@/components/patientClient";
const Patients = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, patients } = await fetchPatients(q, page);

  const Patientsjson = JSON.parse(JSON.stringify(patients));

  return <PatientClient patients={Patientsjson} count={count} />;
};

export default Patients;
