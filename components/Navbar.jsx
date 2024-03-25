"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import '@/styles/globals.css';
import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,

} from "react-icons/md";
import ThemeSwitcher from "@/app/ThemeSwitcher";
const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className="containernav">
            <div className="titlenav ">{"Pages" + pathname}</div>
            <div className="menunav">
                <div className="searchcont">
                    <div className="search">
                        <ThemeSwitcher />
                    </div>
                    <div className="iconsnav">
                        <MdOutlineChat size={15} />
                        <MdNotifications size={15} />
                        <MdPublic size={15} />
                    </div>
                    <div>
                        <Image
                            className="rounded-full"
                            src={"/assets/images/Elipse 5.png"}
                            alt="Login logo image"
                            width="30"
                            height="30"
                        />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Navbar;