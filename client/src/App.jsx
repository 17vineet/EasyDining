import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import CustomerHome from './Components/Customer/Home/Home';
import CustomerSignUp from './Components/Customer/SignUpCustomer';

import BusinessHome from './Components/Business/Home/Home';
import BusinessSignUp from './Components/Business/SignUpBusiness';

import SignIn from './Components/SignIn' ;
import Navbar from './Components/Navbar' ;

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='/signup' element={<CustomerSignUp />}></Route>
        <Route path='/home' element={<CustomerHome />}></Route>
        <Route path='/business/signup' element={<BusinessSignUp />}></Route>
        <Route path='/business/home' element={<BusinessHome />}></Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

