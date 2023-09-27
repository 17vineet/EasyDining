import { React, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Alert, AlertTitle } from '@mui/material';
import jwtDecode from 'jwt-decode';

import { useAuth } from '../../../contexts/AuthContext'
import './NameModel.css'
import API from '../../../axios';

const NameModel = (prop) => {

    const { currentUser, setCurrentUser, setAuth } = useAuth();

    const [name, setName] = useState(currentUser.name)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleUpdate = async () => {
        setError(null);
        setSuccess(null);
        try {
            const resp = await API.post("/customer/updateDetails", { _id: currentUser._id, name: name.trim(), change: 'name'})
            const decodedToken = jwtDecode(resp.data.accessToken);
            setCurrentUser(decodedToken);
            setAuth(resp.data.accessToken);
            setSuccess('Profile updated successfully');
        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <div className="name-modal">
            <div className="name-modal-content" key={"modal"}>
                <CloseIcon className='closeBtn' onClick={() => {
                    prop.closeNameModel(false)
                }} />

                <div>
                    <img src="./profile.jpeg" alt=""/>
                </div>
                <div className='cust_name'>
                    <TextField label='Name' variant='outlined' value={name} fullWidth onChange={(event) => {
                        setName(event.target.value)
                    }} />
                </div>
                <button className='btn btn-primary' onClick={handleUpdate}>Save Changes</button><br />
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
    )
}

export default NameModel