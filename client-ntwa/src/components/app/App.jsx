import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import Login from '../auth/Login'
import ForgottenPassword from '../auth/ForgottenPassword'
import PasswordReset from '../auth/PasswordReset'
import SignUp from '../auth/SignUp'
import { useState } from 'react';
import Notes from '../core/Notes'

// protected Route component to handle authentication
const ProtectedRoute = ({ children }) => {

  //check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? children : <Navigate to="/login" replace/>

}

//layout component to maintain consistent header accross pages
const layout = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  };

  return (
    <main className='flex flex-col justify-center items-center w-375 py-8 md:w-768'>
      <section className='bg-gray-200'>
        <div className='h-14 flex justify-between items-center px-4'>
            <img 
              src={logo} 
              alt='logo' 
              className='h-8 translate-y-1/2' 
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            />
            {isAuthenticated && (
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}
        </div>
        {children}
    </section>
</main>
)}




function App() {

  
  

  return (
    
  )
}



export default App;
