import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import api from '../api'; // Assuming Axios is set up for API calls
import { useNavigate } from 'react-router-dom';
   
 const UpdatePassword = () => {
   
   
      const [username, setUsername] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [message, setMessage] = useState('');
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
const navigate = useNavigate()
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
    
        if (newPassword !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
    
        try {
         const res= await api.post('/api/user/forgot-password/', {
            username,
            password: newPassword,
          });
          
          setMessage('Password updated successfully.');
          navigate('/login/')


        } catch (error) {
          setError('Failed to update the password. Please try again.');
           alert(error)
        } finally {
           setLoading(false);
        }
      };
    
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Form onSubmit={handleSubmit} style={{ width: '300px' }}>
            <h2 className="text-center mb-4">Reset Password</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
              type={showPassword ? 'text' : 'password'}  // Toggle between text and password types
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={toggleShowPassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </Form>
        </Container>
      
    
   )
 }
 
 export default UpdatePassword
 