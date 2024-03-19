import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { token } = useAuthContext()
    if (token) {
        setIsAuthenticated(true)
    }

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;
