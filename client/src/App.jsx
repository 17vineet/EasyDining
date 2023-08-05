import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CustomerSignUp from './components/CustomerSignUp'
import { AuthProvider } from './contexts/AuthContext';
import CustomerSignIn from './components/CustomerSignIn';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<CustomerSignUp />}></Route>
        <Route path='/login' element={<CustomerSignIn />}></Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

