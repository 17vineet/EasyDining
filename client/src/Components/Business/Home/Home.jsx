import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import './List.css'
import WaitingList from './WaitingList';
import DiningList from './DiningList';
import { useAuth } from '../../../contexts/AuthContext'

const Home = () => {

  const [updated, setUpdated] = useState(0) ;
  const { userType, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser == null) navigate('/');
  }, []) ;

  const handleUpdate = ()=>{
    setUpdated(prev => prev+1) ;
  }

  return (
    <>
      <div className="main">
        <div className="background">
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
          <div className="content1">
            <div className="content1_left">
              <div className="thumbnail_pic">
                <img src={`${currentUser.thumbnail_url}`} className="thumbnail_img" />
                <div className="thumbnail_img">Black</div>
              </div>
            </div>
            <div className="content1_right">
              <h2>{currentUser.name}</h2>
              <h6>{currentUser.sitting_capacity}</h6>
              <h6>{currentUser.location_url}</h6>
              <h6>Extra details</h6>
              <h6>Extra details</h6>
              <h6>Extra details</h6>
              {/* Menu, Clock, Orders, Photos,  */}
            </div>
          </div>
          <div className="content2">
            <h5>Waiting Time(in minutes)</h5>
            <input type="number" defaultValue={0} />
            <button>Update Waiting time</button>
            <br />
            <br />
            <div>
              <button onClick={() => {
                navigate("/business/menu")
              }}>Update Menu</button>
            </div>
            <br />
            <br />
            <div className='content3'>
              <div className='contentLeft'>
                <h3>Waiting List</h3>
                <WaitingList key={"1"} handleUpdate={handleUpdate} />
              </div>
              <div className='contentLeft'>
                <h3>Dining List</h3>
                <DiningList key={"1"} updated={updated} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home