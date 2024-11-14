import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

const EmpSummary = lazy(() => import("./components/employeeDashboard/Summary"));
const AddLeave = lazy(() => import("./components/leave/AddLeave"));
const LeaveList = lazy(() => import("./components/leave/LeaveList"));
const Setting = lazy(() => import("./components/employeeDashboard/Setting"));
const LeaveDetails = lazy(() => import("./components/leave/LeaveDetails"));
const Table = lazy(() => import("./components/leave/Table"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const EmployeeDashboard = lazy(() => import("./pages/EmployeeDashboard"));
const PrivateRoutes = lazy(() => import("./utils/PrivateRoutes"));
const RoleBasedRoutes = lazy(() => import("./utils/RoleBasedRoutes"));
const Summary = lazy(() => import("./components/dashboard/Summary"));
const DepartmentList = lazy(() => import("./components/department/DepartmentList"));
const AddDepartment = lazy(() => import("./components/department/AddDepartment"));
const EditDepartment = lazy(() => import("./components/department/EditDepartment"));
const Edit = lazy(() => import("./components/employee/Edit"));
const ViewEmployee = lazy(() => import("./components/employee/ViewEmployee"));

const EmployeeList = lazy(() => import("./components/employee/EmployeesList"));
const AddEmployee = lazy(() => import("./components/employee/AddEmployee"));
const AddSalary = lazy(() => import("./components/salary/AddSalary"));
const ViewSalary = lazy(() => import("./components/salary/Salary"));

const App = () => {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Parent Route */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBasedRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RoleBasedRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<Summary />} />

            {/* Department routes */}
            <Route
              path="/admin-dashboard/departments"
              element={<DepartmentList />}
            />
            <Route
              path="/admin-dashboard/add-department"
              element={<AddDepartment />}
            />
            <Route
              path="/admin-dashboard/department/:id"
              element={<EditDepartment />}
            />

            {/* Employee routes */}
            <Route
              path="/admin-dashboard/employees"
              element={<EmployeeList />}
            />
            <Route
              path="/admin-dashboard/add-employee"
              element={<AddEmployee />}
            />

            <Route
              path="/admin-dashboard/employee/:id"
              element={<ViewEmployee />}
            />

            <Route
              path="/admin-dashboard/employee/edit/:id"
              element={<Edit />}
            />

            {/* Salary */}
            <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />
            <Route
              path="/admin-dashboard/employee/salary/:id"
              element={<ViewSalary />}
            />

            {/* Leave */}
            <Route path="/admin-dashboard/leaves" element={<Table />} />
            <Route
              path="/admin-dashboard/leaves/details/:id"
              element={<LeaveDetails />}
            />

            <Route
              path="/admin-dashboard/employee/leave/:id"
              element={<LeaveList />}
            />

            {/* Setting  */}
            <Route path="/admin-dashboard/setting" element={<Setting />} />
          </Route>

          {/* Empolyee Dashboard */}
          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoutes>
                <RoleBasedRoutes requiredRole={["admin", "employee"]}>
                  <EmployeeDashboard />
                </RoleBasedRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<EmpSummary />} />
            <Route
              path="/employee-dashboard/profile/:id"
              element={<ViewEmployee />}
            />

            {/* Leaves */}

            <Route
              path="/employee-dashboard/leaves/:id"
              element={<LeaveList />}
            />
            <Route
              path="/employee-dashboard/add-new-leave/:id"
              element={<AddLeave />}
            />

            <Route
              path="/employee-dashboard/salary/:id"
              element={<ViewSalary />}
            />

            {/* Setting */}
            <Route path="/employee-dashboard/setting" element={<Setting />} />
          </Route>
          {/* *********************************** */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
