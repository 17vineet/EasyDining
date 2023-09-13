import './RestaurantPage.css'
import React from 'react'
import Navbar from '../../Navbar'

const RestaurantPage = () => {
    return (
        <>
            <Navbar />
            <div>
                <div className="main">
                    <div className="background">
                        <div className="content1">
                            <div className="content1_left">
                                <div className="thumbnail_pic">
                                    {/* <img src={`${currentUser.thumbnail_url}`} className="thumbnail_img" /> */}
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
                                {/* Menu, Clock, Orders, Photos,  */}
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