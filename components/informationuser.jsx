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
