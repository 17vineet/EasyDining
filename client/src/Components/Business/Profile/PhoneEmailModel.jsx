import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Alert } from '@mui/material';
import jwtDecode from 'jwt-decode';

import API from '../../../axios';
import { useAuth } from '../../../contexts/AuthContext';
import './PhoneEmailModel.css';

const PhoneEmailModel = ({ editField, closePEmodel }) => {

    const { currentUser, setCurrentUser, setAuth } = useAuth();
    console.log(editField)

    const [formData, setFormData] = useState({
        phone: currentUser.phone,
        email: currentUser.email,
        password: ''
    })
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleSave=async()=>{
        setError(null) ;
        setSuccess(null) ;
        try {
            const resp = await API.post('/restaurant/updateDetails',{
                rid:currentUser._id,
                change:editField,
                password:formData.password,
                phone:formData.phone,
                email:formData.email
            })
            const decodedToken = jwtDecode(resp.data.accessToken);
            setCurrentUser(decodedToken);
            setAuth(resp.data.accessToken);
            setSuccess('Profile updated successfully');
        } catch (error) {
            setError(error.response.data);
        }
    }
    return (
        <div className="pe-modal">
            <div className="pe-modal-content" key={"modal"}>
                <CloseIcon className='closeBtn' onClick={() => { closePEmodel(false) }} />
                <div className="editForm">
                    {
                        editField == "phone" &&
                        <div >
                            <TextField label='Phone' name="phone" variant='outlined' value={formData.phone} fullWidth onChange={handleChange} />
                        </div>
                    }
                    {
                        editField == "email" &&
                        <div>
                            <TextField label='Email' name="email" variant='outlined' value={formData.email} fullWidth onChange={handleChange} />
                        </div>
                    }
                    <div>
                        <TextField label='Password' name="password" type='password' variant='outlined' value={formData.password} fullWidth onChange={handleChange} />
                    </div>
                    <button className='btn btn-primary' onClick={handleSave}>Save Changes</button>
                   
                    { error && 
                        <Alert severity="error">
                            {error}
                        </Alert>
                    }
                    
                    { success && 
                        <Alert severity="success">
                            {success}
                        </Alert>
                    }
                
                </div>
            </div>
        </div>
    )
}

export default PhoneEmailModel