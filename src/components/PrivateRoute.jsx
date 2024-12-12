import React, { useContext } from 'react';
import { AuthContext } from './Provider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    let {user,loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
      return <div className='text-center'><span className="loading loading-spinner loading-lg mx-auto"></span></div>
    }

    if(user){
           return children
    }
   
    return <Navigate state={{from:location.pathname}} to="/login"></Navigate>
};

export default PrivateRoute;