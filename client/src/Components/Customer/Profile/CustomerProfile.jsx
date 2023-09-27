import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

import { useAuth } from '../../../contexts/AuthContext';
import './CustomerProfile.css'
import NameModel from './NameModel';

const CustomerProfile = () => {
  const {currentUser} =useAuth() ; 
  const [models, setModel] = useState({ name: false, email: false, phone: false });

  return (
    <>
      {models.name == true && <NameModel closeNameModel={(newstate) => setModel({ ...models, name: newstate })} />}
      <div className="backdrop">
        <div className="customerDetailsHolder">
          <div className="profilePicHolder">
            <img src="./profile.jpeg" alt="" />
          </div>
          <div className="customerDetails">
            <ul >
            
              <li  > {currentUser.name} &nbsp;&nbsp;<EditIcon onClick={() => setModel({ ...models, name: true })} style={{ fontSize: '15px' }} htmlColor='red' /></li>
              <li><LocalPhoneIcon /> &nbsp;&nbsp;{currentUser.phone} &nbsp;&nbsp;<EditIcon style={{ fontSize: '15px' }} htmlColor='red' /></li>
              <li><EmailIcon /> &nbsp;&nbsp;{currentUser.email} &nbsp;&nbsp;<EditIcon style={{ fontSize: '15px' }} htmlColor='red' /></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerProfile