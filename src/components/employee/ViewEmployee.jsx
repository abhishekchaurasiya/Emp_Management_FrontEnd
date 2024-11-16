/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../utils/Loader";
import { employeeUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";
import Buttons from "../reuse_components/Buttons";
import { userContext } from "../../context/authContext";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({});
  const formatDate = (dob) => new Date(dob).toLocaleDateString();
  const { user, dataLoading, setDataLoading } = userContext();

  // fetch data from API using the id
  const fetchEmployeeData = async () => {
    setDataLoading(true);
    try {
      const response = await axios.get(`${employeeUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setEmployeeData(response.data.employee);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <>
      {dataLoading ? (
        <Loader />
      ) : (
        <div className="bg-white py-8 px-6 md:px-16 lg:px-20 xl:px-28 m-6 md:m-10 lg:m-14 rounded-lg shadow-lg flex items-center flex-col">
          <h1 className="font-bold text-3xl text-center text-teal-700 mb-6">
            Employee Details
          </h1>
          <div className="flex flex-col items-center lg:flex-row lg:space-x-12">
            <img
              src={`${employeeData?.userId?.profileImage}`}
              alt={employeeData?.userId?.name}
              className="object-cover rounded-full w-48 h-48 lg:w-64 lg:h-64 shadow-md"
            />

            <div className="mt-8 lg:mt-0 flex flex-col items-start lg:items-start space-y-4 text-lg">
              <p className="text-gray-700">
                <span className="font-semibold text-teal-600">Name:</span>{" "}
                {employeeData?.userId?.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-teal-600">
                  Employee ID:
                </span>{" "}
                {employeeData.employeeId}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-teal-600">
                  Date of Birth:
                </span>{" "}
                {formatDate(employeeData.dob)}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-teal-600">Gender:</span>{" "}
                {employeeData.gender}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-teal-600">Department:</span>{" "}
                {employeeData.department?.dep_name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-teal-600">
                  Marital Status:
                </span>{" "}
                {employeeData.maritalStatus}
              </p>
            </div>
          </div>

          {user.role === "admin" && (
            <Buttons endPoint={"/admin-dashboard/employees"}>
              back to employees
            </Buttons>
          )}
        </div>
      )}
    </>
  );
};

export default ViewEmployee;
