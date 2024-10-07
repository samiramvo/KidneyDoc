import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/footer";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col bg-background w-full min-h-screen font-jakarta">
      <div className="flex-row">
        <Navbar />
      </div>

      <div className="flex flex-row flex-1 ">
        <div className="flex flex-col shadow-sm ">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 p-8 w-[100%] max-h-screens ">
          {children}
        </div>
      </div>
      <div className="flex justify-center items-center border-t">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
