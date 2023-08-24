import React, {useEffect} from 'react' ;
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext'

const Home = () => {

  const {userType, logout} = useAuth() ;
  const navigate = useNavigate() ; 

  useEffect(()=> {
    const authenticate = async ()=>{
      if(userType == null){
        try {
          await logout() ;
          navigate('/') ;
        } catch (error) {
          console.log(error);
        }
      }
    }
    authenticate() ;
  },[])

  return (
    <h2>Business Home</h2>
  )
}

export default Home