import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';

const SearchByItems = () => {
  const navigate=useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [results,setResult]=useState([])
  useEffect(()=>{
    const type = searchParams.get('type') ;
    const value = searchParams.get('value') ;
    
    const fetchData=async()=>{
      const resp=await axios.post("http://127.0.0.1:3000/ml/getRestaurantsBySearch",{'type':type,'search':value})
      console.log(resp.data.list)
      setResult(resp.data.list);
    }
    fetchData();
  }, [])
  
  return (
    <>
      {
        results.map((ele,ind)=>{
          return (
           <div>
              <div><img src={ele.thumbnail_url}/></div>
              <div><h4>{ele.name}</h4>
              <h5>{ele.city}</h5>
              </div>
               <div><button className='btn btn-danger'>See Details</button></div>
           </div>
          )
        })
      }
    </>

  )
}

export default SearchByItems