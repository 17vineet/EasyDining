import { useEffect } from 'react';

import { axiosPrivate } from '../axios' ;
import useRefreshToken from './useRefreshToken' ;
import { useAuth } from '../contexts/AuthContext';

const useAxiosPrivate = () => {
    const { auth } = useAuth() ; 
    const refresh = useRefreshToken() ; 

    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers.Authorization){
                    config.headers.Authorization = `Bearer ${auth}` ;
                }
                return config ;
            } ,
            (error) => Promise.reject(error) 
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response ,
            async (error) => {
                const prevReq = error?.config ; 
                if(error?.response?.status === 403 || !prevReq?.send){
                    prevReq.send = true ; 
                    const newAccessToken = await refresh() ; 
                    prevReq.headers.Authorization = `Bearer ${newAccessToken}` ;
                    return axiosPrivate(prevReq) ;
                }
                return Promise.reject(error) ;
            }
        )

        return  ()=> {
            axiosPrivate.interceptors.request.eject(requestIntercept) ; 
            axiosPrivate.interceptors.response.eject(responseIntercept) ; 
        }

    }, [auth, refresh])

    return axiosPrivate ; 
}

export default useAxiosPrivate ; 