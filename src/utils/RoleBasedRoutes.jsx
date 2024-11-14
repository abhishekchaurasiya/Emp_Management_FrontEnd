/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { userContext } from "../context/authContext"

const RoleBasedRoutes = ({ children, requiredRole }) => {

  const { user, loading } = userContext();

  if (loading) {
    return <h2>Loading...</h2>
  }

  // requiredRole means as an array ['admin', 'employee']
  // It will means user can not access the in this page
  if (!requiredRole.includes(user.role)) {
    <Navigate to='unauthorized' />
  }

  return user ? children : <Navigate to={'/login'} />

}

export default RoleBasedRoutes
