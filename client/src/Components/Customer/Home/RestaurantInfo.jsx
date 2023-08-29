import React from 'react'
import './RestaurantInfo.css'
const RestaurantInfo = (prop) => {
    const name=prop.name;
    const thumbnail_url=prop.thumbnail_url;
    
    return (                
                   
                        <div >
                                <div className="rest_content">
                                    <div className="rest_image"><img src={thumbnail_url}/></div>
                                    <div className="rest_name">{name}</div>
                                </div>
                        </div>
             
    )
}

export default RestaurantInfo