import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { Rating } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import "./SearchByItems.css"
const SearchByItems = () => {
  const navigate=useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [results,setResult]=useState([])
  const {currentUser} = useAuth() ;
  const location = useLocation() ;

  useEffect(()=>{
    const type = searchParams.get('type') ;
    const value = searchParams.get('value') ;
    
    const fetchData=async()=>{
      const resp=await axios.post("http://127.0.0.1:3000/ml/getRestaurantsBySearch",{'city':currentUser.last_city ,'type':type,'search':value})
      console.log(resp.data.list)
      setResult(resp.data.list);
    }
    fetchData();
  }, [location])
  
  const handeleClick=(id)=>{
    navigate(`/restaurantDetails/${id}`)
  }
  return (
    <div className='search_items'>
      {
        results.length> 0 ? results.map((ele,ind)=>{
          return (
           <div className='search_result_card' key={ind}>
              <div><img src={ele.thumbnail_url} /></div>
              <div><h4>{ele.name}</h4>
              <h5>{ele.city}</h5>
              <Rating value={ele.rating} readOnly />
              </div>
               <div><button className='btn btn-danger' onClick={()=>{
                handeleClick(ele._id)
               }}>See Details</button></div>
           </div>
          )
        }) : <h3>No Results Found</h3>
      }
    </div>

  )
}

export default SearchByItems