import '@/styles/globals.css'
import '@/styles/globalelements.css'
import Image from "next/image";
import { fetchUser } from '@/lib/data';
import { updateUser } from '@/lib/actions';

const SingleUserPage = async ({ params }) => {
    const { id } = params;
    const user = await fetchUser(id);

    return (
        <div className="containersingleuser shadow-lg">

            <div className="formContaineruser">
                <form action={updateUser} className='formIduser'>
                    <input type="hidden" name="id" value={user.id} />
                    <div className="flex flex-row w-[100%]">
                        <div className="flex flex-col w-[100%] ">
                            <label htmlFor='username'>Username</label>
                            <input type="text" id='username' name="username" placeholder={user.username} />
                        </div>

                    </div>
                    <div className="flex flex-row w-[100%]">
                        <div className="flex flex-col w-[100%] ">
                            <label htmlFor='email'>Email</label>
                            <input type="email" id='email' name="email" placeholder={user.emailuser} />
                        </div>
                    </div>
                    <div className=" flex flex-row">
                        <div className="flex">
                            <div className="flex flex-col mr-[30px] ">
                                <label htmlFor='password'>Password</label>
                                <input type="password" id="password" name="password" className="w-[260px]" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor='phone'>Phone</label>
                                <input type="text" id="phone" vname="phone" placeholder={user.phoneuser} className="w-[260px]" />
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-row w-[100%]">
                        <div className="flex">
                            <div className="flex flex-col mr-[30px]">
                                <label htmlFor='isActive'>Is Active?</label>
                                <select name="isActive" id="isActive" className="w-[260px]">
                                    <option value={true} selected={user.isActive}>Yes</option>
                                    <option value={false} selected={!user.isActive}>No</option>
                                </select>
                            </div>
                            <div className="flex flex-col ">
                                <label htmlFor='isAdmin'>Is Admin?</label>
                                <select name="isAdmin" id="isAdmin" className="w-[260px]">
                                    <option value={true} selected={user.isAdmin}>Yes</option>
                                    <option value={false} selected={!user.isAdmin}>No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-[100%]">
                        <div className="flex flex-col w-[100%] ">
                            <label htmlFor='address'>Address</label>
                            <textarea type="text" id="address" name="address" placeholder={user.useraddress} />
                        </div>
                    </div>
                    <button>Update</button>
                </form>
            </div >
            <div className="separator">
            </div>
            <div className="infoContaineruser">
                <div className="imguserContainer">
                    <Image src={user.img || "/assets/images/upload.png"} alt=""
                        width={200}
                        height={200}
                    />
                </div>

                <h1 className="font-bold text-[#2B3674] text-[17px] mb-8"> {user.username}</h1>
            </div>
        </div >
    );
};

export default SingleUserPage;
