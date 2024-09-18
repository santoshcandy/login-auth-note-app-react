import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter,Routes , Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function logout(){
  localStorage.clear()
  return <Navigate to='/login'/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}
//  const APII_URL = process.env.REACT_APP_API_URL;
// console.log(APII_URL);  // This should log "http://localhost:8000" if everything is correct

// console.log('santhosh')

// console.log(process.env)
// console.log(process.env.REACT_APP_TEST_VARIABLE);

  const App = () => {
   return (
      <>
       <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>

            <Home/>
          </ProtectedRoute>
          }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>



      </Routes>

      </BrowserRouter>
       
      </>
     
   )
 }
 
 export default App
 
