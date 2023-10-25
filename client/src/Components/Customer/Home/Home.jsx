import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext'
import './Home.css'
import RestaurantInfo from './RestaurantInfo';
import API from '../../../axios';
import RestaurantCard from './RestaurantCard/RestaurantCard';
import axios from 'axios';
import Offers from './Offers';
const Home = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [suggestedrest,setSuggestedRest]=useState([]);
  const { userType, currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {

    const getAllRestaurants = async () => {
      try {
        const city = searchParams.get('city');
        // const response = await API.post("/customer/allRestaurants", { city });
        const response = await axios.post("http://127.0.0.1:3000/ml/getTopRestaurants", { 'city':city });
        const resp=await axios.post("http://127.0.0.1:3000/ml/similarRestaurants",{'phone':currentUser.phone,'city':currentUser.last_city})
        const data = response.data.list;
        const data2 = resp.data.list
        console.log(data)
        console.log(data2)
        const newRestaurants = Object.keys(data).map(key => {
          return {
            name: data[key].name,
            thumbnail_url: data[key].thumbnail_url,
            id: data[key]._id,
            city: data[key].city,
            accepting: data[key].accepting
          };
        });
        const suggRestaurants = Object.keys(data2).map(key => {
          return {
            name: data2[key].name,
            thumbnail_url: data2[key].thumbnail_url,
            id: data2[key]._id,
            city: data2[key].city,
            accepting: data2[key].accepting
          };
        });
        setRestaurants(newRestaurants);
        setSuggestedRest(suggRestaurants);

      } catch (error) {
        console.log(error);
      }
    };

    getAllRestaurants();

  }, [location])


  return (
    <div className="main">
      <Offers/>
      <div className="background">
        <div className="content">
          <h2>Restaurants you may like</h2>
          <div className="restaurant_display m-4" >
            <Grid container columnSpacing={3} rowSpacing={3}>
              {
                suggestedrest.map((elem, index) => (
                  <Grid item sm={6} md={4} lg={4} key={index}>
                    <RestaurantCard 
                      key={index} 
                      name={elem.name} 
                      thumbnail_url={elem.thumbnail_url} 
                      id={elem.id} 
                      city={elem.city} 
                      accepting={elem.accepting}
                    />
                  </Grid>
                ))
              }
            </Grid>
          </div>
          {
            currentUser.last_city &&
            <>
              <h2>Top Restaurants in {currentUser?.last_city}</h2>
              <Box className='restaurant_display m-4'>
                <Grid container columnSpacing={3} rowSpacing={3}>
                  {restaurants.map((elem, index) => (
                    <Grid item sm={6} md={4} lg={4} key={index}>
                      <RestaurantCard key={index} name={elem.name} thumbnail_url={elem.thumbnail_url} id={elem.id} city={elem.city} accepting={elem.accepting} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          }
        </div>
        <div>
        <div>
          <h4 className='ms-3'> Why Book a Restaurant With EazyDiner</h4>
          <div className='benefits_holder'>
            <div className='benefits_card'>
              <div><img src="./discount.svg" height={40}/></div>
              <div><h5>Deals</h5>
              Get deals upto 50% with every meal
              </div>
            </div>
            <div className='benefits_card'>
              <div><img src="./quick.svg" height={40}/></div>
              <div><h5>Quick Booking</h5>
              Instant booking in 18 seconds
              </div>
            </div>
            <div className='benefits_card'>
              <div><img src="./freecancellation.svg" height={35}/></div>
              <div><h5>Free Cancellation</h5>
              Change in plan? we got you covered
              </div>
            </div>
          </div>
        </div>

          </div>
      </div>
    </div>
  )
}

export default Home