import Sidebar from "@/components/sidebar/Sidebar";
import TopBar from "@/components/topbar/TopBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
   const [toggle, setToggle] = useState(false)
   return (
      <div className="w-full relative">
         <div className={` min-h-screen bg-[#1E1F20] fixed top-0 left-0 bottom-0 z-50 transition-all max-w-full duration-500 transform ${toggle ? "lg:-translate-x-full translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}>
            <Sidebar />
         </div>
         <div className={` w-full duration-500  transition-all transform  ${toggle ? "lg:pl-0 pl:72" : "lg:pl-72 pl:0"
            }`}>
            <TopBar toggle={toggle} setToggle={setToggle} />
            <Outlet />
         </div>
      </div>
   );
};

export default Dashboard;
