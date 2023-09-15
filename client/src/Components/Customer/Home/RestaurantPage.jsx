import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../Menu/Menu'
import './RestaurantPage.css'
import API from '../../../axios'
import { useAuth } from '../../../contexts/AuthContext'

const RestaurantPage = () => {
    const { rid } = useParams();
    const { currentUser } = useAuth();
    const [restdetails, setDetails] = useState({})
    const [restmenu, setMenu] = useState({})
    const [menuModel, setMenuModel] = useState(false);
    const [img_urls, setImg_urls] = useState([])
    
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const details = await API.post('/restaurant/restaurantInfo', { rid })
        const resp = await API.post('/restaurant/getRestaurantMenu', { rid })

        setDetails(details.data)
        setImg_urls(details.data.images_urls)
        setMenu(resp.data)
    }

    const HandleViewMenu = () => {
        setMenuModel(true);
    }
    const updateMenuModel = (newstate) => {
        setMenuModel(newstate)
    }
    return (
        <>
            <h1>Restaurant Page</h1>
            {menuModel && <Menu updateMenuModel={updateMenuModel} menu={restmenu} />}
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
                        <div>
                                {
                                    img_urls.map((ele) => {
                                        return (
                                            <img src={ele} height={200} width={200} style={{'margin':'10px','borderRadius':'10px'}}/>
                                        )
                                    })
                                }
                            </div>
                        <div className="content2">
                            <div>
                                <button onClick={async () => {
                                    const resp = await API.post('/customer/insertWaitingList', { rid, name: currentUser.email })
                                    alert(resp.data.message)
                                }} className='btn btn-primary m-2'>Reserve Table</button>
                            </div>
                            <div>
                                <button onClick={async () => {
                                    const resp = await API.post('/customer/cancelReservation', { rid, name: currentUser.email })
                                    alert(resp.data.message)
                                }} className='btn btn-primary m-2'>Cancel Reservation</button>
                            </div>
                            <div>
                                <button onClick={HandleViewMenu} className='btn btn-primary m-2'>View Menu</button>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantPage