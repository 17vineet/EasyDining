import React, {useState, useEffect } from 'react' ; 
import {Outlet} from 'react-router-dom' ;

import useRefreshToken from '../hooks/useRefreshToken' ; 
import { useAuth } from '../contexts/AuthContext';
import Loading from '../Components/Loading/Loading' ;

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true) ; 
    const refresh = useRefreshToken() ; 
    const { auth } = useAuth() ; 

    useEffect(()=>{
        const verifyRefreshToken = async ()=> {
            try{
                await refresh() ; 
            }
            catch (error){
                console.log(error);
            }
            finally{
                setIsLoading(false) ; 
            }
        }
        !auth ? verifyRefreshToken() : setIsLoading(false) ; 
    }, [])

    return isLoading ? <Loading /> : <Outlet />
}

export default PersistLogin ;