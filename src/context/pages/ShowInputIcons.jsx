/* eslint-disable react/prop-types */
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ShowInputIcons = ({inputFunction, inputFunData}) => {
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

export default ShowInputIcons;
