import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { LeaveButtons, leaveColumns } from "../../utils/LeaveHelper";
import { leaveUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${leaveUrl}/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
      
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave?.employeeId.employeeId,
          name: leave?.employeeId?.userId?.name,
          leaveType: leave?.leaveType,
          department: leave?.employeeId?.department?.dep_name,
          days:
            new Date(leave?.endDate).getDate() -
            new Date(leave?.startDate).getDate(),
          status: leave?.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error)
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const query = e.target.value?.toLowerCase();
    const filteredLeaves = leaves?.filter(
      (leave) =>
        leave?.employeeId.toLowerCase().includes(query) ||
        leave.name.toLowerCase().includes(query)
    );
    setFilteredLeaves(filteredLeaves);
  };

  const filterByButton = (status) => {
    const filterData = leaves?.filter(
      (leave) => leave?.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(filterData);
  };

  return (
    <>

      <div className="p-6 lg:ps-14">
        <div className="text-center">
          <h3 className="text-3xl font-bold">Manage Leaves </h3>
        </div>

        <div className="flex justify-between items-center mt-4">
          <input
            type="text"
            placeholder="Search by emp id"
            className="px-2 rounded py-1 outline-none border-gray-400 border-b shadow-md  placeholder:capitalize"
            onChange={filterByInput}
          />
          <div className="flex space-x-3">
            <button
              onClick={() => filterByButton("Pending")}
              className="bg-teal-600 rounded px-3 py-1 font-semibold text-white text-xl"
            >
              Pending
            </button>

            <Link
              onClick={() => filterByButton("Approved")}
              className="bg-teal-600 rounded px-3 py-1 font-semibold text-white text-xl"
            >
              Approved
            </Link>

            <Link
              onClick={() => filterByButton("Rejected")}
              className="bg-teal-600 rounded px-3 py-1 font-semibold text-white text-xl"
            >
              Rejected
            </Link>
          </div>
        </div>
        <div className="mt-6">
          <DataTable
            columns={leaveColumns}
            data={filteredLeaves}
            pagination
          />
        </div>
      </div>

    </>
  );
};

export default Table;
