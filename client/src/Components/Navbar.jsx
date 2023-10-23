import React, {useEffect} from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom";
import Profile from './Profile'
import "./Navbar.css"
import { useAuth } from "../contexts/AuthContext";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import API from '../axios' ;
import jwtDecode from "jwt-decode";


const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, setAuth } = useAuth();
  const [cityValue, setCityValue] = React.useState(currentUser?.last_city);
  const [inputCityValue, setInputCityValue] = React.useState(currentUser?.last_city)

  useEffect(()=>{
    if(currentUser){
      setCityValue(currentUser?.last_city)
      setInputCityValue(currentUser?.last_city)
    }
  }, [currentUser])


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

  const handleLastCity = async(city)=>{
    const resp = await API.post("/customer/lastCity",{'_id':currentUser._id,'city':city});
    const decodedToken = jwtDecode(resp.data.accessToken);
    setCurrentUser(decodedToken);
    setAuth(resp.data.accessToken) ;
    navigate(`/home?city=${city}`);
  }

  return (
    <div className="navbar">
      <div className="Logo" onClick={handleHomeClick}><h3>EasyDining</h3></div>
      <div className="search">
        {
          currentUser?.userType === 'customer' &&
          <>
            <div className="city_search">
              <Autocomplete
                value={cityValue}
                onChange={(event, newValue) => {
                  setCityValue(newValue);
                  handleLastCity(newValue);
                }}
                inputValue={inputCityValue}
                onInputChange={(event, newInputValue) => {
                  setInputCityValue(newInputValue);
                }}
                options={city}
                sx={{ width: 200, border: "none" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Enter City"
                    className="no-border-on-focus" // Apply the CSS class here
                  />)
                }
              />
            </div>

            <div className="rest_search">
              <div>
                <input type="text" placeholder="Search for restaurant or cuisines"/>
              </div>
              <div>
                <button className=" search_btn"> <SearchIcon onClick={handleSearch} />Search </button>
              </div>
            </div>
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