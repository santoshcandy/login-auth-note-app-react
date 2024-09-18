// src/components/LoginForm.js
import api from '../api';
import  { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { ACCESS_TOKEN , REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import LoadingIndicator from './LoadingIndicator';
import { Link } from 'react-router-dom';
 
 const LoginForm = ({route , method}) => {
    
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading , setLoading] = useState(false)
 const navigate = useNavigate()

  const name =method ==='login'?"Login":"Register";


  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    // Handle form submission logic here
    console.log('Username:', username);
    console.log('Password:', password);

    try{
        const req = await api.post(route,{username,password})
        if(method==="login"){
            localStorage.setItem(ACCESS_TOKEN , req.data.access);
            localStorage.setItem(REFRESH_TOKEN , req.data.refresh);
            navigate('/')
        }else{
            navigate('/login')
        }
    }catch(error){
            alert(error)
            console.error('Error during API call:', error.response?.data || error.message);
            console.log(route,{username,password})
            console.log('Route:', route); // Should be "/api/user/register/"
console.log('Username:', username); // Verify the username value
console.log('Password:', password); // Verify the password value

    }finally{
        setLoading(false)
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
       <Form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <h2 className="text-center mb-4">{name}</h2>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {loading && <LoadingIndicator/>}
        <Button variant="primary" type="submit" className="w-100">
          {name}
        </Button>
        <div className="mt-3 text-center">
          {method === 'login' && (
            <>
              <Link to="/forgot-password" className="d-block">Forgot Password?</Link>
              <Link to="/register" className="d-block">Create New Account</Link>
            </>
          )}
          {method === 'register' && (
            <Link to="/login" className="d-block">Already have an account? Login</Link>
          )}
        </div>
      </Form>
    </Container>
  );
 }
 
  

export default LoginForm;
