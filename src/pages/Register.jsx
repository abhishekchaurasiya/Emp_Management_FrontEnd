import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { userContext } from "../context/authContext";
import axios from "axios";
import { authUrl } from "../constants/BaseUrl";
import { toast } from "react-toastify";

const Register = () => {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    ShowInputIcons
  } = userContext();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${authUrl}/register`, formData)
      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/login')
      }

    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error)
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 from-50% to-gray-100
     to-50% py-8">
      <h2 className="font-serif text-lg mt-6 md:text-3xl lg:text-3xl text-white text-center lg:mb-4">
        Employee Management System
      </h2>
      <div className="border shadow p-6 w-full max-w-md sm:max-w-sm md:max-w-xl lg:max-w-2xl bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
              placeholder="enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
              placeholder="enter email"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
              placeholder="*******"
            />
            <ShowInputIcons
              inputFunction={setShowPassword}
              inputFunData={showPassword}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
              placeholder="*******"
            />
            <ShowInputIcons
              inputFunction={setShowConfirmPassword}
              inputFunData={showConfirmPassword}
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              Register
            </button>
          </div>

          <div className="col-span-1 md:col-span-2 text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-600">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
