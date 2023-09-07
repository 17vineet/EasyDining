import React, { useState, useEffect } from 'react';
import { Form, Card, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../axios'
import { useAuth } from '../contexts/AuthContext';

const CustomerSignIn = () => {
  const [formData, setFormData] = useState({ email: 'easy@gmail.com', password: '123456' })
  const {setUserType, userType, currentUser, setCurrentUser} = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
    else {
      setUserType('Customer');
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const resp = await API.post(`${userType}/signin`, formData);
    const authenticated = resp.data.authenticated ;
    if (authenticated == true) {
      setCurrentUser(resp.data) ;
      if(userType == 'Restaurant')  navigate('business/home') ;
      else  navigate('/home') ;
    }
    else {
      setError("User account not found");
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
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
              <Form.Switch
                label='Restaurant'
                value='Restaurant'
                onClick={(e) => setUserType(prev => prev == 'Customer' ? 'Restaurant' : 'Customer')}
              />
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
                <br />
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