// import { useEffect, useState } from "react";
// import { getSession } from "next-auth/react"; // Import getSession
// import Image from "next/image";
// import "@/styles/globals.css";
// // import { auth } from "@/app/auth";
// const Informationuser = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const session = await getSession();
//         console.log("Session:", session); // Ajoutez ce log pour voir ce que renvoie getSession
//         if (session) {
//           setUser(session.user);
//         } else {
//           console.log("Aucune session trouvée");
//         }
//       } catch (error) {
//         console.error(
//           "Erreur lors de la récupération des informations utilisateur",
//           error
//         );
//       }
//     };
//     fetchUser();
//   }, []);

//   if (!user) {
//     return <div>Chargement des informations utilisateur...</div>;
//   }

//   return (
//     <div className="usercontainer mt-2 mb-[-15px]">
//       <Image
//         className="userImage"
//         src={user.img || "/assets/images/Elipse 5.png"}
//         alt=""
//         width={40}
//         height={40}
//       />
//       <div className="userDetail">
//         <span className="username capitalize dark:text-white">
//           Dr {user.username || "Unknown"}
//         </span>
//         {user.isAdmin ? (
//           <span className="userTitle">Administrator</span>
//         ) : (
//           <span className="userTitle">User</span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Informationuser;

import { auth } from "@/app/auth";
import "@/styles/globals.css";
import Image from "next/image";
const Informationuser = async () => {
  const { user } = await auth();
  return (
    // <div className="usercontainer mt-2 mb-[-15px]">
    <div className="usercontainer mt-2 mb-2">
      <Image
        className="userImage"
        src={user?.img || "/assets/images/Elipse 5.png"}
        alt=""
        width={40}
        height={40}
      />
      <div className="userDetail">
        <span className="username capitalize dark:text-white">
          Dr {user?.username || "Unknown"}
        </span>
        {user?.isAdmin ? (
          <span className="userTitle">Administrator</span>
        ) : (
          <span className="userTitle">User</span>
        )}
      </div>
    </div>
  );
};

export default Informationuser;

// import "@/styles/globals.css";
// import InformationuserClient from "./informationuserclient";
// import { auth } from "@/app/auth";

// const Informationuser = async () => {
//   const user = await auth(); // Récupère la session
//   console.log(user);
//   if (!user) {
//     return <div>Erreur : utilisateur non trouvé</div>;
//   }
//   console.log(user);
//   return <InformationuserClient user={session} />;
// };

// export default Informationuser;
