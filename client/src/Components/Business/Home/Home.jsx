import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import './List.css'
import WaitingList from './WaitingList';
import DiningList from './DiningList';
import { useAuth } from '../../../contexts/AuthContext'
import API from '../../../axios';

const Home = () => {

  const [updated, setUpdated] = useState(0);
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(currentUser.thumbnail_url)

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('images', file);

    const result = await API.post("/cloudinary/thumbnail", formData)
    console.log(result.data.img_urls[0]);
    const res = await API.post("/restaurant/updateThumbnail", { rid: currentUser._id, "thumbnail_url": result.data.img_urls[0] })
    setThumbnail(result.data.img_urls[0])
    console.log(res.data)
  };
  const handleUpdate = () => {
    setUpdated(prev => prev + 1);
  }
  return (
    <>
      <div className="main">
        <div className="background">
          <div className="content1">
            <div className="content1_left">
              <div className="thumbnail_pic">
                <input className="inputThumbnail"
                  type="file"
                  name="images"
                  onChange={handleFileChange}
                />
                <img src={thumbnail} className="thumbnail_img" style={{ 'zIndex': 2 }} />
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
              <div className='waitingList'>
                <WaitingList key={"1"} handleUpdate={handleUpdate} />
              </div>
              <div className='diningList'>
                <DiningList key={"1"} updated={updated} />
              </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default Home