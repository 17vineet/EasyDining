import React from 'react' ;
import { useLocation, Navigate, Outlet } from 'react-router-dom' ;

import { useAuth } from '../contexts/AuthContext' ;

const RequireAuth = ({userType}) => {
  const location = useLocation() ; 
  const { currentUser } = useAuth() ;

  return (
      !currentUser ? <Navigate to='/' state={{from: location}} replace/> 
        : currentUser.userType ===  userType ? <Outlet />
        : <Navigate to='/unauthorized' state={{from: location}} replace/> 
  )
}

export default RequireAuth