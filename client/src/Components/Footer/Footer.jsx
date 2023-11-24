import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
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
        "Rajkot",]
    return (
        <div className='mainfooter'>
            <div className="footercontent1">
                <div>
                    <h4>EazyDiner</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Food Trends</li>
                        <li>Partner Offers</li>
                        <li>Download App</li>
                        <li>Career</li>
                    </ul>
                </div>
                <div>
                    <h4>Discover</h4>
                    <ul>
                        <li>Table booking</li>
                        <li>Fast food near me</li>
                        <li>Prepaid deals near me</li>
                    </ul>
                </div>
                <div>
                    <h4>For You</h4>
                    <ul>
                        <li>Prime Subscription</li>
                        <li>PayEazy</li>
                        <li>EazyPoints Redemption</li>
                        <li>Refer & Earn</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <h4>For Restaurant</h4>
                    <ul>
                        <li>List Your Restaurant</li>
                        <li>Livetable - Restaurants SaaS</li>
                    </ul>
                </div>
            </div>
            <div className='footercontent2'>
                <h3>Book Best Restaurants In</h3>
                <ul>
                    {city.map((city, index) => (
                        <>
                        <li key={index}>
                            <Link to={`/home?city=${city}`}>
                                {city}
                            </Link>
                        </li>
                        &nbsp;|&nbsp;
                        </>
                    ))}
                </ul>

            </div>

        </div>
    )
}

export default Footer