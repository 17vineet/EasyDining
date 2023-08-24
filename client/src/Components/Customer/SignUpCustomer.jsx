import React, { useState, useEffect } from 'react';
import { Form, Card, Button, Alert ,Container} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext';

const CustomerSignUp = () => {

  const [formData, setFormData] = useState({
    email : '' ,
    password : '' ,
    cpassword : ''
  }) ;
  const { signUp ,registerUser, currentUser} = useAuth();
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

      const response = await signUp(formData);
      const response2 = await registerUser(formData, 'Customer');

      console.log(response, response2);

    } catch (error) {
      console.log(error);
      setError("Failed to create an account")
    }
    navigate('/home') ;
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