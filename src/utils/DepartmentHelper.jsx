/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { departmentUrl } from "../constants/BaseUrl";
import { toast } from "react-toastify";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
    },

    {
        name: "Department", 
        selector: (row) => row.dep_name,
        sortable: true,
    },

    {
        name: "Action",
        selector: (row) => row.action,
    },
];

export const DepartmentButtons = ({ _id, oneDeleteDepartment }) => {
    const navigate = useNavigate();
    const handleDelete = async (_id) => {
        const confirm = window.confirm('Are you sure you want to delete this department?');
        if (confirm) {
            try {
                const response = await axios.delete(
                    `${departmentUrl}/delete/${_id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                if (response.data.success) {
                    oneDeleteDepartment()
                    toast.success('Department deleted successfully!')
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    toast.error(error.response.data.error)
                }
            }
        }
    };

    return (
        <div className="flex space-x-3 items-center">
            <button
                className="px-4 py-1 bg-teal-600 rounded font-medium hover:bg-teal-700 transition ease-in text-white"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                Edit
            </button>

            <button
                className="px-4 py-1 bg-red-600 rounded font-medium hover:bg-red-700 transition ease-in text-white"
                onClick={() => handleDelete(_id)}
            >
                Delete
            </button>
        </div>
    );
};
