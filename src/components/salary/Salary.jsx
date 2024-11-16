/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../context/authContext";
import { salaryUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader"

const Salary = () => {
  const { id } = useParams();
  const { user, dataLoading, setDataLoading } = userContext()

  const [salaries, setSalaries] = useState(null);
  const [filterSalaries, setFilterSalaries] = useState(null);

  const fetchSalaries = async () => {
    setDataLoading(true)
    try {
      const response = await axios.get(
        `${salaryUrl}/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setSalaries(response.data.salaries);
        setFilterSalaries(response.data.salaries);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error)
      }
    }finally{
      setDataLoading(false)
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const handleSalary = (e) => {
    const query = e.target.value;
    const filterRecords = salaries.filter((sal) =>
      sal.employeeId.employeeId.toLowerCase().includes(query.toLowerCase())
    );
    setFilterSalaries(filterRecords);
  };

  return (
    <>
      {filterSalaries === null ? (
        <div className="lg:ps-14"><Loader/></div>
      ) : (
        <div className="overflow-x-auto p-5 lg:ps-14">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>

          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search by Employee Id"
              className="border px-2 rounded-md py-1 border-gray-300"
              onChange={handleSalary}
            />
          </div>

          {filterSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs to-gray-700 uppercase bg-red-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">Sno</th>
                  <th className="px-6 py-3">Employee ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">allowance</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay date</th>
                </tr>
              </thead>
              <tbody>
                {filterSalaries.map((sal, index) => (
                  <tr
                    key={sal._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-300"
                  >
                    <td className="border px-6 py-4">{index + 1}</td>
                    <td className="border px-6 py-4">
                      {sal.employeeId.employeeId}
                    </td>
                    <td className="border px-6 py-4">{sal.salary}</td>
                    <td className="border px-6 py-4">{sal.allowances}</td>
                    <td className="border px-6 py-4">{sal.deductions}</td>
                    <td className="border px-6 py-4">{sal.netSalary}</td>
                    <td className="border px-6 py-4">
                      {new Date(sal.paydate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className=" text-center">No more records...</div>
          )}
        </div>
      )}
    </>
  );
};

export default Salary;
