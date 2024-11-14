/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { fetchDepartmentData, getEmployees } from "../../utils/EmployeeHelper";
import "./Style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { salaryUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";

const AddSalary = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    salary: 0,
    allowances: 0,
    deductions: 0,
    paydate: null,
  });

  const [departments, setDeparments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartment = async () => {
      const data = await fetchDepartmentData();
      setDeparments(data);
    };
    getDepartment();
  }, []);

  const handleDepartment = async (e) => {
    const depEmployees = await getEmployees(e.target.value);
    setEmployees(depEmployees);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${salaryUrl}/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Salary added successfully");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-3 bg-white rounded-md shadow-md ">
          <h2 className="text-2xl font-bold px-6 py-3 shadow-md">Add Salary</h2>
          <form className="px-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-5 py-5">
              {/* Department */}
              <div className="">
                <label htmlFor="department" className="em_lable">
                  Department
                </label>
                <select
                  name="department"
                  id="department"
                  className="employee-input"
                  required
                  onChange={handleDepartment}
                //   value={employee.department}
                >
                  <option value="">Select Department</option>
                  {/* department data fetch from the server side or database */}
                  {departments?.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee */}
              <div className="">
                <label htmlFor="employeeId" className="em_lable">
                  Employee
                </label>
                <select
                  name="employeeId"
                  id="employeeId"
                  className="employee-input"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Employee</option>
                  {/* department data fetch from the server side or database */}
                  {employees?.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary   */}
              <div>
                <label className="em_lable" htmlFor="salary">
                  Basic Salary
                </label>
                <input
                  name="salary"
                  type="number"
                  placeholder="Monthly Salary"
                  required
                  className="employee-input"
                  onChange={handleChange}
                />
              </div>

              {/* Allowances   */}
              <div>
                <label className="em_lable" htmlFor="allowances">
                  Allowances
                </label>
                <input
                  name="allowances"
                  type="number"
                  placeholder="Monthly Allowances"
                  required
                  className="employee-input"
                  onChange={handleChange}
                />
              </div>

              {/* deduction   */}
              <div>
                <label className="em_lable" htmlFor="deductions">
                  Deduction
                </label>
                <input
                  name="deductions"
                  type="number"
                  placeholder="Monthly deduction"
                  required
                  className="employee-input"
                  onChange={handleChange}
                />
              </div>

              {/* pay date   */}
              <div>
                <label className="em_lable" htmlFor="paydate">
                  Pay Date
                </label>
                <input
                  name="paydate"
                  type="date"
                  placeholder="Monthly deduction"
                  required
                  className="employee-input"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className=" w-[100%] mb-3 rounded-md bg-teal-600 py-2 text-white font-semibold text-xl"
            >
              {" "}
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default AddSalary;
