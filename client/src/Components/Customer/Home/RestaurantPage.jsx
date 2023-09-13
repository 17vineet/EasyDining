import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../Menu/Menu'
import './RestaurantPage.css'
import API from '../../../axios'
import { useAuth } from '../../../contexts/AuthContext'

const RestaurantPage = () => {
    const { rid } = useParams();
    const {currentUser} = useAuth() ;
    const [restdetails, setDetails] = useState({})
    const [restmenu, setMenu] = useState({})
    const [menuModel,setMenuModel]=useState(false);
    
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const details = await API.post('/restaurant/restaurantInfo', { rid })
        const resp = await API.post('/restaurant/getRestaurantMenu', { rid })

        setDetails(details.data)
        setMenu(resp.data)
    }

    const HandleViewMenu = () => {
        setMenuModel(true);
    }
    const updateMenuModel=(newstate)=>{
        setMenuModel(newstate)
    }
    return (
        <>
            <h1>Restaurant Page</h1>
            {menuModel && <Menu updateMenuModel={updateMenuModel} menu={restmenu}/>}
            <div>
                <div className="main">
                    <div className="background">
                        <div className="content1">
                            <div className="content1_left">
                                <div className="thumbnail_pic">
                                    <img src={restdetails.thumbnail_url} className="thumbnail_img" />
                                    <div className="thumbnail_img">Black</div>
                                </div>
                            </div>
                            <div className="content1_right">
                                <h2>{restdetails.name}</h2>
                                <h6>{restdetails.sitting_capacity}</h6>
                                <h6>{restdetails.location_url}</h6>
                                <h6>{restdetails.range}</h6>
                            </div>
                        </div>
                        <div className="content2">
                            <div>
                                <button onClick={async () => {
                                    await API.post('/customer/insertWaitingList', { rid, name: currentUser.email })
                                }}>Reserve Table</button>
                            </div>
                            <div>
                                <button onClick={HandleViewMenu}>View Menu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantPage