import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom";
import Profile from './Profile'
import "./Navbar.css"
import { useAuth } from "../contexts/AuthContext";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';


const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [cityValue, setCityValue] = React.useState(city[0]);
  const [inputCityValue, setInputCityValue] = React.useState('');


  const handleClick = async (e) => {
    const typeOfUser = e.target.id;
    if (typeOfUser === 'Customer') navigate('/signup');
    else navigate('/business/signup');
  }

  const handleHomeClick = () => {
    if (!currentUser) {
      navigate('/')
    }
    else if (currentUser.userType == 'customer') {
      navigate(`/home?city=${cityValue}`);
    }
    else {
      navigate("/business/home")
    }
  }

  const handleSearch = () => {
    navigate(`/home?city=${cityValue}`);
  }

  return (
    <div className="navbar">
      <div className="Logo m-2" onClick={handleHomeClick}><h3>EasyDining</h3></div>
      <div className="search">
        {
          currentUser?.userType === 'customer' &&
          <>
            <Autocomplete
              value={cityValue}
              onChange={(event, newValue) => {
                setCityValue(newValue);
              }}
              inputValue={inputCityValue}
              onInputChange={(event, newInputValue) => {
                setInputCityValue(newInputValue);
              }}
              options={city}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Enter City"
                  className="no-border-on-focus" // Apply the CSS class here
                />)
              }
            />
            <button className="btn"> <SearchIcon onClick={handleSearch}> Search </SearchIcon></button>
          </>
        }
      </div>
      {
        currentUser ?
          <Profile />
          :
          <>
            <div>
              <Button color="inherit" variant="outlined" onClick={handleClick} id="Customer" >
                For Customer
              </Button>&nbsp;&nbsp;
              <Button color="inherit" variant="outlined" onClick={handleClick} id="Business">
                For Business
              </Button>
            </div>
          </>
      }
    </div>
  );
}

export default Navbar;

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