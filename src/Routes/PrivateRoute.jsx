import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../shared/Loader/Loader';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return <Loader />
    }
   if(user){
    
    return children
   }
   return <Navigate to="/login" state={location.pathname}/>
};

export default PrivateRoute;