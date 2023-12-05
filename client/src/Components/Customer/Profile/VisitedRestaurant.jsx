import React, { useEffect, useState } from 'react'
import API from '../../../axios'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import "./VisitedRestaurant.css"
const VisitedRestaurant = () => {
    const {currentUser}=useAuth();
    const [visited,setVisited]=useState([]);
    const navigate = useNavigate() ; 
    useEffect(()=>{
     const fetchData=async()=>{
        const resp=await API.post("/customer/getVisited",{phone:currentUser.phone});
        console.log(resp.data);
        setVisited(resp.data)
     }
     fetchData()
    },[])
    const getBill= async (orderId)=>{
      
        navigate(`/customer/bill/${orderId}`) ;
    }
  return (
    <>
    <h2>Dining History</h2>
   <div className='visited_div'>
        {
            visited.length>0 ?
            visited.map((ele,ind)=>{
                return (
                    <div className='visited_restaurant_list'>
                        <div><img src="./ez.jpeg"/></div>
                        <div><h3>Name : {ele.restaurant_name}</h3>
                        <h6>Dine-in Date : {ele.billDate}</h6>
                        </div>
                        <div><h6>Bill Amount : {ele.billAmt}</h6>
                        <h6>Bill Number : {ele._id.slice(-6)}</h6>
                        <button className='btn btn-primary' onClick={()=>{
                            getBill(ele.orderId)
                        }}>Details</button>
                        </div>
                    </div>
                )
            }):<h2>No Dining History Yet</h2>
        }
        
   </div>
   </>


  )
}

export default VisitedRestaurant