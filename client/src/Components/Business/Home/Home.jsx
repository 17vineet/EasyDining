import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import './List.css'
import WaitingList from './WaitingList';
import DiningList from './DiningList';
import { useAuth } from '../../../contexts/AuthContext'
import API from '../../../axios';
import AvailableTable from './AvailableTable';

const Home = () => {

  const [updated, setUpdated] = useState(true);
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();


 
  const handleUpdate = () => {
    setUpdated(prev => !prev );
  }
  return (
    <>
      <div className="main">
        <div className="background">
          <div className="content1">
            <div className="content1_left">
              <div className="thumbnail_pic">
            
                <img src={currentUser.thumbnail_url} className="thumbnail_img" style={{ 'zIndex': 2 }} />
                <div className="thumbnail_img">Black</div>
              </div>
            </div>
            <div className="content1_right">
              <h2>{currentUser.name}</h2>
              <h6>{currentUser.sitting_capacity}</h6>
              <h6>{currentUser.location_url}</h6>
              <h6>Your average rating : {currentUser.rating}</h6>
              <h6>{currentUser.city}</h6>
              <h6>Extra details</h6>
            </div>
          </div>
          <h5>Waiting Time(in minutes)</h5>
            <input type="number" defaultValue={0} />
            <button className='btn btn-primary ms-4'>Update Waiting time</button>
            <br />
            <br />
          <AvailableTable updated={updated} handleUpdate={handleUpdate}/>

            <div>
              {/* <button className='btn btn-primary mt-4' onClick={() => {
                navigate("/business/menu")
              }}>Update Menu</button> */}
            </div>
            <br />
            <br />
            <div className='content3'>
              <div className='waitingList'>
                <WaitingList key={"1"} handleUpdate={handleUpdate} updated={updated} />
              </div>
              <div className='diningList'>
                <DiningList key={"1"} updated={updated} handleUpdate={handleUpdate} />
              </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default Home