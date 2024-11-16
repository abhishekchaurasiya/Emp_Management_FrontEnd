import { lazy } from "react";
import { Outlet } from "react-router-dom";

const AdminSidebar = lazy(() => import('../components/dashboard/AdminSidebar'))
const AdminNavbar = lazy(() => import('../components/dashboard/Navbar'))
// const Summary = lazy(() => import('../components/dashboard/Summary'))

const AdminDashboard = () => {
    return (
        <div className={`flex`}>
            <AdminSidebar />
            <div className="flex-1 lg:ml-56 bg-gray-200 lg:h-[100vh] h-[100vh]">
                <AdminNavbar />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard
