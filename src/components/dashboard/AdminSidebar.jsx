import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { MdSettingsSuggest } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi"; // Importing the hamburger icon

import "./Style.css";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Icon for mobile view */}
      <button
        className="text-white p-3 bg-teal-600 fixed top-0 left-0 z-20 lg:hidden py-4"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 bg-gray-800 text-white h-full transform transition-transform duration-300 ${isOpen ? "translate-x-0 w-96" : "-translate-x-full"
          } lg:translate-x-0 lg:w-64 z-10`}
      >
        {/* Header */}
        <div className="bg-teal-600 h-14 flex lg:justify-center items-start lg:items-center">
          <h3 className="font-serif font-semibold text-xl text-center mt-4 ms-12 lg:ms-0 lg:text-2xl md:ms-0 md:text-2xl lg:mt-0">
            Employee MS
          </h3>
        </div>

        {/* Navigation Links */}
        <div className="px-4 space-y-2">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink mt-2`
            }
            end
            onClick={() => setIsOpen(false)}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/employees"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaUsers />
            <span>Employees</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/departments"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaBuilding />
            <span>Departments</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/leaves"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaBuildingUser />
            <span>Leaves</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/salary/add"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaMoneyBillWave />
            <span>Salary</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/setting"
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink`
            }
            onClick={() => setIsOpen(false)}
          >
            <MdSettingsSuggest />
            <span>Setting</span>
          </NavLink>
        </div>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-5 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminSidebar;
