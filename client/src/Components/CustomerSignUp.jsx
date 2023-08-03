import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';

const CustomerLogin = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser ,signup } = useAuth() ;
  const [error, setError] = useState(null) ;
  const [loading, setLoading] = useState(false) ;

  const handleSubmit = async (e)=>{
    e.preventDefault() ; 

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passowords do not match') ;
    }

    try {
      setError(null) ;
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value) ;

    } catch (error) {
      console.log(error);
      setError("Failed to create an account")
    }
    setLoading(false) ;
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
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
            </Form.Group><br/>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? Sign In
      </div>
    </>
  )
}

export default CustomerLogin