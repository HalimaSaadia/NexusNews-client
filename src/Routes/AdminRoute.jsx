import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loader from "../shared/Loader/Loader";
import useUserState from "../Hooks/useIsAdmin";
import { Navigate } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const {isAdmin,adminLoading} = useUserState()
    if(loading || adminLoading) {
        return <Loader />
    }
    if(user && isAdmin==='admin'){
        return children
    }
    return <Navigate to="/" />
  
};

export default AdminRoute;