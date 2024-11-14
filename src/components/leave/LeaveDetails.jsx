/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { leaveUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";
import Buttons from "../reuse_components/Buttons";

const LeaveDetails = () => {
  const { id } = useParams();
  const [leaveData, setLeaveData] = useState(null);
  const fetchLeave = async () => {
    try {
      const response = await axios.get(
        `${leaveUrl}/details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeaveData(response.data.leave);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error)
      }
    }
  };

  useEffect(() => {
    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `${leaveUrl}/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        // navigate("/admin-dashboard/leaves");
        fetchLeave(); // render the get leave api
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error)
      }
    }
  };

  return (
    <>
      {leaveData ? (
        <div className=" bg-white py-4 m-10 rounded-md shadow-md shadow-slate-300">
          <h1 className=" font-bold text-3xl text-center"> Employee Details</h1>
          <div className="flex flex-col justify-center items-center mt-12 space-x-20 w-full lg:flex-row">
            <img
              src={`${leaveData?.employeeId?.userId?.profileImage}`}
              alt={leaveData?.userId?.name}
              className="block mx-auto sm:mx-0 sm:shrink-0 object-fit rounded-full lg:h-[300px] lg:w-[300px] w-[200px] h-[200px]"
            />

            <div className="flex flex-col space-y-3 py-6  ">
              <p>Name: {leaveData?.employeeId?.userId?.name}</p>
              <p>Employee ID: {leaveData?.employeeId?.employeeId}</p>
              <p>Leave Type: {leaveData?.leaveType}</p>
              <p>Reason: {leaveData?.reason}</p>
              <p>Department: {leaveData?.employeeId?.department?.dep_name}</p>
              <div className="flex space-x-3">
                <p>Start Date:</p>
                <p>{new Date(leaveData?.startDate).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-3">
                <p>End Date: </p>
                <p>{new Date(leaveData?.endDate).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-3">
                <p className="font-semibold text-lg">
                  {leaveData?.status === "Pending" ? "Actions:" : "Status:"}
                </p>
                {leaveData?.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-600 rounded py-1 px-3 text-white hover:bg-green-700"
                      onClick={() => changeStatus(leaveData._id, "Approved")}
                    >
                      Approved
                    </button>
                    <button
                      className="bg-red-600 rounded py-1 px-3 text-white hover:bg-red-700"
                      onClick={() => changeStatus(leaveData?._id, "Rejected")}
                    >
                      Rejected
                    </button>
                  </div>
                ) : (
                  <p className="font-normal">{leaveData?.status}</p>
                )}
                {/* {leaveData?.status === "Pending" ? (
                <div>
                  <p className="inline-block me-4 text-lg font-semibold">
                    Action:
                  </p>
                  <div className="inline-block space-x-3">
                    <button className="bg-green-600 rounded py-1 px-3 font-semibold text-white hover:bg-green-700">
                      Accept
                    </button>
                    <button className="bg-red-600 rounded py-1 px-3 font-semibold text-white hover:bg-red-700">
                      Reject
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <p>Status</p>
                  <p> {leaveData?.status}</p>
                </div>
              )} */}
              </div>
            </div>
          </div>

          <Buttons endPoint={"/admin-dashboard/leaves"}>
            back to leaves
          </Buttons>
        </div>
      ) : (
        <div>Loading.....</div>
      )}
    </>
  );
};

export default LeaveDetails;
