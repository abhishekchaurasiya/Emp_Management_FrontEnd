/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/authContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { authUrl } from "../constants/BaseUrl";

const Login = () => {
    const { login, showPassword, setShowPassword, ShowInputIcons } = userContext();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const loginChangehandler = (e) => {
        const { name, value } = e.target;
        setUserLogin({ ...userLogin, [name]: value });
    };

    const submithandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${authUrl}/login`, userLogin);

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigate("/admin-dashboard");
                    toast.success(response.data.message);
                } else {
                    navigate("/employee-dashboard");
                    toast.success(response.data.message);
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                toast.error(error.response.data.error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 to-gray-100 p-4 sm:p-6 lg:p-8 space-y-6">
            <h2 className="font-serif text-3xl text-white">
                Employee Management System
            </h2>

            <div className="border shadow p-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={submithandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border"
                            placeholder="Enter the email"
                            name="email"
                            value={userLogin.email}
                            onChange={loginChangehandler}
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-3 py-2 border"
                            placeholder="*******"
                            name="password"
                            value={userLogin.password}
                            onChange={loginChangehandler}
                        />
                        <ShowInputIcons
                            inputFunction={setShowPassword}
                            inputFunData={showPassword}
                        />
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <label htmlFor="" className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>

                        <Link to="/admin-dashboard/setting" className="text-teal-600">
                            Forgot password
                        </Link>
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2 text-xl rounded font-semibold hover:bg-teal-900 transition ease-in-out duration-500"
                        >
                            Login
                        </button>
                    </div>
                    <div>
                        <p className="text-center text-gray-700">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-teal-600">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
