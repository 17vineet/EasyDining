import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom";
import Profile from './Profile'
import "./Navbar.css"
import { useAuth } from "../contexts/AuthContext";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import API from '../axios';
import jwtDecode from "jwt-decode";


const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, setAuth } = useAuth();
  const [cityValue, setCityValue] = React.useState(currentUser?.last_city);
  const [inputCityValue, setInputCityValue] = React.useState(currentUser?.last_city)
  const [input, setInput] = useState("");
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {

    const fetchSearchItems = async () => {
      const resp = await API.post("/customer/searchBarItems", { city: cityValue })
      setSearchItems(resp.data.list);
    }

    if (currentUser) {
      setCityValue(currentUser?.last_city)
      setInputCityValue(currentUser?.last_city)
      fetchSearchItems();
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

  const handleSearch = (ele) => {
    console.log("Hii")
    if (ele.type === 'Restaurant') {
      navigate(`/restaurantDetails/${ele.id}`)
    }
  }

  const handleLastCity = async (city) => {
    const resp = await API.post("/customer/lastCity", { '_id': currentUser._id, 'city': city });
    const resp2 = await API.post("/customer/searchBarItems", { city: cityValue })
    const decodedToken = jwtDecode(resp.data.accessToken);
    setSearchItems(resp2.data.list);
    setCurrentUser(decodedToken);
    setAuth(resp.data.accessToken);
    navigate(`/home?city=${city}`);
  }

  const handleChange = async (event) => {
    setInput(event.target.value);
    const inputValue = event.target.value;

    // Find the selected option from the datalist
    const selectedOption = Array.from(event.target.list.options).find((option) => option.value === inputValue);

    // Extract additional data attributes from the selected option
    if (selectedOption) {
      const type = selectedOption.getAttribute('data-type');
      const id = selectedOption.getAttribute('data-id');

      if(type=="Restaurant"){
        navigate(`/restaurantdetails/${id}`)
        setInput("")
      }
      else{
        navigate(`/search?type=${type}&value=${inputValue}`);
        setInput("")

      }
      
      console.log(`Selected Type: ${type}`);
      console.log(`Selected Id: ${id}`);
    } 
  }

  const handleContactUsClick = ()=>{
    navigate('/contact-us')
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
                <input type="text" list="items" id="searchItem" value={input} onChange={handleChange} placeholder="Search for restaurant or cuisines" />
                <datalist id="items">
                  {
                    searchItems.map((ele, ind) => {
                    
                      return (
                          <option value={`${ele.name}`} data-type={ele.type} data-id={ele?.id}>{ele.type}</option>
                      )
                    })
                  }
                </datalist>
              </div>
              <div>
                <button className=" search_btn" onClick={handleSearch}> <SearchIcon />Search </button>
              </div>
            </div>
          </>
        }
      </div>
      <div className='contactdiv'>
        <button onClick={handleContactUsClick} id='Contact'>
          Contact Us
        </button>
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