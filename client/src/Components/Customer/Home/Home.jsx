import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext'
import './Home.css'

const Home = () => {

  const { userType, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      if (userType == null) {
        try {
          await logout();
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      }
    }
    authenticate();
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
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="rest_content">
                  <div className="rest_image">Image 1</div>
                  <div className="rest_name">Name 1</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="rest_content">
                  <div className="rest_image">Image 2</div>
                  <div className="rest_name">Name 2</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="rest_content">
                  <div className="rest_image">Image 3</div>
                  <div className="rest_name">Name 3</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="rest_content">
                  <div className="rest_image">Image 4</div>
                  <div className="rest_name">Name 4</div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="rest_content">
                  <div className="rest_image">Image 1</div>
                  <div className="rest_name">Name 1</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="rest_content">
                  <div className="rest_image">Image 2</div>
                  <div className="rest_name">Name 2</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="rest_content">
                  <div className="rest_image">Image 3</div>
                  <div className="rest_name">Name 3</div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="rest_content">
                  <div className="rest_image">Image 4</div>
                  <div className="rest_name">Name 4</div>
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