import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CustomerHome from './Components/Customer/Home/Home';
import CustomerSignUp from './Components/Customer/SignUpCustomer';
import CustomerProfile from './Components/Customer/Profile/CustomerProfile';
import RestaurantPage from './Components/Customer/Home/RestaurantPage'
import SearchByItems from './Components/Customer/SearchByItems/SearchByItems';

import BusinessHome from './Components/Business/Home/Home';
import BusinessSignUp from './Components/Business/SignUpBusiness';
import Menu from './Components/Business/Menu/Menu';
import RestaurantProfile from './Components/Business/Profile/RestaurantProfile';
import Bill from '../src/Components/Bills/Bill' ;


import SignIn from './Components/SignIn';
import Navbar from './Components/Navbar';
import ContactUs from './Components/ContactUs/ContactUs';
import Footer from './Components/Footer/Footer';

import RequireAuth from './Components/RequireAuth';
import Unauthorized from './Components/Unauthorized';
import PersistLogin from './Components/PersistLogin';
import Missing from './Components/Missing';


export const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* public routes */}
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<CustomerSignUp />} />
        <Route path='/business/signup' element={<BusinessSignUp />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/contact-us' element={<ContactUs/>} />

        {/* We want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth userType='customer' />} >
            <Route path='/home' element={<CustomerHome />} />
            <Route path='/restaurantdetails/:rid' element={<RestaurantPage />} />
            <Route path='/profile' element={<CustomerProfile />} />
            <Route path='/customer/bill/:oid' element={<Bill />} />
            <Route path='/search' element={<SearchByItems />} />
          </Route>

          <Route element={<RequireAuth userType='restaurant' />}>
            <Route path='/business/home' element={<BusinessHome />} />
            <Route path='/business/menu' element={<Menu />} />
            <Route path='/business/profile' element={<RestaurantProfile />} />
            <Route path='/restaurant/bill/:oid' element={<Bill />} />
          </Route>
        </Route>

        <Route path="/*" element={<Missing />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

