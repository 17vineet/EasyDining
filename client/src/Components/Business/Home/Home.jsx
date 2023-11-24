import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'
import './List.css'
import WaitingList from './WaitingList';
import DiningList from './DiningList';
import { useAuth } from '../../../contexts/AuthContext'
import API from '../../../axios';
import AvailableTable from './AvailableTable';
import StarIcon from '@mui/icons-material/Star';


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
              <h2 style={{display:'flex',alignItems:'center',gap:'10px'}}>{currentUser.name} {currentUser.ratingCount > 0 && <span style={{ display: 'inline-block' }} className='ratings'>{currentUser.rating}<StarIcon fontSize='small' /></span>}</h2>
              <h6>Timings : {currentUser.opening_time} - {currentUser.closing_time}</h6>
              <h6>Location : <Link to={currentUser.location_url} target='_blank'>Get Directions</Link></h6>
              
              <h6>{currentUser.city}</h6>
            
            </div>
          </div>
          {/* <h5>Waiting Time(in minutes)</h5>
            <input type="number" defaultValue={0} />
            <button className='btn btn-primary ms-4'>Update Waiting time</button>
            <br />
            <br /> */}
        <div className='available_table'>
        <AvailableTable updated={updated} handleUpdate={handleUpdate}/>

        </div>
           
           
            <div className='content3'>
              <div className='waitingList'>
                <WaitingList key={"1"} handleUpdate={handleUpdate} updated={updated} />
              </div>
              <div className='diningList'>
                <DiningList key={"2"} updated={updated} handleUpdate={handleUpdate} />
              </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default Home