import React, { useEffect, useState } from 'react'
import API from '../../../axios'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import "./VisitedCustomer.css"
const VisitedCustomer = () => {
    const { currentUser } = useAuth();
    const [visited, setVisited] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const resp = await API.post("/restaurant/getBills", { rid: currentUser._id });
            console.log(resp.data);
            setVisited(resp.data)
        }
        fetchData()
    }, [])
    const getBill = async (orderId) => {
        navigate(`/restaurant/bill/${orderId}`);
    }
    return (
        <>
            <div className='visited_div'>
                <h2>Customer History</h2>
                {
                    visited.map((ele, ind) => {
                        return (
                            <div className='visited_customer_list'>
                                <div><img src="../ED.jpeg" /></div>
                                <div><h3>Customer : {ele.customer} </h3>
                                    <h6>Dine-in Date : {ele.billDate}</h6>
                                </div>
                                <div><h6>Bill Amount : {ele.billAmt}</h6>
                                    <h6>Bill Number : {ele._id.slice(-6)}</h6>
                                    <button className='btn btn-primary' onClick={() => {
                                        getBill(ele.orderId)
                                    }}>Details</button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>

    )
}

export default VisitedCustomer