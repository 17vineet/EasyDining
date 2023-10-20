import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import API from '../../../../axios';
import { Grid } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const RestaurantCard = ({ name, thumbnail_url, city, id }) => {
    const [expanded, setExpanded] = useState(false);
    const [cuisines, setCuisines] = useState([]);
    const navigate = useNavigate();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const fetchMenu = async () => {
            const resp = await API.post('restaurant/getRestaurantMenu', { rid: id });
            setCuisines(resp.data.menu)
        }

        fetchMenu();
    }, [])

    return (
        <Card sx={{ maxWidth: 345 , ":hover": { 'border': '1px solid grey' } ,"borderRadius":"7px"}}>
            <CardMedia
                component="img"
                height="194"
                image={thumbnail_url}
                // alt="Paella dish"
                onClick={() => {
                    navigate(`/restaurantdetails/${id}`)
                }}
                sx={{"transition":"transform 0.4s", ":hover": { 'cursor': 'pointer', 'transform': 'scale(1.1)' } }}
            />
            <CardActions disableSpacing sx={{ padding: 0 }}>
                <CardHeader
                    title={name}
                    subheader={city}
                    onClick={() => {
                        navigate(`/restaurantdetails/${id}`)
                    }}
                    sx={{ ":hover": { 'cursor': 'pointer' } }}
                />
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>Cuisines:</Typography>
                    <Grid container spacing={2}>
                        {cuisines.map((ele, ind) => {
                            return (
                                <Grid item>{ele.name}</Grid>
                            )
                        })}
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default RestaurantCard;
