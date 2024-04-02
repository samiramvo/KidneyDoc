import { auth } from "@/app/auth";
import '@/styles/globals.css';
import Image from "next/image";
const Informationuser = async () => {
    const { user } = await auth();
    return (
        <div className="usercontainer">
            <Image
                className="userImage"
                src={user.img || "/assets/images/Elipse 5.png"}
                alt=""
                width={50}
                height={50}
            />
            <div className="userDetail">
                <span className="username capitalize dark:text-white">Dr {user.username}</span>
                {user.isAdmin === true ? (
                    <span className="userTitle">Administrator</span>
                ) : (
                    <span className="userTitle">User</span>
                )}
            </div>
        </div>
    )
}

export default Informationuser