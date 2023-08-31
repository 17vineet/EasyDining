import React, { useState, useEffect } from 'react';
import { Form, Card, Button, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios' ;
import API from '../axios'
import { useAuth } from '../contexts/AuthContext';

const CustomerSignIn = () => {
  const [formData, setFormData] = useState({ email : '',  password : ''})
  const {currentUser, signIn, setUserType, userType, setCurrentUser } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate() ;

  useEffect(()=>{
    if(currentUser){
      navigate('/home') ;
    }
    else{
      setUserType('Customer') ;
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
      setError(null) ;
      setLoading(true) ;
      if(userType=='Business'){
        const resp=await API.post("signInRestaurant",formData);
        const authenticated=resp.data.authenticated
        console.log(authenticated);
        if(authenticated==true)
        {
          console.log("Navigated")
          navigate('/business/home')
        }
      }
      else if(userType=='Customer'){
        const resp=await API.post("signInCustomer",formData);
        const authenticated=resp.data.authenticated
        console.log(authenticated);
        if(authenticated==true)
        {
          console.log("Navigated")
          navigate('/home')
        }
      }
      else{
        setError("User account not found");
      }
     
    //   if(found){
    //     if(userType === 'Customer'){
    //       navigate('/home') ;
    //     }
    //     else{
    //       navigate('/business/home') ;
    //     }
    //     const response = await signIn(formData);
    //     console.log(response);
    //   }
    //   else{
    //     setError("User account not found");
    //   }

    // } catch (error) {
    //   console.log(error.message);
    //   var msg = error.message
    //   if (msg.indexOf("user-not-found") > -1) {
    //     setError("User account not found");
    //   }
    //   else {
    //     setError("Wrong credentials")
    //   }
    // }
    // setLoading(false);
  }

  const handleChange = (e)=>{
    const {name, value} = e.target ;
    setFormData((prevValue)=>({
      ...prevValue, 
      [name] : value
    })) ;
  } ;

  // console.log(userType);

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
                onClick={(e)=> setUserType(prev => prev == 'Customer' ? 'Business' : 'Customer') }
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