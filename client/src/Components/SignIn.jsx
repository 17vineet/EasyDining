import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert,Container } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';

const CustomerSignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, signIn } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if(passwordRef.current.value !== passwordConfirmRef.current.value){
    //   return setError('Passowords do not match') ;
    // }

    try {
      setError(null);
      setLoading(true)
      const response=await signIn(emailRef.current.value, passwordRef.current.value);
      console.log(response);

    } catch (error) {
      console.log(error.message);
      var msg=error.message
      if(msg.indexOf("user-not-found")>-1){
        setError("User account not found");
      }
      else{
      setError("Wrong credentials")

      }
      // alert("Wrong credentials")
    }

    // console.log(currentUser);
    setLoading(false);
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign In</h2>
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
                <br />
                <Button disabled={loading} className="w-100" type="submit">
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
            Already have an account? Sign In
          </div>
        </div>
      </Container>

    </>
  )
}

export default CustomerSignIn