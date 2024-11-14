/* eslint-disable react/prop-types */

// Inside check the visibility of the user means if the user already logged in or not
import { Navigate } from 'react-router-dom'
import { userContext } from "../context/authContext"

const PrivateRoutes = ({ children }) => {
    const { user, loading } = userContext();

    if (loading) {
        return <div>Loading....</div>
    }

    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoutes
