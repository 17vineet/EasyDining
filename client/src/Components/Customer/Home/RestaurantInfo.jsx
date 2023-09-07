import React from 'react' ;
import './RestaurantInfo.css' ;
import API from '../../../axios' ;

import { useAuth } from '../../../contexts/AuthContext';

const RestaurantInfo = (prop) => {

    const {currentUser} = useAuth() ;

    const name=prop.name;
    const thumbnail_url=prop.thumbnail_url;

    const handleClick = async ()=>{
        const resp = await API.post('/customer/insertWaitingList', { rid: prop.id, name : currentUser.email })
    }
    
    return (   
            <div key={prop.id}>
                <div className="rest_content">
                    <div className="rest_image"><img src={thumbnail_url}/></div>
                    <div className="rest_name">{name}</div>
                    <button onClick={handleClick}>Reserve</button>
                </div>
            </div>
             
    )
}

export default RestaurantInfo