/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { departmentUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";
import { userContext } from "../../context/authContext";
import Loader from "../../utils/Loader"

const EditDepartment = () => {
  const { id } = useParams();
  const [depData, setDepData] = useState([]);
  const navigate = useNavigate();
  const {dataLoading, setDataLoading} = userContext()

  useEffect(() => {
    const fetchDepartment = async () => {
      setDataLoading(true);
      try {
        const response = await axios.get(
          `${departmentUrl}/get/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        if (response.data.success) {
          setDepData(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error)
        }
      } finally {
        setDataLoading(false);
      }
    };

    fetchDepartment();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepData({ ...depData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${departmentUrl}/edit/${id}`,
        depData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments")
        toast.success(`Department updated successfully`)
      } 

    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error)
      }
    }
  }

  return (
    <>
      {dataLoading ? (
        <div><Loader/></div>
      ) : (
        <div className="max-w-3xl mx-auto mt-20 bg-white p-8 rounded-md shadow-md w-96">
          <h3 className="text-2xl font-bold mb-6">Edit Department</h3>
          {/* {depErrors && <p className="text-red-500">{depErrors}</p>} */}
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="dep_name"
                className="text-sm font-medium text-gray-700"
              >
                Department Name
              </label>
              <input
                type="text"
                placeholder="Enter department name"
                id="dep_name"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md outline-none capitalize"
                name="dep_name"
                value={depData.dep_name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 block mt-2"
              >
                Description
              </label>
              <textarea
                placeholder="Description"
                id="description"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
                name="description"
                value={depData.description}
                onChange={handleInputChange}
              />
            </div>

            <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition ease-in">
              Edit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
