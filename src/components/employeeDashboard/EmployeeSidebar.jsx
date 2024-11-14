import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { MdSettingsSuggest } from "react-icons/md";

import "./Style.css";
import { userContext } from "../../context/authContext";

const EmployeeSidebar = () => {
  const { user } = userContext();
  return (
    <div className="fixed left-0 top-0 bottom-0 text-white h-screen space-y-2 w-64 bg-gray-800">
      <div className="bg-teal-600 h-14 flex justify-center items-center ">
        <h3 className="font-serif font-semibold text-2xl text-center">
          Employee MS
        </h3>
      </div>

      <div className="px-4">
        <NavLink
          to={"/employee-dashboard"}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} navLink`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user?._id}`}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} navLink`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/leaves/${user?._id}`}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} navLink`
          }
        >
          <FaBuildingUser />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user?._id}`}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} navLink`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to={"/employee-dashboard/setting"}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} navLink`
          }
        >
          <MdSettingsSuggest />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
