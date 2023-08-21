import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert ,Container} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext';
import RestaurantDetails from './RestaurantDetails';

const SignUp = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup ,registerUser} = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typeOfUser, setTypeOfUser] = useState("Customer");
  const navigate = useNavigate() ;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passowords do not match');
    }

    try {
      setError(null);
      setLoading(true)
      const response = await signup(emailRef.current.value, passwordRef.current.value);
      const response2 = await registerUser(response.user.email,typeOfUser);
      console.log(response2);
      // navigate('/restaurantDetails') ;

    } catch (error) {
      console.log(error);
      setError("Failed to create an account")
    }
    setLoading(false);
  }

  console.log(typeOfUser);

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign Up</h2>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                {/* <div className='row'>
                    <div className='col'>
                           <input type='radio' defaultChecked id="customer" value='customer' name='userType' onClick={()=>{setTypeOfUser("Customer")}}/>
                           <label htmlFor="customer">Customer</label>
                    </div>
                    <div className='col'>
                      <input type='radio' value='restaurant' id="restaurant" name='userType' onClick={()=>{setTypeOfUser("Restaurant")}}/>
                      <label htmlFor="restaurant">Restaurant</label>
                    </div>
                </div> */}
                <Form.Switch label='Restaurant' value='Restaurant' onClick={(e)=> setTypeOfUser(prev => prev == 'Customer' ? 'Restaurant' : 'Customer') }/>
                <br/>
                <Form.Group id='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' ref={emailRef} required></Form.Control>
                </Form.Group>
                <Form.Group id='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' ref={passwordRef} required></Form.Control>
                </Form.Group>
                <Form.Group id='password-confirm'>
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type='password' ref={passwordConfirmRef} required></Form.Control>
                </Form.Group><br />
                { typeOfUser === 'Restaurant' && <RestaurantDetails /> }
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
            <div className='w-100 text-center mt-2'>
              Already have an account? 
              <Link to='/signin' style={{textDecoration:'none', color:'black', paddingLeft:'5px'}}>
                Sign In
              </Link>
            </div>
        </div>
      </Container>
    </>
  )
}

export default SignUp