import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext'
import './Home.css'
import RestaurantInfo from './RestaurantInfo';
import API from '../../../axios';
const Home = () => {

  const [restaurants, setRestaurants] = useState([]);
  const { userType, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    const getAllRestaurants = async () => {
      try {
        const response = await API.get("/customer/allRestaurants");
        const data = response.data;
        const newRestaurants = Object.keys(data).map(key => {
          return {
            name: data[key].name,
            thumbnail_url: data[key].thumbnail_url,
            id: data[key]._id,

          };
        });
        setRestaurants(newRestaurants);
      } catch (error) {
        console.log(error);
      }
    };

    getAllRestaurants();

  }, [])


  return (
    <div className="main">
      <div className="background">
        {/* This is the background div */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="content">
          Contents

          <div className="restaurant_display" >
            {restaurants.map((elem, index) => (
              <div key={index} onClick={()=>{
                navigate(`/restaurantdetails/${elem.id}`)
               }}>
                <RestaurantInfo name={elem.name} thumbnail_url={elem.thumbnail_url} id={elem.id} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home