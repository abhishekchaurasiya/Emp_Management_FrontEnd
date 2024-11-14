/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../../context/authContext";
import "./Style.css";
import { leaveUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";

const LeaveList = () => {
  const { id: empId } = useParams();

  const { user } = userContext();
  const [leaveData, setLeaveData] = useState([]);
  const [filterSalaries, setFilterSalaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateFunc = (date) =>
    new Date(date).toLocaleDateString().toString().trim();
  const navigate = useNavigate();

  const fetchLeaveData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${leaveUrl}/list/${empId}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeaveData(response.data.leaves);
        setFilterSalaries(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error)
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const filterHandler = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredData = leaveData?.filter(
      (leave) =>
        leave.leaveType.toLowerCase().includes(query) ||
        dateFunc(leave.startDate).includes(query) ||
        dateFunc(leave.endDate).includes(query) ||
        leave.status.toLowerCase().includes(query)
    );
    setFilterSalaries(filteredData);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold">Manage Leaves </h3>
      </div>

      <div className="flex justify-between items-center mt-4 px-8">
        <input
          type="text"
          placeholder="Search Leave"
          className="px-2 rounded py-1 outline-none border-gray-400 border-b shadow-md capitalize placeholder:capitalize"
          onChange={filterHandler}
        />

        {user?.role === "employee" ? (
          <Link
            to={`/employee-dashboard/add-new-leave/${empId}`}
            className="bg-teal-600 rounded px-3 py-1 font-semibold text-white text-xl"
          >
            Add Leave
          </Link>
        ) : (
          <button onClick={() => navigate(`/admin-dashboard/employees`)} className="bg-teal-600 rounded px-3 py-0.5 text-white">
            {" "}
            Back to Employees
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="mt-6">
          {filterSalaries?.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs to-gray-700 uppercase bg-gray-100 text-teal-600 border border-gray-200">
                <tr>
                  <th className="table_head">Sno</th>
                  <th className="table_head">Leave Type</th>
                  <th className="table_head">From </th>
                  <th className="table_head">To</th>
                  <th className="table_head">Description</th>
                  <th className="table_head">Applied Date</th>
                  <th className="table_head">Status</th>
                </tr>
              </thead>
              <tbody>
                {filterSalaries?.map((leave, index) => (
                  <tr
                    key={leave._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-300 text-center"
                  >
                    <td className="table_data">{index + 1}</td>
                    <td className="table_data">{leave.leaveType}</td>
                    <td className="table_data">{dateFunc(leave.startDate)}</td>
                    <td className="table_data">{dateFunc(leave.endDate)}</td>
                    <td className="table_data">{leave.reason}</td>
                    <td className="table_data">{dateFunc(leave.appliedAt)}</td>
                    <td className="table_data">{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className=" text-center">No more records...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaveList;
