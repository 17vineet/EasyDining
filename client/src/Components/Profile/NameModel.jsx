import {React,useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';

import { useAuth } from '../../contexts/AuthContext'
import './NameModel.css'

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
                    <input type="text" name="" id="" value={name} onChange={(event)=>{
                        setName(event.target.value)
                    }}/>
                </div>
                <button className='btn btn-primary'>Save Changes</button>
            </div>
        </div>
    )
}

export default NameModel