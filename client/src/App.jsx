import React , {useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CustomerHome from './Components/Customer/Home/Home';
import CustomerSignUp from './Components/Customer/SignUpCustomer';

import BusinessHome from './Components/Business/Home/Home';
import BusinessSignUp from './Components/Business/SignUpBusiness';
import RestaurantPage from './Components/Customer/Home/RestaurantPage'
import SignIn from './Components/SignIn';
import Navbar from './Components/Navbar';
import Menu from './Components/Business/Menu/Menu';

export const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='/signup' element={<CustomerSignUp />}></Route>
        <Route path='/home' element={<CustomerHome />}></Route>
        <Route path='/restaurantdetails/:rid' element={<RestaurantPage />}></Route>
        <Route path='/business/signup' element={<BusinessSignUp />}></Route>
        <Route path='/business/home' element={<BusinessHome />}></Route>
        <Route path='/business/menu' element={<Menu />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

