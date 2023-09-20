import jwtDecode from 'jwt-decode' ; 

import API from '../axios' ; 
import {useAuth} from '../contexts/AuthContext' ; 

const useRefreshToken = () => {
    const {setAuth, setCurrentUser} = useAuth() ; 

    const refresh = async ()=> {
        const response = await API.get('/refresh') ;
        const accessToken = response.data.accessToken ; 
        const decodedToken = jwtDecode(accessToken) ; 

        setAuth(accessToken) ; 
        setCurrentUser(decodedToken) ; 

        return accessToken ;
    }
    return refresh ; 
}

export default useRefreshToken ;