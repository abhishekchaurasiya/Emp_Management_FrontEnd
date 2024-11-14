//    {/* Department */}
//    <div className="">
//    <label htmlFor="department" className="em_lable">
//      Department
//    </label>
//    <select
//      name="department"
//      id="department"
//      className="employee-input"
//      required
//      onChange={handleChange}
//      // value={employee.department}
//    >
//      <option value="">Select Department</option>
//      {/* department data fetch from the server side or database */}
//      {departments.map((dep) => (
//        <option key={dep._id} value={dep._id}>
//          {dep.dep_name}
//        </option>
//      ))}
//    </select>
//  </div>

//  {/* Employee */}
//  <div className="">
//    <label htmlFor="employee" className="em_lable">
//      Employee
//    </label>
//    <select
//      name="employee"
//      id="employee"
//      className="employee-input"
//      required
//      onChange={handleChange}
//      // value={employee.department}
//    >
//      <option value="">Select Department</option>
//      {/* department data fetch from the server side or database */}
//      {departments.map((dep) => (
//        <option key={dep._id} value={dep._id}>
//          {dep.dep_name}
//        </option>
//      ))}
//    </select>
//  </div>

//  {/* Salary   */}
//  <div>
//    <label className="em_lable" htmlFor="salary">
//      Basic Salary
//    </label>
//    <input
//      name="salary"
//      type="number"
//      placeholder="Monthly Salary"
//      required
//      className="employee-input"
//      // value={employee.name}
//      onChange={handleChange}
//    />
//  </div>

//  {/* Allowances   */}
//  <div>
//    <label className="em_lable" htmlFor="allowances">
//      Allowances
//    </label>
//    <input
//      name="allowances"
//      type="number"
//      placeholder="Monthly Allowances"
//      required
//      className="employee-input"
//      // value={employee.name}
//      onChange={handleChange}
//    />
//  </div>

//  {/* deduction   */}
//  <div>
//    <label className="em_lable" htmlFor="deduction">
//      Deduction
//    </label>
//    <input
//      name="deduction"
//      type="text"
//      placeholder="Monthly deduction"
//      required
//      className="employee-input"
//      // value={employee.name}
//      onChange={handleChange}
//    />
//  </div>

//  {/* pay date   */}
//  <div>
//    <label className="em_lable" htmlFor="paydate">
//      Pay Date
//    </label>
//    <input
//      name="paydate"
//      type="date"
//      placeholder="Monthly deduction"
//      required
//      className="employee-input"
//      // value={employee.name}
//      onChange={handleChange}
//    />
//  </div>

// //  *************************************************
// // For Datatable 
// columns={[
//   {
//     Header: "Emp ID",
//     accessor: "emp_id",
//   },
//   {
//     Header: "Leave Type",
//     accessor: "leave_type",
//   },
//   {
//     Header: "Start Date",
//     accessor: "start_date",
//   },
//   {
//     Header: "End Date",
//     accessor: "end_date",
//   },
//   {
//     Header: "Status",
//     accessor: "status",
//   },
//   {
//     Header: "Action",
//     accessor: "action",
//     Cell: ({ value }) => (
//       <div className="flex space-x-3">
//         <Link to={`/admin-dashboard/leave/edit/${value}`}>Edit</Link>
//         <button>Delete</button>
//       </div>
//     ),
//   },
// ]}
// data={leaves}
// pagination
// // customStyles={customStyles}


// // ************************************** toggling
// import React, { useState } from "react";
// import { FaEye , FaEyeSlash } from "react-icons/fa";


// const Register = () => {
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   return (
//     <div className="relative w-full">
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         Password
//       </label>
//       <input
//         type={showPassword ? "text" : "password"}
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-center"
//         placeholder="Enter your password"
//       />

//       {/* Toggle Icon */}
//       <button
//         type="button"
//         onClick={togglePasswordVisibility}
//         // className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
//       >
//         {showPassword ? (
//           <FaEye />
//         ) : (
//          <FaEyeSlash />
//         )}
//       </button>
//     </div>
//   );
// };

// export default Register;


import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { MdSettingsSuggest } from "react-icons/md";

import "./Style.css";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleHamberger = () => setIsOpen(!isOpen);

  return (
    <div>
      <button
        className="text-white p-3 bg-teal-600 fixed top-0 left-0 z-20 lg:hidden"
        onClick={toggleHamberger}
      >
        <GiHamburgerMenu size={24} />
      </button>

      <div
        className={`fixed top-0 left-0 bottom-0 bg-gray-800 text-white h-full transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:w-64 z-10`}
      >
        <div className="bg-teal-600 h-14 flex justify-center items-center">
          <h3 className="font-serif font-semibold text-2xl text-center">
            Employee MS
          </h3>
        </div>

        <div className="px-4">
          {/* Dashboard */}
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink`
            }
            end
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          {/* Employees */}
          <NavLink
            to={"/admin-dashboard/employees"}
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink`
            }
          >
            <FaUsers />
            <span>Employees</span>
          </NavLink>

          {/* Deparments */}
          <NavLink
            to={"/admin-dashboard/departments"}
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink`
            }
          >
            <FaBuilding />
            <span>Departments</span>
          </NavLink>

          {/* Leaves */}
          <NavLink
            to={"/admin-dashboard/leaves"}
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink`
            }
          >
            <FaBuildingUser />
            <span>Leaves</span>
          </NavLink>

          {/* salary */}
          <NavLink
            to={"/admin-dashboard/salary/add"}
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink`
            }
          >
            <FaMoneyBillWave />
            <span>Salary</span>
          </NavLink>

          {/* setting */}
          <NavLink
            to={"/admin-dashboard/setting"}
            className={({ isActive }) =>
              `${isActive ? "bg-teal-600" : ""} navLink`
            }
          >
            <MdSettingsSuggest />
            <span>Setting</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
