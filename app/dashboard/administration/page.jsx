import Pagination from "@/components/pagination"
import Search from "@/components/search";
import '@/styles/globals.css'
import Link from "next/link";
import Image from "next/image";
import { fetchUsers } from "@/lib/data";
import { deleteUser } from "@/lib/actions";
import { RiAddLine } from 'react-icons/ri';

const Administration = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const { count, users } = await fetchUsers(q, page);
    return (
        <div>
            <div>
                <h1 className="font-bold text-[#2B3674] text-[26px] mb-8 dark:text-white">Administration</h1>
            </div>
            <div className="containeradmin  shadow-lg dark:bg-[#333]">

                <div className="topadmin">
                    <Search placeholder="Search for a user..." />
                    <Link href="/dashboard/administration/add">
                        <button className="addButtonuser text-[13px] flex  hover:shadow-xl transition duration-300">
                            <RiAddLine className="mr-[14px] mt-[2px]" size={20} />
                            Add New</button>
                    </Link>
                </div>
                <table className="tableUser ">
                    <thead>
                        <tr className="text-[#605BFF] dark:text-[#A3AED0]">
                            <td>Name</td>
                            <td>Email</td>
                            <td>Created At</td>
                            <td>Role</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className=" font-medium text-[#1B2559]  text-[15px]">
                                <td>
                                    <div className="flex items-center gap-[10px] dark:text-white">
                                        <Image
                                            src={user.img || "/assets/images/Elipse 5.png"}
                                            alt=""
                                            width={30}
                                            height={30}
                                            className="rounded-full "
                                        />
                                        {user.username}
                                    </div>

                                </td>
                                <td className='dark:text-white'>{user.emailuser}</td>
                                <td className='dark:text-white'>{user.createdAt?.toString().slice(4, 24)}</td>
                                <td className='dark:text-white'>{user.isAdmin ? "Admin" : "User"}</td>
                                <td className='dark:text-white'>{user.isActive ? "active" : "passive"}</td>
                                <td>
                                    <div className="buttonsuser">
                                        <Link href={`/dashboard/administration/${user.id}`}>

                                            <button className="buttonuser buttonview text-[13px]">
                                                View
                                            </button>
                                        </Link>
                                        <form action={deleteUser} >
                                            <input type="hidden" name="id" value={(user.id)} />
                                            <button className="buttonuser buttondelete text-[13px]">
                                                Delete
                                            </button>
                                        </form>

                                    </div>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
                <Pagination count={count} ITEM_PER_PAGE={4} />
            </div>
        </div>

    );
};

export default Administration;
