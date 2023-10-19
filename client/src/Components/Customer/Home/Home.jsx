import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import {Card, CardHeader, CardMedia } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext'
import './Home.css'
import RestaurantInfo from './RestaurantInfo';
import API from '../../../axios';
const Home = () => {

  const [restaurants, setRestaurants] = useState([]);
  const { userType, currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {

    const getAllRestaurants = async () => {
      try {
        const city = searchParams.get('city');
        const response = await API.post("/customer/allRestaurants", { city });
        const data = response.data;
        const newRestaurants = Object.keys(data).map(key => {
          return {
            name: data[key].name,
            thumbnail_url: data[key].thumbnail_url,
            id: data[key]._id,
            city: data[key].city

          };
        });
        setRestaurants(newRestaurants);
      } catch (error) {
        console.log(error);
      }
    };

    getAllRestaurants();

  }, [location])


  return (
    <div className="main">
      <div className="background">
        {/* This is the background div */}

        <div className="content">
          <h2>Restaurant you may like</h2>
          <div className="restaurant_display" >
            {restaurants.map((elem, index) => (
              <div key={index} onClick={() => {
                navigate(`/restaurantdetails/${elem.id}`)
              }}>
                <RestaurantInfo name={elem.name} thumbnail_url={elem.thumbnail_url} id={elem.id} city={elem.city} />
              </div>
            ))}
          </div>
          <h2>Top Restaurants in your city</h2>
          <div className='restaurant_display'>
            {restaurants.map((elem, index) => (
              <div key={index} onClick={() => {
                navigate(`/restaurantdetails/${elem.id}`)
              }}>
                <Card sx={{ maxWidth: 345 }} className='restaurant_card'>
                  <CardMedia
                    component="img"
                    height="194"
                    width="194"
                    image={elem.thumbnail_url}
                    // alt="Paella dish"
                  />
                  <CardHeader
                    title={elem.name}
                    subheader={elem.city}
                  />
                </Card>
                {/* <RestaurantInfo name={elem.name} thumbnail_url={elem.thumbnail_url} id={elem.id} city={elem.city} /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home