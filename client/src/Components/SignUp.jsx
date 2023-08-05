import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert ,Container} from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, signup ,registerUser} = useAuth();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typeOfUser,setTypeOfUser]=useState("Customer");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passowords do not match');
    }

    try {
      setError(null);
      setLoading(true)
      const response=await signup(emailRef.current.value, passwordRef.current.value);
      const resp2=await registerUser(response.user.email,typeOfUser);
      console.log(resp2);

    } catch (error) {
      console.log(error);
      setError("Failed to create an account")
    }
    setLoading(false);
  }

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
            <div className='row'>
           <div className='col'>
           <input type='radio' defaultChecked id="customer" value='customer' name='userType' onClick={()=>{setTypeOfUser("Customer")}}/>
                  <label htmlFor="customer">Customer</label>
           </div>
                <div className='col'>
                <input type='radio' value='restaurant' id="restaurant" name='userType' onClick={()=>{setTypeOfUser("Restaurant")}}/>
                <label htmlFor="restaurant">Restaurant</label>
                </div>
            </div>
                 
                
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
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>

      <div className='w-100 text-center mt-2'>
        Already have an account? Sign In
      </div>
    </>
  )
}

export default SignUp