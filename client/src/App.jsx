import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import CustomerSignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import RestaurantDetails from './Components/RestaurantDetails';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<SignUp />}></Route>
        <Route path='/signin' element={<CustomerSignIn />}></Route>
        <Route path='/restaurantDetails' element={<RestaurantDetails />}></Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

