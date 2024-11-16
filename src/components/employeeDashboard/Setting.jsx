import { useState } from "react";
import "./Style.css";
import { userContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { settingUrl } from "../../constants/BaseUrl";
import { toast } from "react-toastify";

const Setting = () => {
    const navigate = useNavigate();
    const { user} = userContext();
    const [password, setPassword] = useState({
        userId: user._id,
        old_password: "",
        new_password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${settingUrl}/change-password`,
                password,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                toast.success(response.data.message)
                navigate(`/admin-dashboard/employees`);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                toast.error(error.response.data.error)
            }
        }
    };

    return (
        <>
            <div className="max-w-xl mx-auto mt-20 bg-white rounded-md shadow-md md:max-w-2xl">
                <h1 className="text-2xl font-bold px-6 py-3 shadow-md">
                    Change Password
                </h1>
                <form onSubmit={handleSubmit} className="px-6">
                    <div className="grid grid-cols-1 gap-y-3 gap-x-5 py-2">
                        {/* Old Password */}
                        <div>
                            <label htmlFor="old_password" className="em_lable">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="old_password"
                                name="old_password"
                                required
                                className="employee-input"
                                placeholder="Enter old password"
                                onChange={handleChange}
                                value={password.old_password}
                            />
                        </div>
                        {/* New Password */}
                        <div>
                            <label htmlFor="new_password" className="em_lable">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="new_password"
                                name="new_password"
                                required
                                className="employee-input"
                                placeholder="Enter new password"
                                onChange={handleChange}
                                value={password.new_password}
                            />
                        </div>
                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirm_password" className="em_lable">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                required
                                className="employee-input"
                                placeholder="Enter confirm password"
                                onChange={handleChange}
                                value={password.confirm_password}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className=" w-[100%] mb-3 rounded-md bg-teal-600 py-2 text-white font-semibold text-xl"
                    >
                        {" "}
                        Change Password
                    </button>
                </form>
            </div>
        </>
    );
};

export default Setting;
