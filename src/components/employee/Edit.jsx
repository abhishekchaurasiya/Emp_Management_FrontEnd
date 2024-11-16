/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./Style.css";
import { fetchDepartmentData } from "../../utils/EmployeeHelper";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { employeeUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader"
import { userContext } from "../../context/authContext";


const Edit = () => {
  const [employee, setEmployeeData] = useState({
    name: "",
    maritalStatus: "",
    department: "",
    designation: "",
    salary: 0,
  });
  const { dataLoading, setDataLoading } = userContext()
  const [departments, setDeparments] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Getting departments
  useEffect(() => {
    const getData = async () => {
      const data = await fetchDepartmentData();
      setDeparments(data);
    };
    getData();
  }, []);

  // Fetching employee data
  useEffect(() => {
    const fetchEmployeeData = async () => {
      setDataLoading(true);
      try {
        const response = await axios.get(
          `${employeeUrl}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const emp = response.data.employee;

          setEmployeeData((prevData) => ({
            ...prevData,
            name: emp.userId.name,
            maritalStatus: emp.maritalStatus,
            designation: emp.designation,
            salary: emp.salary,
            department: emp?.department?._id,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error)
        }
      } finally {
        setDataLoading(false);
      }
    };
    fetchEmployeeData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add form submission logic here
    try {
      const response = await axios.put(
        `${employeeUrl}/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {!dataLoading && departments && employee ? (
        <div className="max-w-4xl mx-auto mt-20 bg-white rounded-md shadow-md ">
          <h2 className="text-2xl font-bold px-6 py-3 shadow-md">
            Edit Employee
          </h2>
          <form className="px-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-5 py-5">
              {/* Name */}
              <div>
                <label className="em_lable" htmlFor="name">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Insert name"
                  required
                  className="employee-input"
                  value={employee.name}
                  onChange={handleChange}
                />
              </div>

              {/* marital status */}
              <div>
                <label className="em_lable">Marital Status</label>
                <select
                  className="employee-input"
                  name="maritalStatus"
                  placeholder="Marital status"
                  required
                  onChange={handleChange}
                  value={employee?.maritalStatus}
                >
                  <option value="">Select Status </option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="em_lable" htmlFor="designation">
                  Designation
                </label>
                <input
                  name="designation"
                  type="text"
                  placeholder="Designation"
                  required
                  className="employee-input"
                  onChange={handleChange}
                  value={employee?.designation}
                />
              </div>

              {/* Salary */}
              <div>
                <label className="em_lable" htmlFor="employeeId">
                  Salary
                </label>
                <input
                  name="salary"
                  type="number"
                  placeholder="Salary"
                  required
                  className="employee-input"
                  onChange={handleChange}
                  value={employee?.salary}
                />
              </div>

              {/* Department */}
              <div className="col-span-2">
                <label htmlFor="deparment" className="em_lable">
                  Department
                </label>
                <select
                  name="department"
                  id="deparment"
                  className="employee-input"
                  required
                  onChange={handleChange}
                  value={employee.department}
                >
                  <option value="">Select Department</option>
                  {/* department data fetch from the server side or database */}
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className=" w-[100%] mb-3 rounded-md bg-teal-600 py-2 text-white font-semibold text-xl"
            >
              {" "}
              Update Employee
            </button>
          </form>
        </div>
      ) : (
        <div><Loader /></div>
      )}
    </>
  );
};

export default Edit;
