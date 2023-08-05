import React, { useContext, useState, useEffect } from "react" ;
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import {appCustomer} from '../firebaseCustomer.js' ;
import {appRestaurant} from '../firebaseRestaurant.js' ;

const AuthContext = React.createContext() ; 

export const useAuth = ()=>{
    return useContext(AuthContext) ;
}

export const AuthProvider = () => {
    const [currentUser, setCurrentUser] = useState(null) ;
    const [loading, setLoading] = useState(true) ;

    const authCustomer = getAuth(appCustomer) ;
    const signupCustomer = (email, password)=>{
        return createUserWithEmailAndPassword(authCustomer ,email, password) ;
    }

    const signInCustomer = (email, passowrd)=>{
        return signInWithEmailAndPassword(authCustomer, email, passowrd) ;
    }

    const authRestaurant = getAuth(appRestaurant) ;
    const signupRestaurant = (email, password)=>{
        return createUserWithEmailAndPassword(authRestaurant ,email, password) ;
    }

    const signInRestaurant = (email, passowrd)=>{
        return signInWithEmailAndPassword(authRestaurant, email, passowrd) ;
    }



    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, user=>{
            setCurrentUser(user) ;
            setLoading(false) ;
        })

        return unsubscribe ;
    },[])

    const value = { currentUser, signup, signIn }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}