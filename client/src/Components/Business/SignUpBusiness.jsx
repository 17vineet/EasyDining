import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Input, Grid, Hidden } from '@mui/material';
import { Textarea } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import API from "../../axios";
const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        googleMapUrl: '',
        capacity: '',
        range: '',
        thumbnail_url: '',
        numberOfTables: '',
    });
    const [loading, setLoading] = useState(false);
    const { signUp, registerUser, currentUser } = useAuth();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const uploadThumbnail = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('images', selectedFile);

           
            // const result = await fetch("http://localhost:4000/uploadRestaurantThumbnail", {
            //     method: "POST",
            //     body: formData
            // })
            const result=await API.post("uploadRestaurantThumbnail",formData)
            console.log(result.data.img_urls[0]);
            setFormData((prev)=>({
                ...prev,
                thumbnail_url:result.data.img_urls[0]
            }))
           

        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        const resp=await API.post("onBoardRestaurant",formData)
        console.log(resp);
        navigate('/business/home');
        setLoading(false);
    };

    useEffect(() => {
        if (currentUser) {
            navigate('/business/home');
        }
    }, [])

    return (
        <Container maxWidth="md"><br />
            <Typography variant="h3" align="center" gutterBottom>
                Restaurant Details
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Google Map URL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="googleMapUrl"
                            value={formData.googleMapUrl}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Capacity"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Range"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="range"
                            value={formData.range}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            label="Number of Tables"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="numberOfTables"
                            value={formData.numberOfTables}
                            onChange={handleInputChange}
                        />
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <label htmlFor=""> Menu  </label>
                        <Textarea
                            minRows={2}
                            label="Menu"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="menu"
                            value={formData.menu}
                            onChange={handleInputChange}
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        Thumbnail &nbsp;
                        <form method='post' id="upload-thumbnail-form" >
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Select File
                                <input
                                    type="file"
                                    name="images"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            <Button onClick={uploadThumbnail}>Upload</Button>
                        </form>
                    </Grid>
                </Grid> <br />
                <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                    Submit
                </Button>
                <div className='w-100 text-center mt-2'>
                    Already have a business account?
                    <Link to='/' style={{ textDecoration: 'none', color: 'black', paddingLeft: '5px' }}>
                        Sign In
                    </Link>
                </div>
            </form>
        </Container>
    );
};

export default SignUp;
