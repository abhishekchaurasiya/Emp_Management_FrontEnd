/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authUrl } from "../constants/BaseUrl";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);



  const ShowInputIcons = ({ inputFunction, inputFunData }) => {
    return (
      <>
        <span
          className={`absolute bottom-3 flex items-center right-3 text-gray-500 hover:text-gray-700 `}
          onClick={() => inputFunction(!inputFunData)}
        >
          {inputFunData ? <FaEye /> : <FaEyeSlash />}
        </span>
      </>
    );
  };


  // user authenticated or verified
  useEffect(() => {
    const verifiedUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            `${authUrl}/verify`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          setUser(null);
          toast.error(error.response.data.error)
        }
      } finally {
        setLoading(false);
      }
    };

    verifiedUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = {
    login,
    logout,
    user,
    loading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isOpen,
    setIsOpen,
    ShowInputIcons,
    dataLoading, 
    setDataLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const userContext = () => useContext(AuthContext);




// export const userContext = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useUserContext must be used within a UserProvider');
//     }
//     return context;
// };
