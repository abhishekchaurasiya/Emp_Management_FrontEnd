import { Outlet } from "react-router-dom";
import { lazy } from "react";

const EmployeeSidebar = lazy(() =>import("../components/employeeDashboard/EmployeeSidebar"));
const Navbar = lazy(() => import("../components/dashboard/Navbar"));

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <EmployeeSidebar />
      <div className="flex-1 ml-64 bg-gray-200 h-[100vh]">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
