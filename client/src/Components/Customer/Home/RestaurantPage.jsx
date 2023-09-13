import './RestaurantPage.css'
import React, { useEffect } from 'react'
import Navbar from '../../Navbar'
import { useParams } from 'react-router-dom'
import API from '../../../axios'
const RestaurantPage = () => {
    const { rid } = useParams();
    console.log(rid)
    useEffect(()=>{
        fetchData();
    })
    const fetchData=async()=>{
        const details=await API.post('/restaurant/restaurantInfo',{rid})
        const resp=await API.post('/restaurant/getRestaurantMenu',{rid})

        console.log(details.data)
        console.log(resp.data)
    }
    return (
        <>
            <h1>Restaurant Page</h1>
            <h1>{rid}</h1>
            <div>
                <div className="main">
                    <div className="background">
                        <div className="content1">
                            <div className="content1_left">
                                <div className="thumbnail_pic">
                                    <img src={`${currentUser.thumbnail_url}`} className="thumbnail_img" />
                                    <div className="thumbnail_img">Black</div>
                                </div>
                            </div>
                            <div className="content1_right">
                                <h2>{currentUser.name}</h2>
                                <h6>{currentUser.sitting_capacity}</h6>
                                <h6>{currentUser.location_url}</h6>
                                <h6>Extra details</h6>
                                <h6>Extra details</h6>
                                <h6>Extra details</h6>
                            </div>
                        </div>
                        <div className="content2">
                            <div>
                                <button>Reserve Table</button>
                            </div>
                            <div>
                                <button>View Menu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantPage