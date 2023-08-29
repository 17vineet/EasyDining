import React, { useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import axios from "axios";

import app from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null) ;
    const [authenticated, setAuthenticated] = useState(false) ;

    const auth = getAuth(app);

    
    const signUp = ({email, password}) => {
        console.log(email, password);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const signIn = ({email, password}) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    const logout = () => {
        return signOut(auth) ;
    }

    // FIREBASE REALTIME

    const registerUser = (formData, typeOfUser) => {
        const apiUrl = `https://easy-dining-4c644-default-rtdb.firebaseio.com/${typeOfUser}.json`;
        return axios.post(apiUrl, formData) ;
    }
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = { 
        currentUser, 
        signUp,
        signIn,
        registerUser, 
        logout, 
        setUserType, 
        userType, 
        authenticated, 
        setAuthenticated,
        setCurrentUser
    }

    console.log(userType);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}