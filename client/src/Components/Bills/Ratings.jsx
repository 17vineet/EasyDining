import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import API from '../../axios';
import { useNavigate } from 'react-router-dom';

const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function Ratings({rid}) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const navigate = useNavigate() ; 
  const submitReview = async () => {
    const resp=await API.post("/restaurant/addRating",{rid,rating:value})
    alert(resp.data.message) ;
    navigate('/home') ; 
  }

  return (
    <>
      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={1}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
      <button className='btn btn-primary m-2' onClick={submitReview}>Submit Review</button>
    </>
  );
}