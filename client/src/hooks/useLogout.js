import API from '../axios' ; 
import { useAuth } from '../contexts/AuthContext';

const useLogout = ()=> {
    const {setAuth, setCurrentUser} = useAuth() ; 

    const logout = async ()=> {
        setAuth(null) ; 
        setCurrentUser(null) ;

        try {
            const response = await API.get('/logout') ; 
        } catch (error) {
            console.error(error);
        }
    }
    return logout ;
}

export default useLogout ; 