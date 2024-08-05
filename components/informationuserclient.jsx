"use client";
import "@/styles/globals.css";
import Image from "next/image";
const InformationuserClient = ({ user }) => {
  return (
    <div className="usercontainer mt-2 mb-[-15px]">
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
export default InformationuserClient;
