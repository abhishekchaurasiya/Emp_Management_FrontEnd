/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export const leaveColumns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
    // center:true
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "180px",
    // center:true
  },

  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "180px",
    // center:true
  },

  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "200px",
    // center:true
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "150px",
    // center:true
  },

  {
    name: "Days",
    selector: (row) => row.days,
    // center:true
  },

  {
    name: "Status",
    selector: (row) => row.status,
    // center:true
  },
  {
    name: "Action",
    selector: (row) => row.action,
    // center:true
  },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/details/${id}`);
  };

  return (
    <button
      className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600 transition ease-out duration-200 text-md font-semibold"
      onClick={() => handleView(Id)}
    >
      View
    </button>
  );
};
