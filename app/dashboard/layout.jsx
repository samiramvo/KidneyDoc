import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/footer";
import { LanguageProvider } from "../contexts/LanguageContext";

const DashboardLayout = ({ children }) => {
  return (
    <LanguageProvider>
    <div className="flex flex-col bg-background w-full min-h-screen font-jakarta dark:bg-darkbackground dark:font-dm_sans">
      <div className="flex-row">
        <Navbar />
      </div>

      <div className="flex flex-row flex-1 ">
        <div className="flex flex-col shadow-sm ">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 p-8 w-[100%] max-h-screens   ">
          {children}
        </div>
      </div>
      <div className="flex justify-center items-center border-t dark:bg-darkbackground dark:border-t-black">
        <Footer />
      </div>
    </div>
    </LanguageProvider>
  );
};

export default DashboardLayout;
