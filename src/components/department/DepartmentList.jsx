/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import { useEffect, useState } from "react";
import axios from "axios";
import { departmentUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";

const DepartmentList = () => {
  const [depData, setDepData] = useState([]);
  const [isDepData, setIsDepData] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  // delete filter
  const oneDeleteDepartment = () => fetchData();

  const fetchData = async () => {
    setIsDepData(true);
    try {
      const response = await axios.get(
        `${departmentUrl}/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        let sno = 1;
        const data = await response.data?.departments?.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              oneDeleteDepartment={oneDeleteDepartment}
            />
          ),
        }));

        setDepData(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error)
      }
    } finally {
      setIsDepData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // filter department data on input change
  const filterDepartments = (e) => {
    const filterData = depData.filter((data) =>
      data.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(filterData);
  };

  useEffect(() => {
    filterDepartments();
  }, []);

  return (
    <>
      {isDepData ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5 lg:ps-14">
          <div className="text-center">
            <h3 className="text-3xl font-bold">Manage Departments</h3>
          </div>

          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search Department"
              className="px-2 rounded py-1 outline-none border-gray-400 border-b shadow-md capitalize placeholder:capitalize"
              onChange={filterDepartments}
            />
            <Link
              to={"/admin-dashboard/add-department"}
              className="bg-teal-600 rounded px-3 py-1 font-semibold text-white text-xl"
            >
              Add New Department
            </Link>
          </div>

          <div className="mt-5">
            <DataTable columns={columns} data={filteredDepartments} pagination></DataTable>
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
