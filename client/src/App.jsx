import React from 'react';
import { Container } from 'react-bootstrap'

import CustomerSignUp from './components/CustomerSignUp'
import { AuthProvider } from './contexts/AuthContext';

export const App = () => {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <CustomerSignUp />
        </div>
        {/* <RestaurantLogin/> */}
      </Container>
    </AuthProvider>
  )
}

