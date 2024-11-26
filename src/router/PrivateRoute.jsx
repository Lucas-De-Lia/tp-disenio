import { useContext } from "react";
import { Navigate} from "react-router-dom";
import { AuthContext } from "../context";

export const PrivateRoute = ({children}) => {
  const {logged} = useContext(AuthContext);
  return (logged) ? children : <Navigate to="/auth/login" />;
};