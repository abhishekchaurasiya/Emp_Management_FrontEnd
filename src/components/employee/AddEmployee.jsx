import { useEffect, useState } from "react";
import "./Style.css";
import { fetchDepartmentData } from "../../utils/EmployeeHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { employeeUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";
import { userContext } from "../../context/authContext";

const AddEmployee = () => {
  const [department, setDeparment] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { showPassword, setShowPassword, ShowInputIcons } = userContext()

  useEffect(() => {
    const getData = async () => {
      const data = await fetchDepartmentData();
      setDeparment(data);
    };
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Because form data contain the file we should use FormData object
    const formDataObject = new FormData();
    Object.keys(formData).forEach((key) => {
      // key means of the [name] and formData[key] means the value of the form
      formDataObject.append(key, formData[key]);
    });

    // Add form submission logic here
    try {
      const response = await axios.post(`${employeeUrl}/add`, formDataObject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-3 bg-white rounded-md shadow-md ">
      <h2 className="text-2xl font-bold px-6 py-3 shadow-md">Add Employee</h2>
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
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="em_lable" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="employee-input"
              onChange={handleChange}
            />
          </div>

          {/* Employee Id */}
          <div>
            <label className="em_lable" htmlFor="employeeId">
              Employee Id
            </label>
            <input
              name="employeeId"
              type="text"
              placeholder="Employee Id"
              required
              className="employee-input"
              onChange={handleChange}
            />
          </div>
          {/* Date of birth */}
          <div>
            <label className="em_lable" htmlFor="employeeId">
              Date of Birth
            </label>
            <input
              name="dob"
              type="date"
              placeholder="DOB"
              required
              className="employee-input"
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="em_lable">Gender</label>
            <select
              className="employee-input"
              name="gender"
              required
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="deparment" className="em_lable">
              Department
            </label>
            <select
              name="department"
              id="deparment"
              className="employee-input"
              required
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {/* department data fetch from the server side or database */}
              {department?.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
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
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="em_lable" htmlFor="employeeId">
              Password
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="employee-input"
              onChange={handleChange}
            />
            <ShowInputIcons
              inputFunction={setShowPassword}
              inputFunData={showPassword}
            />
          </div>

          {/* Role */}
          <div>
            <label className="em_lable">Role</label>
            <select
              className="employee-input"
              name="role"
              required
              onChange={handleChange}
            >
              <option value="">Select Role </option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="em_lable" htmlFor="employeeId">
              Upload Image
            </label>
            <input
              name="image"
              type="file"
              required
              className="employee-input"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className=" w-[100%] mb-3 rounded-md bg-teal-600 py-2 text-white font-semibold text-xl"
        >
          {" "}
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
