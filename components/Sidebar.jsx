import { auth } from "@/app/auth";

import SidebarClient from "./Sidebarclient";
const Sidebar = async () => {
  const { user } = await auth();
  return <SidebarClient user={user} />;
};

export default Sidebar;
