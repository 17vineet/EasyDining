import React, { useState, useEffect } from 'react';
import { Form, Card, Button, Alert ,Container} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

import { useAuth } from '../../contexts/AuthContext';
import API from "../../axios";
const CustomerSignUp = () => {

  const [formData, setFormData] = useState({
    name:'',
    phone:'',
    email : '' ,
    password : '' ,
    cpassword : ''
  }) ;
  const {currentUser, setCurrentUser, setAuth} = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate() ;

  useEffect(()=>{
    if(currentUser){
      navigate('/') ;
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {password, cpassword} = formData ;

    if (password !== cpassword) {
      return setError('Passowords do not match');
    }

    try {
      setError(null);
      setLoading(true);
      const resp=await API.post("/customer/signup",formData)
      const decodedToken = jwtDecode(resp.data.accessToken) ;
      setCurrentUser(decodedToken) ;
      setAuth(resp.data.accessToken) ;
      navigate(`/home?city=${decodedToken.last_city}`) ;
    } catch (error) {
      setError(error.response.data) ;
    }
    setLoading(false);
  }

  const handleChange = (e)=>{
    const {name, value} = e.target ;
    setFormData((prevValue)=> ({
      ...prevValue,
      [name] : value
    })) ;
  } ;

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "75vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign Up</h2>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Form onSubmit={handleSubmit}>

              <Form.Group id='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type='text' 
                    name='name' 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                  >
                  </Form.Control>
                </Form.Group>
                <Form.Group id='Phone'>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control 
                    type='tel'
                    name='phone' 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required
                  >
                  </Form.Control>
                </Form.Group>
                <Form.Group id='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type='email' 
                    name='email' 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                  >
                  </Form.Control>
                </Form.Group>
                <Form.Group id='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type='password' 
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  >
                  </Form.Control>
                </Form.Group>
                <Form.Group id='password-confirm'>
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control 
                    type='password' 
                    name='cpassword'
                    value={formData.cpassword} 
                    onChange={handleChange} 
                    required
                  >
                  </Form.Control>
                </Form.Group><br />
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
            <div className='w-100 text-center mt-2'>
              Already have a customer account? 
              <Link to='/' style={{textDecoration:'none', color:'black', paddingLeft:'5px'}}>
                Sign In
              </Link>
            </div>
        </div>
      </Container>
    </>
  )
}

export default CustomerSignUp