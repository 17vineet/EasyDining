import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [auth, setAuth] = useState(null) ; 

    const value = { auth, currentUser, setAuth, setCurrentUser } ;

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}