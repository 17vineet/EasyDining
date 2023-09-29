import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import PhoneEmailModel from './PhoneEmailModel'
import { useAuth } from '../../../contexts/AuthContext';
import './RestaurantProfile.css'
import NameModel from './NameModel';

const RestaurantProfile = () => {
  const {currentUser} =useAuth() ; 
  const [models, setModel] = useState({ name: false, email: false, phone: false });

  return (
    <>
      {models.name && <NameModel closeNameModel={(newstate) => setModel({ ...models, name: newstate })} />}
      {models.phone && <PhoneEmailModel editField="phone" closePEmodel={(newstate)=>setModel({...models, phone:newstate})}/> }
      {models.email && <PhoneEmailModel editField="email" closePEmodel={(newstate)=>setModel({...models, email:newstate})}/>}
      
      <div className="backdrop">
        <div className="RestaurantDetailsHolder">
          <div className="profilePicHolder">
            <img className='thumbnail' src={`${currentUser.thumbnail_url}`} alt="" />
          </div>
          <div className="RestaurantDetails">
            <ul >
              <li>{currentUser.name} &nbsp;&nbsp;
                <EditIcon onClick={() => setModel({ ...models, name: true })} style={{ fontSize: '15px' }} htmlColor='red' />
              </li>
              <li>
                <LocalPhoneIcon /> &nbsp;&nbsp;{currentUser.phone} &nbsp;&nbsp;
                <EditIcon onClick={()=> setModel({ ...models, phone: true })} style={{ fontSize: '15px' }} htmlColor='red' />
              </li>
              <li>
                <EmailIcon /> &nbsp;&nbsp;{currentUser.email} &nbsp;&nbsp;
                <EditIcon onClick={()=> setModel({ ...models, email: true })} style={{ fontSize: '15px' }} htmlColor='red' />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default RestaurantProfile