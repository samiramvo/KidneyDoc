import "@/styles/globals.css";
import "@/styles/globalelements.css";
import Image from "next/image";
import { fetchUser } from "@/lib/data";
import { updateUser } from "@/lib/actions";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);

  return (
    <div className="containersingleuser shadow-lg dark:bg-[#333]">
      <div className="formContaineruser">
        <form action={updateUser} className="formIduser">
          <input type="hidden" name="id" value={user.id} />
          <div className="flex flex-row w-[100%]">
            <div className="flex flex-col w-[100%] ">
              <label htmlFor="username" className="dark:text-[#A3AED0]">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder={user.username}
                className=" dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
              />
            </div>
          </div>
          <div className="flex flex-row w-[100%]">
            <div className="flex flex-col w-[100%] ">
              <label htmlFor="email" className="dark:text-[#A3AED0]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={user.emailuser}
                className=" dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
              />
            </div>
          </div>
          <div className=" flex flex-row">
            <div className="flex">
              <div className="flex flex-col mr-[30px] ">
                <label htmlFor="password" className="dark:text-[#A3AED0]">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-[260px]  dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="dark:text-[#A3AED0]">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  vname="phone"
                  placeholder={user.phoneuser}
                  className="w-[260px] dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
                />
              </div>
            </div>
          </div>
          <div className=" flex flex-row w-[100%]">
            <div className="flex">
              <div className="flex flex-col mr-[30px]">
                <label htmlFor="isActive" className="dark:text-[#A3AED0]">
                  Is Active?
                </label>
                <select
                  name="isActive"
                  id="isActive"
                  className="w-[260px] dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
                  defaultValue={
                    user.isActive !== undefined
                      ? String(user.isActive)
                      : "default"
                  }
                >
                  <option disabled value="default">
                    isActive?
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="isAdmin" className="dark:text-[#A3AED0]">
                  Is Admin?
                </label>
                <select
                  name="isAdmin"
                  id="isAdmin"
                  className="w-[260px]  dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
                  defaultValue={
                    user.isAdmin !== undefined
                      ? String(user.isAdmin)
                      : "default"
                  }
                >
                  <option disabled value="default">
                    isAdmin?
                  </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-row w-[100%]">
            <div className="flex flex-col w-[100%] ">
              <label htmlFor="address" className="dark:text-[#A3AED0]">
                Address
              </label>
              <textarea
                type="text"
                id="address"
                name="address"
                placeholder={user.useraddress}
                className=" dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
              />
            </div>
          </div>
          <button className="hover:shadow-xl">Update</button>
        </form>
      </div>
      <div className="separator dark:bg-white dark:w-[0.2px]"></div>
      <div className="infoContaineruser">
        <div className="imguserContainer">
          <Image
            src={user.img || "/assets/images/upload.png"}
            alt=""
            width={200}
            height={200}
          />
        </div>

        <h1 className="font-bold text-[#2B3674] text-[17px] mb-8 dark:text-white">
          {user.username}
        </h1>
      </div>
    </div>
  );
};

export default SingleUserPage;
