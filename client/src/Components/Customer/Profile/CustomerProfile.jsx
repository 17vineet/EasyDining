import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import PhoneEmailModel from './PhoneEmailModel'
import { useAuth } from '../../../contexts/AuthContext';
import './CustomerProfile.css'
import NameModel from './NameModel';
import API from '../../../axios';
import VisitedRestaurant from './VisitedRestaurant';

const CustomerProfile = () => {
  const { currentUser, setCurrentUser, setAuth } = useAuth();
  const [models, setModel] = useState({ name: false, email: false, phone: false });

  const handelDeleteAccount = async () => {
    const res = confirm('Are you sure you want to delete your account \n*Note that this action is not reversible and you cannot retrieve your account back')
    if (res) {
      const password = prompt('Please confirm your password to delete your account')
      const resp = await API.post('/customer/deleteAccount', { '_id': currentUser._id, 'password': password })

      if (resp.data.message === 'Success') {
        alert('Account Deleted Successfully')
        setCurrentUser(null);
        setAuth(null);
        navigate('/')
      }
      else {
        alert('Account could not be deleted due to incorrect password')
      }
    }
  }

  return (
    <>
      {models.name && <NameModel closeNameModel={(newstate) => setModel({ ...models, name: newstate })} />}
      {models.phone && <PhoneEmailModel editField="phone" closePEmodel={(newstate) => setModel({ ...models, phone: newstate })} />}
      {models.email && <PhoneEmailModel editField="email" closePEmodel={(newstate) => setModel({ ...models, email: newstate })} />}

      <div className="backdrop">
        <div className="customerDetailsHolder">
          <div className="profilePicHolder">
            <img src="./profile.jpeg" alt="" />
          </div>
          <div className="customerDetails">
            <ul >
              <li>{currentUser.name} &nbsp;&nbsp;
                <EditIcon onClick={() => setModel({ ...models, name: true })} style={{ fontSize: '15px' }} htmlColor='red' />
              </li>
              <li>
                <LocalPhoneIcon /> &nbsp;&nbsp;{currentUser.phone} &nbsp;&nbsp;
                <EditIcon onClick={() => setModel({ ...models, phone: true })} style={{ fontSize: '15px' }} htmlColor='red' />
              </li>
              <li>
                <EmailIcon /> &nbsp;&nbsp;{currentUser.email} &nbsp;&nbsp;
                <EditIcon onClick={() => setModel({ ...models, email: true })} style={{ fontSize: '15px' }} htmlColor='red' />
              </li>
            </ul>

            <button className='btn btn-danger' onClick={handelDeleteAccount}>Delete Account</button>

          </div>
        </div>
        <VisitedRestaurant/>
      </div>
    </>
  )
}

export default CustomerProfile