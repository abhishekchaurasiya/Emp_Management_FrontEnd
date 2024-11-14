/* eslint-disable react-hooks/exhaustive-deps */
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import { customStyles } from "./Datatable";
import { employeeUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filterEmployee, setFilterEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(`${employeeUrl}/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
    
          const data = await response?.data?.employees?.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            department: emp?.department?.dep_name,
            name: emp?.userId?.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                src={`${emp?.userId?.profileImage}`}
                className="rounded-full object-fill w-16 h-16"
                alt={emp?.user?.name}
              />
            ),
            action: (
              <EmployeeButtons
                _id={emp._id}
              // oneDeleteDepartment={oneDeleteDepartment}
              />
            ),
          }));
          setEmployees(data);
          setFilterEmployee(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error)
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployeeData();
  }, []);

  const handleFilter = (e) => {
    const filterData = employees.filter((emp) =>
      emp?.name.toLowerCase().includes(e?.target?.value.toLowerCase())
    );
    setFilterEmployee(filterData);
  };

  useEffect(() => {
    handleFilter();
  }, []);

  return (
    <>
      {empLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="p-6 lg:ps-14">
          <div className="text-center">
            <h3 className="text-3xl font-bold">Manage Employees </h3>
          </div>

          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search Employee"
              className="px-2 rounded py-1 outline-none border-gray-400 border-b shadow-md capitalize placeholder:capitalize"
              onChange={handleFilter}
            />
            <Link
              to={"/admin-dashboard/add-employee"}
              className="bg-teal-600 rounded px-3 py-1 font-semibold text-white text-xl"
            >
              Add New Employee
            </Link>
          </div>

          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filterEmployee}
              pagination
              customStyles={customStyles}
              theme={`${"solarized"}`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeesList;
