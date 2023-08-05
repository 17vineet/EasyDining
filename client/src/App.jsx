import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import CustomerSignIn from './Components/SignIn';
import SignUp from './Components/SignUp';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<SignUp />}></Route>
        <Route path='/login' element={<CustomerSignIn />}></Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

