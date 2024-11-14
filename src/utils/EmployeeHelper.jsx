/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { departmentUrl, employeeUrl } from "../constants/BaseUrl";
import { toast } from "react-toastify";

// Fetch data for department options
export const fetchDepartmentData = async () => {
  let departments;
  try {

    const response = await axios.get(`${departmentUrl}/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;  
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error)
    }
  }
  return departments;
};

//  employees for salary from
export const getEmployees = async (depId) => {
  let employees;
  try {
    const response = await axios.get(
      `${employeeUrl}/department/${depId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error)
    }
  }
  return employees;
};

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
    center: true,
    style: { fontWeight: "bold" },
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "180px",
    center: true,
    // cell: (row) => <div style={{ textAlign: "center" }}>{row.name}</div>,
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "180px",
    center: true,
  },

  {
    name: "Department",
    selector: (row) => row.department,
    width: "200px",
    center: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    width: "150px",
    center: true,
  },

  {
    name: "Actions",
    selector: (row) => row.action,
    center: true,
  },
];

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3 items-center">
      <button
        className="px-4 py-1 bg-teal-600 rounded font-medium hover:bg-teal-700 transition ease-in text-white"
        onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
      >
        View
      </button>

      <button
        className="px-4 py-1 bg-green-600 rounded font-medium hover:bg-red-700 transition ease-in text-white"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
      >
        Edit
      </button>

      <button
        className="px-4 py-1 bg-yellow-600 rounded font-medium hover:bg-red-700 transition ease-in text-white"
        onClick={() => navigate(`/admin-dashboard/employee/salary/${_id}`)}
      >
        Salary
      </button>

      <button
        className="px-4 py-1 bg-red-600 rounded font-medium hover:bg-red-700 transition ease-in text-white"
        onClick={() => navigate(`/admin-dashboard/employee/leave/${_id}`)}
      >
        Leave
      </button>
    </div>
  );
};
