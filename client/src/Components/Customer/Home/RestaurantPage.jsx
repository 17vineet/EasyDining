import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select from '@mui/material/Select';

import Menu from '../Menu/Menu'
import './RestaurantPage.css'
import API from '../../../axios'
import { useAuth } from '../../../contexts/AuthContext'
import RestaurantImageModel from './RestaurantImageModel'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const RestaurantPage = () => {
    const { rid } = useParams();
    const { currentUser } = useAuth();
    const [restdetails, setDetails] = useState({})
    const [restmenu, setMenu] = useState({})
    const [menuModel, setMenuModel] = useState(false);
    const [img_urls, setImg_urls] = useState([])
    const [pax, setPax] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const [restaurantImgModel, setrestaurantImgModel] = useState({
        open: false,
        index: undefined
    });
    useEffect(() => {
        fetchData();
    }, [])

    const passengers = ['1 guest', '2 guests', '3 guests', '4 guests', '5 guests', '6 guests', '7 guests', '8 guests', '9 guests', '10 guests']

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
    const openRestaurantImageModel = (ind) => {
        setrestaurantImgModel({
            open: true,
            index: ind
        });
    }
    const updateImageModel = (newstate) => {
        setrestaurantImgModel({
            open: newstate,
            index: undefined
        })
    }

    const handlePaxChange = (event) => {
        setPax(event.target.value);
    };

    return (
        <>
            <h1>Restaurant Page</h1>
            {menuModel && <Menu updateMenuModel={updateMenuModel} menu={restmenu} />}
            {
                restaurantImgModel.open && <RestaurantImageModel updateImageModel={updateImageModel} img_urls={img_urls} imgmodel={restaurantImgModel} />
            }
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
                        <div className='restaurantImgHolder'>
                            <div className='imageHolderLeft'>
                                <img src={img_urls[0]} height={420} width={400} />
                            </div>
                            <div className='imageHolderRight'>
                                {
                                    img_urls.map((ele, index) => {

                                        return (
                                            <img src={ele} height={200} width={200} style={{ 'margin': '10px', 'borderRadius': '10px' }} onClick={() => {
                                                openRestaurantImageModel(index)
                                            }} className='restaurant_images' />
                                        )

                                    })
                                }

                            </div>
                        </div>
                        <div className="content2">
                            {/* <div>
                                <select name="PAX" id="pax">
                                    <option value={1}>1 Guest</option>
                                    <option value={2}>2 Guest</option>
                                    <option value={3}>3 Guest</option>
                                    <option value={4}>4 Guest</option>
                                    <option value={5}>5 Guest</option>
                                    <option value={6}>6 Guest</option>
                                    <option value={7}>7 Guest</option>
                                    <option value={8}>8 Guest</option>
                                    <option value={9}>9 Guest</option>
                                    <option value={10}>10 Guest</option>
                                    <option value={'More'}>More than 10 Guest</option>
                                </select>
                                
                            </div> */}
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Pax</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={pax}
                                        label="Pax"
                                        onChange={handlePaxChange}
                                    >
                                    {passengers.map((ele,ind)=>{
                                        return (<MenuItem value={ind+1} key={ind} >{ele}</MenuItem>)
                                    })}
                                        
                                    </Select>
                                    <button onClick={async () => {
                                    const resp = await axiosPrivate.post('/customer/insertWaitingList', { rid, name: currentUser.name, email:currentUser.email,phone:currentUser.phone ,pax:pax })
                                    alert(resp.data.message)
                                }} className='btn btn-primary m-2'>Reserve Table For Free</button>
                                </FormControl>
                            </Box>
                            <div>
                                <button onClick={async () => {
                                    const resp = await axiosPrivate.post('/customer/cancelReservation', { rid, email: currentUser.email })
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