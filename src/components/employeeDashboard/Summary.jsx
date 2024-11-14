import { FaUser } from "react-icons/fa";
import { userContext } from "../../context/authContext";

const Summary = () => {
  const { user } = userContext();
  return (
    <div className="p-6">
      <div className="rounded flex bg-white">
        <div
          className={`bg-teal-600 text-3xl flex justify-center items-center text-white px-4`}
        >
          <FaUser />
        </div>
        <div className="pl-4 py-1">
          <p className="text-lg font-semibold">Welcome back</p>
          <p className="text-xl font-bold">{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
