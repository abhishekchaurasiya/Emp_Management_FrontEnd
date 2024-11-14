/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/authContext";
import "./Style.css";
import { leaveUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";

const AddLeave = () => {
  const { user } = userContext();
  const [leaveData, setLeaveData] = useState({
    userId: user._id,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${leaveUrl}/add`,
        leaveData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
        toast.success(`Leave request are submitted successfully!`)
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
    <div className="max-w-4xl mx-auto mt-3 bg-white rounded-md shadow-md ">
      <h2 className="text-2xl font-bold px-6 py-3 shadow-md">
        {" "}
        Request for Leave
      </h2>
      <form className="px-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-5 py-5">
          {/* Leave */}
          <div className="col-span-2">
            <label htmlFor="leaveType" className="em_lable">
              Leave Casual
            </label>
            <select
              name="leaveType"
              id="leaveType"
              className="employee-input"
              required
              onChange={handleChange}
            //   value={employee.department}
            >
              <option value="">Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual leave">Annual Leave</option>
            </select>
          </div>

          {/* from date   */}
          <div>
            <label className="em_lable" htmlFor="salary">
              From Date
            </label>
            <input
              name="startDate"
              type="date"
              required
              className="employee-input"
              onChange={handleChange}
            />
          </div>

          {/* to date   */}
          <div>
            <label className="em_lable" htmlFor="allowances">
              To Date
            </label>
            <input
              name="endDate"
              type="date"
              required
              className="employee-input"
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2">
            <label className="em_lable" htmlFor="reason">
              Description
            </label>
            <textarea
              name="reason"
              id="reason"
              type="text"
              rows="5"
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
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
