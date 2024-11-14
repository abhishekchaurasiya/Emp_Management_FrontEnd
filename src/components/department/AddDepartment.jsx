import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { departmentUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";

const AddDepartment = () => {
  const [deparment, setDeparment] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeparment((prev) => ({ ...prev, [name]: value }));
  };

  const submitDepartment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${departmentUrl}/add`,
        deparment,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error)
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h3 className="text-2xl font-bold mb-6">Add Department</h3>
      {/* {depErrors && <p className="text-red-500">{depErrors}</p>} */}
      <form action="" onSubmit={submitDepartment}>
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            type="text"
            placeholder="Enter department name"
            id="name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md outline-none capitalize"
            name="name"
            value={deparment.name}
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
            value={deparment.description}
            onChange={handleInputChange}
          />
        </div>

        <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md">
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
