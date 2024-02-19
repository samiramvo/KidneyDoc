import { fetchUsers } from "@/lib/data";
import "@/styles/globalelements.css"
import "@/styles/globals.css"
const AddUserPage = async () => {
    const users = await fetchUsers();
    console.log(users)
    return (
        <div>
            <div>
                <h1 className="font-bold text-[#2B3674] text-[26px] mb-8">New User</h1>
            </div>
            <div className="containeraddpatient ">
                <form className="formaddpatient">
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="username">Name</label>
                            <input type="text" placeholder="username" name="username" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="emailuser">Email</label>
                            <input type="email" placeholder="email" name="emailuser" id="emailuser" required />
                        </div>
                    </div>
                    <div className="flex flex-row">

                        <div className="flex flex-col">
                            <label htmlFor="passworduser">Password</label>
                            <input
                                type="password"
                                placeholder="password"
                                name="passworduser"
                                id="passworduser"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="phoneuser">Phone</label>
                            <input type="phone" placeholder="phone" name="phoneuser" id="phoneuser" />
                        </div>
                    </div>
                    <div className="flex flex-row">

                        <div className="flex flex-col">
                            <label htmlFor="admin">Admin or not</label>
                            <select name="isAdmin" id="isAdmin">
                                <option value={false}>
                                    Is Admin?
                                </option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="active">Active or not</label>
                            <select name="isActive" id="isActive">
                                <option value={true}>
                                    Is Active?
                                </option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </div>

                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <label htmlFor="useraddress">Address</label>
                            <textarea
                                name="useraddress"
                                id="useraddress"
                                placeholder="Address"
                                className=" resize-none rounded-md p-2 w-[100%]"
                            ></textarea>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>

            </div>
        </div>

    );
};

export default AddUserPage;
