import React from 'react'
import './ContactUs.css'
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { alignProperty } from '@mui/material/styles/cssUtils';

const ContactUs = () => {
    return (
        <>
            <div className='backdrop'>
                <div className='container'>
                    <div className=" contact_us">
                        <img className='contact_us_img'
                            src="./contact_us.jpeg"
                            alt="Restaurant Interior"

                        />
                    </div>

            <h1 className='mb-4' style={{textAlign:'center'}}>Contact Us</h1>
                    <p>
                        Welcome to Eazy Dining, your one-stop destination to check for real-time waittings at all restaurants around you and enabling seamless dining reservations.
                        Discover and book the best culinary experiences in your city with just a few clicks.
                    </p>

                    <p>
                        <strong>Services:</strong>
                    </p>
                    <ul>
                        <li>Explore a diverse range of restaurants and cuisines.</li>
                        <li>Get real-time waitings and save your time</li>
                        <li>Effortlessly make online reservations at your preferred restaurants</li>
                        <li>Get the best restaurant recommendations based on your location and dining history</li>
                        <li>Access a personalized dashboard to manage your reservations.</li>
                    </ul>

                    <p>
                        <strong>Address:</strong> Faculty of Technology and Engineering, Dandia Bazaar, Vadodara, Gujarat, India - 390001
                    </p>

                    <p>
                        <strong>Phone:</strong> (123) 456-7890
                    </p>

                    <p>
                        <strong>Email:</strong> easydiningproject@gmail.com
                    </p>

                    <p>
                        Follow us on social media for the latest updates and exclusive offers:
                    </p>

                    <div>
                        {/* Add social media icons and links here */}
                        <Link to="#facebook"><FacebookIcon /></Link> | <Link to="#twitter">Twitter</Link> | <Link to="#instagram"><InstagramIcon /></Link>
                    </div>

                    <p>
                        Join us in the celebration of good food and great times. Book your table today!
                    </p>
                </div>
            </div>
        </>
    )
}

export default ContactUs

