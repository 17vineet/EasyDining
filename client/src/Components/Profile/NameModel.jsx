import {React,useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

import { useAuth } from '../../contexts/AuthContext'
import './NameModel.css'
import API from '../../axios';

const NameModel = (prop) => {
    
    const {currentUser} =useAuth() ; 
    const [name,setName]=useState(currentUser.name)
    return (
        <div className="name-modal">
            <div className="name-modal-content" key={"modal"}>
                <CloseIcon className='closeBtn' onClick={()=>{
                    prop.closeNameModel(false)
                }}/>
                
                <div>
                    <img src="./profile.jpeg" alt="" />
                </div>
                <div className='cust_name'>
                <TextField label='Name' variant='outlined' value={name} fullWidth onChange={(event)=>{
                    setName(event.target.value) }} />
                </div>
              
                <button className='btn btn-primary' onClick={async()=>{
                    const resp=await API.post("/customer/updateDetails",{_id:currentUser._id,name:name.trim(),change:'name'})
                    console.log(resp.data)
                }}>Save Changes</button>
            </div>
        </div>
    )
}

export default NameModel