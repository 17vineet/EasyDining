import React from 'react' ;

import './RestaurantInfo.css' ;
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import { useAuth } from '../../../contexts/AuthContext';

const RestaurantInfo = (prop) => {

    const {currentUser} = useAuth() ;
    const axiosPrivate = useAxiosPrivate() ; 

    const name=prop.name;
    const city=prop.city
    const thumbnail_url=prop.thumbnail_url;

    const handleClick = async ()=>{
        const resp = await axiosPrivate.post('/customer/insertWaitingList', { rid: prop.id, name : currentUser.email })
    }
    
    return (   
            <div key={prop.id}>
                <div className="rest_content">
                    <div className="rest_image"><img src={thumbnail_url}/></div>
                    <div className="rest_name"><h4>{name}</h4></div>
                    <div className="rest_city"><h6>{city}</h6></div>
                </div>
            </div>
             
    )
}

export default RestaurantInfo