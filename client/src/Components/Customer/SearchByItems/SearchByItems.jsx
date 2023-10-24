import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';

const SearchByItems = () => {
  const navigate=useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(()=>{
    const type = searchParams.get('type') ;
    const value = searchParams.get('value') ;
    
    const fetchData=async()=>{
      const resp=await axios.post("http://localhost:5000/ml/getRestaurantsBySearch",{'type':type,'search':value})
      console.log(resp.data.list)
    }
    fetchData();
  }, [])
  
  return (
    <div>SearchByItems</div>
  )
}

export default SearchByItems