import React, { useContext, useState, useEffect } from "react";
import jwtDecode from 'jwt-decode' ;
// import { useLocation } from "react-router-dom";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [userType, setUserType] = useState(null) ;
    // const location = useLocation() ;

    // const loadUser = ()=> {
    //     const token = JSON.parse(localStorage.getItem('profile')) ;
    //     if(token){
    //         const decodecToken = jwtDecode(token) ;
    //         setCurrentUser(decodecToken) ; 
    //         setUserType(localStorage.getItem('userType')) ;
    //     }
    // }

    const value = { userType, currentUser, setUserType, setCurrentUser }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}