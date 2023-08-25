import React from 'react'
import './RestaurantInfo.css'
const RestaurantInfo = (prop) => {
    // console.log(restaurants);
    const name=prop.name;
    const thumbnail_url=prop.thumbnail_url;
    
    return (

        <div>
            
                <div >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="rest_content">
                                    <div className="rest_image"><img src={thumbnail_url}/></div>
                                    <div className="rest_name">{name}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            
        </div>

    )
}

export default RestaurantInfo