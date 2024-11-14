/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { lazy, useEffect, useState } from "react";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import { dashboardUrl } from "../../constants/BaseUrl";
import { userContext } from "../../context/authContext";
import { toast } from "react-toastify";
const SummaryCard = lazy(() => import("./SummaryCard"));

const Summary = () => {
  const [summary, setSummary] = useState([]);
  const { user } = userContext()

  const { totalEmployees, totalDepartments, totalSalary, leaveSummary } =
    summary;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          `${dashboardUrl}/summary/${user?._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {

          setSummary(response.data.summary);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error)
        }
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <div className="p-6">
        <FaHourglassHalf className="text-5xl text-gray-400" />
        <p className="text-center text-xl mt-6">Loading ...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:ps-14">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text={"Total employees"}
          number={totalEmployees}
          color={"bg-teal-600"}
        />

        <SummaryCard
          icon={<FaBuilding />}
          text={"Total Departments"}
          number={totalDepartments}
          color={"bg-yellow-600"}
        />

        <SummaryCard
          icon={<FaMoneyBillWave />}
          text={"Monthly Pay"}
          number={`$${totalSalary}`}
          color={"bg-red-600"}
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text={"Leave Applied"}
            number={leaveSummary?.appliedForLeave}
            color={"bg-teal-600"}
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text={"Leave Approved"}
            number={leaveSummary?.approved}
            color={"bg-gray-600"}
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text={"Leave Pending"}
            number={leaveSummary?.pending}
            color={"bg-yellow-600"}
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text={"Leave Rejected"}
            number={leaveSummary?.rejected}
            color={"bg-red-600"}
          />
        </div>
      </div>
    </div>
  );
};

export default Summary;
