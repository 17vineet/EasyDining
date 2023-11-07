import React, { useEffect, useState } from 'react'
import { useParams, useLocation , Link } from 'react-router-dom'
import { Box, InputLabel, MenuItem, FormControl, List, ListItemText, Divider, ListItem, Typography, Paper } from '@mui/material';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/joy/Button';
import TakeOrderModal from '../../Business/Home/TakeOrderModal/TakeOrderModal';
import ViewOrderModal from '../../Business/Home/ViewOrderModal/ViewOrderModal';
import Menu from '../Menu/Menu'
import './RestaurantPage.css'
import API from '../../../axios'
import { useAuth } from '../../../contexts/AuthContext'
import RestaurantImageModel from './RestaurantImageModel'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import StarIcon from '@mui/icons-material/Star';

const RestaurantPage = () => {
    const { rid } = useParams();
    const { currentUser } = useAuth();
    const location = useLocation();
    const [restdetails, setDetails] = useState({})
    const [restmenu, setMenu] = useState([])
    const [img_urls, setImg_urls] = useState([])
    const [pax, setPax] = useState('');
    const [checking, setChecking] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [hasReserved, setHasReserved] = useState(false);
    const [isDined, setIsDined] = useState(false);
    const [takeOrderModal, setTakeOrderModal] = useState(false);
    const [viewOrderModal, setViewOrderModal] = useState(false);
    const [accepting, setAccepting] = useState(false);
    const [restaurantImgModel, setrestaurantImgModel] = useState({
        open: false,
        index: undefined
    });

    useEffect(() => {
        fetchData();
    }, [location])

    const handleCheckWaiting = async () => {
        setChecking(true);
        if (pax != "") {
            const resp = await API.post("/restaurant/checkWaiting", { rid, pax });
            // console.log(resp.data)
            if (resp.data.message == "Available") {
                alert("Table is Available")
            }
            else {
                alert("You need to wait for some time")
            }
        }
        else {
            alert("Enter Pax")
        }
        setChecking(false);
    }
    const passengers = ['1 guest', '2 guests', '3 guests', '4 guests', '5 guests', '6 guests', '7 guests', '8 guests', '9 guests', '10 guests']

    const fetchData = async () => {
        const details = await API.post('/restaurant/restaurantInfo', { rid })
        const resp = await API.post('/restaurant/getRestaurantMenu', { rid })
        const resp2 = await API.post('/customer/checkDining', { phone: currentUser.phone, rid })
        const resp3 = await API.post('/customer/checkWaiting', { phone: currentUser.phone, rid })

        setIsDined(resp2.data.dining);
        setHasReserved(resp2.data.dining || resp3.data.waiting);
        setDetails(details.data)
        setImg_urls(details.data.images_urls)
        setMenu(resp.data.menu)
        setAccepting(details.data.accepting)
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

    const handleReserve = async () => {
        if (pax.length != 0) {
            const resp = await axiosPrivate.post('/customer/insertWaitingList', { rid, name: currentUser.name, email: currentUser.email, phone: currentUser.phone, pax: pax })
            alert(resp.data.message)
            setHasReserved(true);
        }
        else {
            alert('Kindly select the number of persons')
        }
    }

    const placeOrder = async () => {
        setTakeOrderModal(true);
        if (hasReserved) {
            setIsDined(true);
        }

    }
    const viewOrder = () => {
        setViewOrderModal(true);
    }

    const closeTakeOrderModal = (newstate) => {
        setTakeOrderModal(newstate);
    }

    const closeViewOrderModal = (newstate) => {
        setViewOrderModal(newstate)
    }

    return (
        <>
            {
                restaurantImgModel.open && <RestaurantImageModel updateImageModel={updateImageModel} img_urls={img_urls} imgmodel={restaurantImgModel} />
            }
            {
                takeOrderModal && <TakeOrderModal phone={currentUser.phone} closeTakeOrderModal={closeTakeOrderModal} id={rid} />
            }
            {
                viewOrderModal && <ViewOrderModal phone={currentUser.phone} closeViewOrderModal={closeViewOrderModal} id={rid} />
            }
            <div>

                <div className="main">
                    <div className="background">
                        <div className="customer_content1">
                            <div className="customer_content1_left">
                                <div className="customer_thumbnail_pic ">
                                    <img src={restdetails.thumbnail_url} className="thumbnail_img" />
                                    <div className="thumbnail_img">Black</div>
                                </div>
                            </div>
                            <div className="customer_content1_right">
                                <h2>{restdetails.name}&nbsp;<h6 className='ratings'>{restdetails.rating}<StarIcon fontSize='small'/></h6></h2>
                                {/* <h6>Rating :&nbsp;&nbsp; {restdetails.ratingCount === 0 ? 'No ratings yet' :<span className='ratings'>{restdetails.rating}<StarIcon fontSize='small'/></span>}</h6> */}
                                <h6>Timings : Open from&nbsp;<b>{restdetails.opening_time}</b> hours to&nbsp;<b>{restdetails.closing_time}</b> hours&nbsp;{accepting ? <span className='openCloseShow'>Open Now</span>:<span className='openCloseShow'>Closed</span>}</h6> 
                                <h6>Price Range : {restdetails.range}</h6>
                                <h6>City : {restdetails.city}</h6>
                              
                                <h6>Location :&nbsp;<Link to={restdetails.location_url} target="_blank">Get Directions</Link></h6>
                                <h6>Contact : {restdetails.phone}</h6>
                           
                            </div>
                        </div>
                        {
                            img_urls.length > 0 &&
                            <div className='customer_restaurantImgHolder'>
                                <div className='customer_img_holder'>

                                    <div className='customer_imageHolderLeft'>
                                        <div>
                                            <img src={img_urls[0]} height={420} width={400} />
                                        </div>
                                    </div>
                                    <div className='customer_imageHolderRight'>
                                        {
                                            img_urls.map((ele, index) => {

                                                return (
                                                    <img key={index} src={ele} height={200} width={200} style={{ 'margin': '10px', 'borderRadius': '10px' }} onClick={() => {
                                                        openRestaurantImageModel(index)
                                                    }} className='restaurant_images' />
                                                )

                                            })
                                        }

                                    </div>
                                </div>

                            </div>
                        }
                        <div className='customer_content2'>
                            <div className='customer_content2_left'>
                                <h2 className='menu_display'>Menu Display</h2>
                                {restmenu.map((ele, ind) => {
                                    return (
                                        <div className='Cuisine_container' key={ind}>
                                            <h2>{ele.name}</h2>
                                            <div className='item_container_title'>
                                                <div><b>Item Name</b></div>
                                                <div><b>Price</b></div>
                                                <div><b>Description</b></div>
                                            </div>
                                            {ele.items.map((elem, index) => {
                                                return (
                                                    <div className='item_container'>
                                                        <div>{elem.Name} </div>
                                                        <div>{elem.Price}</div>
                                                        <div>{elem.Description}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                            {isDined &&
                                <div className='customer_content2_right p-3'>
                                    <button onClick={placeOrder} className='btn btn-primary my-2'>Place Order</button>
                                    <button onClick={viewOrder} className='btn btn-primary m-2'>View Order</button>
                                </div>
                            }
                            {/* <div className="customer_content2_right"> */}
                            {!hasReserved && <Paper elevation={3} sx={{ width:'30%' }}>
                                {
                                    accepting ?
                                        <Box className="p-3">
                                            <FormControl className='check_waiting_form' style={{ margin: '10px' }}>
                                                <InputLabel id="demo-simple-select-label">No. of Persons</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={pax}
                                                    label="Pax"
                                                    onChange={handlePaxChange}
                                                >
                                                    {passengers.map((ele, ind) => {
                                                        return (<MenuItem value={ind + 1} key={ind} >{ele}</MenuItem>)
                                                    })}

                                                </Select>
                                                <Button onClick={handleReserve} className='btn btn-primary my-2'>Reserve Table For Free</Button>
                                            </FormControl>
                                            <div>
                                                <Button className='mx-2 btn btn-primary' loading={checking} onClick={handleCheckWaiting} loadingPosition="end" endDecorator={<SendIcon />}>
                                                    Check waiting
                                                </Button>
                                            </div>
                                        </Box> : <h3>Not accepting Booking Right Now</h3>
                                }
                                </Paper>
                            }

                            {
                                hasReserved && !isDined &&
                                <div className='customer_content2_right'>
                                    <button onClick={async () => {
                                        const resp = await axiosPrivate.post('/customer/cancelReservation', { rid, email: currentUser.email })
                                        alert(resp.data.message)
                                        setHasReserved(false)
                                        setPax('')
                                    }} className='btn btn-primary m-2'>Cancel Reservation</button>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantPage