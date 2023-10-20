import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardMedia, Grid, Paper } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext'
import './Home.css'
import RestaurantInfo from './RestaurantInfo';
import API from '../../../axios';
import RestaurantCard from './RestaurantCard/RestaurantCard';
import axios from 'axios';

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
        // const response = await API.post("/customer/allRestaurants", { city });
        const response = await axios.post("http://127.0.0.1:5000/ml/getCities", { city });
        const data = response.data;
        console.log(data)
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
          <h2>Restaurants you may like</h2>
          <div className="restaurant_display" >
            {restaurants.map((elem, index) => (
              <div key={index} onClick={() => {
                navigate(`/restaurantdetails/${elem.id}`)
              }}>
                <RestaurantInfo name={elem.name} thumbnail_url={elem.thumbnail_url} id={elem.id} city={elem.city} />
              </div>
            ))}
          </div>
          {
            currentUser.last_city &&
            <>
              <h2>Top Restaurants in {currentUser?.last_city}</h2>
              <div className='restaurant_display'>
                {/* {restaurants.map((elem, index) => {
                  return (
                    <>
                      <RestaurantCard key={index} name={elem.name} thumbnail_url={elem.thumbnail_url} id={elem.id} city={elem.city} />
                    </>
                  ) */}
                  {/* <RestaurantInfo name={elem.name} thumbnail_url={elem.thumbnail_url} id={elem.id} city={elem.city} /> */ }
                {/* })} */}
                <Grid container columnSpacing={3}>
                  {restaurants.map((elem, index) => (
                    <Grid item sm={6} md={4} lg={3} key={index}>
                      <RestaurantCard key={index} name={elem.name} thumbnail_url={elem.thumbnail_url} id={elem.id} city={elem.city} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Home