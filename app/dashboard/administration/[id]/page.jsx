import '@/styles/globals.css'
import '@/styles/globalelements.css'
import Image from "next/image";

const SingleUserPage = async () => {

    return (
        <div className="containersingleuser">

            <div className="formContaineruser">
                <form className='formIduser'>
                    <input type="hidden" name="id" value="102" />
                    <div className="flex flex-row w-[100%]">
                        <div className="flex flex-col w-[100%] ">
                            <label htmlFor='username'>Username</label>
                            <input type="text" id='username' name="username" placeholder="John Doe" />
                        </div>

                    </div>
                    <div className="flex flex-row w-[100%]">
                        <div className="flex flex-col w-[100%] ">
                            <label htmlFor='email'>Email</label>
                            <input type="email" id='email' name="email" placeholder="mvosamira@gmail.com" />
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
                                <input type="text" id="phone" vname="phone" placeholder="+229 97535344" className="w-[260px]" />
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-row w-[100%]">
                        <div className="flex">
                            <div className="flex flex-col mr-[30px]">
                                <label htmlFor='isActive'>Is Active?</label>
                                <select name="isActive" id="isActive" className="w-[260px]">
                                    <option value={true} >Yes</option>
                                    <option value={false} >No</option>
                                </select>
                            </div>
                            <div className="flex flex-col ">
                                <label htmlFor='isAdmin'>Is Admin?</label>
                                <select name="isAdmin" id="isAdmin" className="w-[260px]">
                                    <option value={true} >Yes</option>
                                    <option value={false} >No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-[100%]">
                        <div className="flex flex-col w-[100%] ">
                            <label htmlFor='address'>Address</label>
                            <textarea type="text" id="address" name="address" placeholder="Calavi Tokpa" />
                        </div>
                    </div>
                    <button>Update</button>
                </form>
            </div >
            <div className="separator">
            </div>
            <div className="infoContaineruser">
                <div className="imguserContainer">
                    <Image src={"/assets/images/upload.png"} alt=""
                        width={200}
                        height={200}
                    />
                </div>

                <h1 className="font-bold text-[#2B3674] text-[17px] mb-8">John Doe</h1>
            </div>
        </div >
    );
};

export default SingleUserPage;
