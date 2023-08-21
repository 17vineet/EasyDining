import React, { useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import axios from "axios";

import app from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, passowrd) => {
        return signInWithEmailAndPassword(auth, email, passowrd);
    }

    

    const registerUser = (email, typeOfUser) => {
        const apiUrl = `https://easy-dining-4c644-default-rtdb.firebaseio.com/${typeOfUser}.json`;
        return axios.post(apiUrl, { email }) ;
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = { currentUser, signup, signIn ,registerUser }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}