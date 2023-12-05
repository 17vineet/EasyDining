import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Input, Grid, Hidden, CircularProgress } from '@mui/material';
import { Alert } from 'react-bootstrap';
import DoneIcon from '@mui/icons-material/Done';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { useAuth } from '../../contexts/AuthContext';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import API from "../../axios";
import dayjs from 'dayjs';
const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        location_url: '',
        sitting_capacity: '',
        range: range[0],
        phone: '',
        thumbnail_url: '',
        numberOfTables: '',
        city: city[0],
        opening_time: dayjs('2022-04-17T10:00'),
        closing_time: dayjs('2022-04-17T23:00')
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { currentUser, setCurrentUser, setAuth } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [uploadingImages, setUploadingImages] = useState({ spinner: false, tick: false });
    const [uploadingThumbnail, setUploadingThumbnail] = useState({ spinner: false, tick: false });
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    const handleFileChangeforMultipleUpload = (event) => {
        const file = event.target.files;
        setSelectedFile1(file);
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
            setUploadingThumbnail({ spinner: true, tick: false });
            const formData = new FormData();
            formData.append('images', selectedFile);
            const result = await API.post("/cloudinary/thumbnail", formData)
            setFormData((prev) => ({
                ...prev,
                thumbnail_url: result.data.img_urls[0]
            }))
            setUploadingThumbnail({ spinner: false, tick: true });
        }
        else {
            alert('Please select an image for thumbnail !!!')
        }
    };

    const uploadImages = async (e) => {
        e.preventDefault();
        if (selectedFile1) {
            setUploadingImages({ spinner: true, tick: false });
            const formData = new FormData();
            for (let i = 0; i < selectedFile1.length; i++) {
                formData.append('images', selectedFile1[i]);
            }
            const result = await API.post("/cloudinary/images", formData)
            setFormData((prev) => ({
                ...prev,
                images_urls: result.data.img_urls
            }))
            setUploadingImages({ spinner: false, tick: true });
        }
        else {
            alert('Please select some images !!!')
        }
    };
    const isPhoneNumberValid = (phoneNumber) => {
        // You can customize this validation logic based on your requirements
        return /^[6-9]\d{9}$/.test(phoneNumber);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(formData);
            if(!isPhoneNumberValid(formData.phone)){
                alert("Please enter proper Phone number")
                return;
            }
            if (!selectedFile || !selectedFile1) {
                alert("Please fill out all the fields");
                return;
            }
            let opening_time = formData.opening_time ;
            let closing_time = formData.closing_time ;
            if(typeof(formData.opening_time)=='object'){
                opening_time=formData.opening_time.$d.toLocaleTimeString().slice(0,5)
            }
            if(typeof(formData.closing_time)=='object'){
                closing_time=formData.closing_time.$d.toLocaleTimeString().slice(0,5)
            }
            const resp = await API.post("/restaurant/signup",{...formData,opening_time:opening_time,closing_time:closing_time})
            const decodedToken = jwtDecode(resp.data.accessToken);
            setCurrentUser(decodedToken);
            setAuth(resp.data.accessToken);
            setLoading(false);
            navigate('/business/home');
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        console.log(typeof(formData.opening_time))
        if (currentUser) {

            navigate('/business/home');
        }
    }, [])

    return (
        <Container maxWidth="md"><br />
            <Typography variant="h3" align="center" gutterBottom>
                Restaurant Details
            </Typography>
            {error && <Alert variant='danger'>{error}</Alert>}
            <form onSubmit={handleSubmit} >
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
                            required
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
                            required

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
                            required

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Google Map URL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="location_url"
                            value={formData.location_url}
                            onChange={handleInputChange}
                            required

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Capacity"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type='number'
                            name="sitting_capacity"
                            value={formData.sitting_capacity}
                            onChange={handleInputChange}
                            required

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            disablePortal
                            options={range}
                            renderInput={(params) =>
                                <TextField {...params} label="Range" name='range' required />
                            }
                            value={formData.range}
                            onChange={(event, newValue) => {
                                setFormData({ ...formData, range: newValue })
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            name="city"
                            disablePortal
                            options={city}
                            value={formData.city}
                            onChange={(event, newValue) => {
                                setFormData({ ...formData, city: newValue });
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="City" required />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                <TimePicker
                                    label="Opening Time"
                                    name="opening_time"
                                    value={formData.opening_time}
                                    onChange={(newValue)=>{
                                        setFormData({...formData,opening_time:newValue.$d.toLocaleTimeString().slice(0,5)})
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker', 'TimePicker']}>
                                <TimePicker
                                    label="Closing Time"
                                    name="closing_time"
                                    value={formData.closing_time}
                                    onChange={(newValue)=>{
                                        setFormData({...formData,closing_time:newValue.$d.toLocaleTimeString().slice(0,5)})
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
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
                                    required
                                />
                            </Button>
                            {
                                uploadingThumbnail.spinner ? <CircularProgress />
                                    : uploadingThumbnail.tick ? <DoneIcon />
                                        : <Button onClick={uploadThumbnail}>Upload</Button>
                            }
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        Images &nbsp;
                        <form method='post' id="upload-image-form" >
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Select File
                                <input
                                    type="file"
                                    name="images"
                                    onChange={handleFileChangeforMultipleUpload}
                                    multiple
                                    required
                                />
                            </Button>
                            {
                                uploadingImages.spinner ? <CircularProgress />
                                    : uploadingImages.tick ? <DoneIcon />
                                        : <Button onClick={uploadImages}>Upload</Button>
                            }
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

const city = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Vadodara",
    "Rajkot",
    // "Meerut",
    // "Kalyan-Dombivali",
    // "Faridabad",
    // "Varanasi",
    // "Srinagar",
    // "Aurangabad",
    // "Dhanbad",
    // "Amritsar",
    // "Navi Mumbai",
    // "Allahabad",
    // "Ranchi",
    // "Haora",
    // "Gwalior",
    // "Jabalpur",
    // "Vijayawada",
    // "Jodhpur",
    // "Madurai",
    // "Raipur",
    // "Kota",
    // "Guwahati",
    // "Chandrapur",
    // "Hubli-Dharwad",
    // "Bareilly",
    // "Moradabad",
    // "Mysore",
    // "Gurgaon",
    // "Aligarh",
    // "Jalandhar",
    // "Tiruchirappalli",
    // "Bhubaneswar",
    // "Salem",
    // "Mira-Bhayandar",
    // "Warangal",
    // "Guntur",
    // "Bhiwandi",
    // "Saharanpur",
    // "Gorakhpur",
    // "Bikaner",
    // "Amravati",
    // "Noida",
    // "Jamshedpur",
    // "Bhilai",
    // "Cuttack",
    // "Firozpur",
    // "Kochi",
    // "Nellore",
    // "Bhavnagar",
    // "Dehradun",
    // "Durgapur",
    // "Asansol",
    // "Rourkela",
    // "Nanded",
    // "Kolhapur",
    // "Ajmer",
    // "Akola",
    // "Gulbarga",
    // "Jamnagar",
    // "Ujjain",
    // "Loni",
    // "Siliguri",
    // "Jhansi",
    // "Ulhasnagar",
    // "Nellore",
    // "Jammu",
    // "Sangli",
    // "Mirzapur",
    // "Darbhanga",
    // "Dewas",
    // "Kurnool",
    // "Ichalkaranji",
    // "Karnal",
    // "Bathinda",
    // "Shahjahanpur",
    // "Satara",
    // "Bijapur",
    // "Rampur",
    // "Shimoga",
    // "Chandrapur",
    // "Junagadh",
];

const range = [
    'Budget Friendly',
    'Medium',
    'Premium',
    'Super Premium'
]