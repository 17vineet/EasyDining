import React, { useContext, useState, useEffect } from "react" ;
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import app from '../firebase.js' ;

const AuthContext = React.createContext() ; 

export const useAuth = ()=>{
    return useContext(AuthContext) ;
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null) ;
    const [loading, setLoading] = useState(true) ;

    const auth = getAuth(app) ;
    const signup = (email, password)=>{
        return createUserWithEmailAndPassword(auth ,email, password) ;
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, user=>{
            setCurrentUser(user) ;
            setLoading(false) ;
        })

        return unsubscribe ;
    },[])

    const value = { currentUser, signup }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}