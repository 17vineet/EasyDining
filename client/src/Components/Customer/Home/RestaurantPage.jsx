import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/joy/Button';
import TakeOrderModal from '../../Business/Home/TakeOrderModal/TakeOrderModal' ;
import ViewOrderModal from '../../Business/Home/ViewOrderModal/ViewOrderModal';
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
    const [checking, setChecking] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [hasReserved,setHasReserved]=useState(false);
    const [isDined,setIsDined]=useState(false);
    const [takeOrderModal,setTakeOrderModal]=useState(false);
    const [viewOrderModal,setViewOrderModal]=useState(false);
    const [restaurantImgModel, setrestaurantImgModel] = useState({
        open: false,
        index: undefined
    });

    useEffect(() => {
        fetchData();
    }, [])

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
        const resp2 = await API.post('/customer/checkDining', {phone: currentUser.phone, rid})
        const resp3 = await API.post('/customer/checkWaiting', {phone: currentUser.phone, rid})

        setIsDined(resp2.data.dining) ;
        setHasReserved(resp2.data.dining || resp3.data.waiting) ;
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
    
    const handleReserve = async () => {
        const resp = await axiosPrivate.post('/customer/insertWaitingList', { rid, name: currentUser.name, email: currentUser.email, phone: currentUser.phone, pax: pax })
        alert(resp.data.message)
        setHasReserved(true) ;
    }
    
    const placeOrder=async()=>{
        setTakeOrderModal(true);
        if(hasReserved){
            setIsDined(true);
        }

    }
    const viewOrder=()=>{
        setViewOrderModal(true);
    }
    
    const closeTakeOrderModal=(newstate)=>{
        setTakeOrderModal(newstate);
    }
    const closeViewOrderModal=(newstate)=>{
        setViewOrderModal(newstate)
    }
    return (
        <>

            {menuModel && <Menu updateMenuModel={updateMenuModel} menu={restmenu} />}
            {
                restaurantImgModel.open && <RestaurantImageModel updateImageModel={updateImageModel} img_urls={img_urls} imgmodel={restaurantImgModel} />
            }
            {
                takeOrderModal && <TakeOrderModal phone={currentUser.phone} closeTakeOrderModal={closeTakeOrderModal} id={rid}/>
            }
            {
                viewOrderModal && <ViewOrderModal phone={currentUser.phone} closeViewOrderModal={closeViewOrderModal} id={rid}/>
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
                                            <img key={index} src={ele} height={200} width={200} style={{ 'margin': '10px', 'borderRadius': '10px' }} onClick={() => {
                                                openRestaurantImageModel(index)
                                            }} className='restaurant_images' />
                                        )

                                    })
                                }

                            </div>
                        </div>
                        {!hasReserved  && <div className="content2">
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
                                        {passengers.map((ele, ind) => {
                                            return (<MenuItem value={ind + 1} key={ind} >{ele}</MenuItem>)
                                        })}

                                    </Select>
                                    <button onClick={handleReserve} className='btn btn-primary m-2'>Reserve Table For Free</button>
                                </FormControl>
                                <div>
                                    <Button loading={checking} onClick={handleCheckWaiting} loadingPosition="end" endDecorator={<SendIcon />}>
                                        Check waiting
                                    </Button>
                                </div>
                            </Box>
                            <div>
                                <button onClick={async () => {
                                    const resp = await axiosPrivate.post('/customer/cancelReservation', { rid, email: currentUser.email })
                                    alert(resp.data.message)
                                }} className='btn btn-primary m-2'>Cancel Reservation</button>
                            </div>
                        </div> }
                        <div>
                            <button onClick={HandleViewMenu} className='btn btn-primary m-2'>View Menu</button>
                        </div>
                        {isDined && 
                            <div>
                                <button onClick={placeOrder}>Place Order</button>
                                <button onClick={viewOrder}>View Order</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantPage