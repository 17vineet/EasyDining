import React, { useState } from 'react';
import { Form, Card, Button, Alert, Container } from 'react-bootstrap';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import API from '../axios'
import { useAuth } from '../contexts/AuthContext';

const CustomerSignIn = () => {
  const [formData, setFormData] = useState({ email: 'hetvik@gmail.com', password: '123456' })
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('customer') ;

  const { setCurrentUser, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() ; 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = await API.post(`${userType}/signin`, formData);
      const decodedToken = jwtDecode(resp.data.accessToken);
      setCurrentUser(decodedToken);
      setAuth(resp.data.accessToken) ;
      if (userType === 'restaurant'){
        const from = location.state?.from?.pathname || '/business/home' ;
        navigate(from, {replace: true});
      }
      else{
        const from = location.state?.from?.pathname || '/home' ;
        navigate(from, {replace: true});

      }
    } catch (error) {
      setError(error.response.data);
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value}));
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "75vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign In</h2>
              {error && <Alert variant='danger'>{error}</Alert>}
              <RadioGroup row value={userType} onChange={(e) => setUserType(e.target.value)} >
                <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                <FormControlLabel value="restaurant" control={<Radio />} label="Restaurant" />
              </RadioGroup>
              <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <br /><br />
                <Button disabled={loading} className="w-100" type="submit">
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  )
}

export default CustomerSignIn