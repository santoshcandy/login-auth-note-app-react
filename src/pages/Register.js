import React from 'react'
 
import LoginForm from '../components/LoginForm'
const Register = () => {
  return (
    <div>
      <LoginForm  route="/api/user/register/" method='register'/>
    </div>
  )
}

export default Register
