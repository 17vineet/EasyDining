import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { Box, InputLabel, MenuItem, FormControl, Paper } from '@mui/material';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/joy/Button';
import TakeOrderModal from '../../Business/Home/TakeOrderModal/TakeOrderModal';
import ViewOrderModal from '../../Business/Home/ViewOrderModal/ViewOrderModal';
// import Menu from '../Menu/Menu'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './RestaurantPage.css'
import API from '../../../axios'
import { useAuth } from '../../../contexts/AuthContext'
import RestaurantImageModel from './RestaurantImageModel'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import StarIcon from '@mui/icons-material/Star';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';

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
    const [open, setOpen] = useState(false);
    const [restaurantImgModel, setrestaurantImgModel] = useState({
        open: false,
        index: undefined
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(-1);

    const toggleDropdown = (ind) => {
        if (isDropdownOpen != -1) {
            setIsDropdownOpen(-1);
        }
        else {
            setIsDropdownOpen(ind);
        }
    };

    useEffect(() => {
        fetchData();
    }, [location])

    const handleCheckWaiting = async () => {
        setChecking(true);
        if (pax != "") {
            const resp = await API.post("/restaurant/checkWaiting", { rid, pax });

            if (resp.data.message == "Available") {
                alert("Table is Available")
            }
            else {
                alert(resp.data.message)
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

        let time = new Date();
        time = time.toLocaleTimeString().slice(0, 5)
        // console.log(time)
        let openTime = new Date();
        openTime.setHours(details.data.opening_time.slice(0, 2));
        openTime.setMinutes(details.data.opening_time.slice(3, 5));
        console.log(openTime)
        let closeTime = new Date();
        closeTime.setHours(details.data.closing_time.slice(0, 2));
        closeTime.setMinutes(details.data.closing_time.slice(3, 5));
        openTime = openTime.toLocaleTimeString().slice(0, 5);
        closeTime = closeTime.toLocaleTimeString().slice(0, 5);

        if (openTime < closeTime) {
            // check the current time and directly set open/close
            if (time >= openTime && time <= closeTime) {
                setOpen(true);
            }
            else {
                setOpen(false);
            }
        }
        else {
            // check if the current time is more than opening or less than closing
            if (time >= openTime || time <= closeTime) {
                setOpen(true)
            }
            else {
                setOpen(false)
            }
        }
        console.log(closeTime)

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
                        {/* <div className="customer_content1">
                            <div className="customer_content1_left">
                                <div className="thumbnail_pic ">
                                    <img src={restdetails.thumbnail_url} className="rest_thumbnail" />
                                </div>
                            </div>
                            <div className="customer_content1_right">
                                <h2>{restdetails.name}&nbsp;{restdetails.ratingCount > 0 && <h6 className='ratings'>{restdetails.rating}<StarIcon fontSize='small' /></h6>}</h2>
                                <h6>Timings : Open from&nbsp;<b>{restdetails.opening_time}</b>&nbsp;hours to&nbsp;<b>{restdetails.closing_time}</b>&nbsp;hours&nbsp;{open ? <span className='openCloseShow'>Open Now</span> : <span className='openCloseShow'>Closed</span>}</h6>
                                <h6>Price Range : {restdetails.range}</h6>
                                <h6>City : {restdetails.city}</h6>

                                <h6>Location :&nbsp;<Link to={restdetails.location_url} target="_blank">Get Directions</Link></h6>
                                <h6>Contact : {restdetails.phone}</h6>

                            </div>
                        </div> */}
                        <div className='rest_details'>
                            <div className='img_holder'>
                                <img src={restdetails.thumbnail_url} />

                                {/* <button className='all_photos'>All Photos</button> */}
                                <Paper
                                    elevation={2}
                                    style={{ backgroundColor: 'rgb(0,0,0)', position: 'absolute', right: 0, top: 20 }}
                                    sx={{
                                        m: 1,
                                        p: 1,
                                        '&:hover': {
                                            cursor: 'pointer'
                                        },
                                    }}
                                    onClick={() => openRestaurantImageModel(0)}
                                >
                                    <span style={{ color: 'white' }}>&nbsp;<ImageOutlinedIcon />View All photos</span>
                                </Paper>
                            </div>
                            <div className='rest_info'>
                                <div className='rest_name_rating'>
                                    <h2>{restdetails.name}&nbsp;</h2>
                                    <div>
                                        {restdetails.ratingCount > 0 && <span className='ratings'>{restdetails.rating}<StarIcon fontSize='small' /></span>}
                                    </div>
                                </div>
                                <h6>Timings : &nbsp;<b>{restdetails.opening_time}</b>&nbsp;-&nbsp;<b>{restdetails.closing_time}</b>&nbsp;&nbsp;{open ? <span className='openCloseShow'>Open Now</span> : <span className='openCloseShow'>Closed</span>}</h6>
                                <h6>Price Range : {restdetails.range}</h6>
                                <h6>City : {restdetails.city}</h6>

                                <h6>Location :&nbsp;<Link to={restdetails.location_url} target="_blank">Get Directions</Link></h6>
                                <h6>Contact : {restdetails.phone}</h6>
                            </div>
                        </div>
                        <div className='customer_content2'>
                            <div className='customer_content2_left'>
                                <h3 className='menu_display'>Menu </h3>
                                {restmenu.map((ele, ind) => {
                                    if (ele.items.length > 0) {
                                        return (
                                            <div className='Cuisine_container p-2' key={ind} onClick={() => toggleDropdown(ind)}>
                                                {/* <h4>{ele.name}</h4> */}
                                                <div><h4>{ele.name}</h4> </div>
                                                <div className='dropdown_arrow'><ArrowDropDownCircleOutlinedIcon /></div>
                                                <TransitionGroup>
                                                    <CSSTransition timeout={300} classNames="fade">
                                                        <div className={`dropdown-content  ${isDropdownOpen === ind ? 'open' : ''}`} >
                                                            <table class="table table-striped">
                                                                <tbody>
                                                                    {ele.items.map((elem, index) => {
                                                                        return (
                                                                            <tr>
                                                                                <td><h5>{elem.Name}</h5>
                                                                                    {elem.Description}
                                                                                </td>
                                                                                <td>{elem.Price}</td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </CSSTransition>
                                                </TransitionGroup>
                                            </div>
                                        )
                                    }
                                })
                                }
                            </div>
                            {isDined &&
                                <div className='customer_content2_right p-3'>
                                    <button onClick={placeOrder} className='btn btn-primary my-2'>Place Order</button>
                                    <button onClick={viewOrder} className='btn btn-primary m-2'>View Order</button>
                                </div>
                            }
                            {/* <div className="customer_content2_right"> */}
                            {!hasReserved && <Paper elevation={3} sx={{ width: '400px', height: '400px' }}>
                                {
                                    accepting && open ?
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
                                        </Box>
                                        :
                                        <h3 className='p-4'>Not accepting Booking Right Now</h3>
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
            </div >
        </>
    )
}

export default RestaurantPage