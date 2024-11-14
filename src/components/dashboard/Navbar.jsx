import { userContext } from "../../context/authContext";

const AdminNavbar = () => {
    const { user, logout } = userContext();
    const capitalize = (name) => name.charAt(0).toUpperCase() + name.substring(1, name.length).toLowerCase();
    // Capitalize the first letter of the user's name before displaying it in the navbar.

    return (
        <div>
            <div className="flex items-center ps-16 lg:items-center lg:justify-between h-14 bg-teal-600 text-white lg:px-14 ">
                <p className="">
                    Welcome, <span className="font-semibold text-lg">{capitalize(user.name)}</span>
                </p>
                <div className="ps-20 pe-2">
                    <button
                        className="lg:py-1 py-0.5 px-3  lg:w-28 bg-emerald-700 rounded lg:text-lg hover:bg-emerald-800 hover:font-semibold transition ease-in duration-300 "
                        onClick={() => logout()}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
